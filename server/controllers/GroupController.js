const axios = require("axios");
const { Group, GroupMessage, User, Profile } = require("../models");
const { default: OpenAI } = require("openai");
// const openai = new OpenAI({ apiKey: process.env.OPEN_AI });
const imgurClientId = process.env.imgurClientId;
const giphyAPI_KEY = process.env.giphyAPI_KEY;
// const OPEN_AI_KEY = process.env.OPEN_AI;
// client = OpenAI((api_key = os.environ.get("OPEN_AI_KEY")));
// const openai = new OpenAI((api_key = os.environ.get("OPEN_AI_KEY")));
const { Hercai } = require("hercai");
const herc = new Hercai(); //new Hercai("your api key"); => Optional
const cloudinary = require("../helpers/cloudinary");

module.exports = class GroupController {
  static async getAllPublicGroupMessage(req, res, next) {
    try {
      const data = await GroupMessage.findAll({
        where: { GroupId: 1 },
        include: [
          { model: Group, as: "Group" },
          {
            model: User,
            as: "User",
            attributes: ["username"],
            include: [{ model: Profile, as: "Profile" }],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      const addBelongsTo = data.map((el) => {
        if (el.UserId == req.user.id) {
          el.dataValues.messageBelongsToLoggedUser = true;
          return el;
        } else {
          el.dataValues.messageBelongsToLoggedUser = false;
          return el;
        }
      });

      res.status(200).json(addBelongsTo);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async sendMessageToPublicGroup(req, res, next) {
    try {
      const { text } = req.body;
      if (!text) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Message is required.",
        };
      }

      if (req.file) {
        // const imageBuffer = req.file.buffer;
        // const base64Image = imageBuffer.toString("base64");

        // const { data } = await axios.post(
        //   "https://api.imgur.com/3/image",
        //   {
        //     image: base64Image,
        //     type: "base64",
        //   },
        //   {
        //     headers: {
        //       Authorization: "Client-ID " + imgurClientId,
        //     },
        //   }
        // );

        // const linkImgur = data.data.link;

        // generate randomName for file
        let randomName =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        const mimeType = req.file.mimetype;
        const data = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${mimeType};base64,${data}`;
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "koneksion/groupimages",
          public_id: randomName,
        });

        const sendMessage = await GroupMessage.create({
          UserId: req.user.id,
          GroupId: 1,
          text,
          imgUploadGroup: result.secure_url,
        });
        return res.status(201).json(sendMessage);
      }

      let messageSent = false;

      let getGif;
      // Jika pesan dimulai dengan /gif, cari GIF di GIPHY
      if (text.startsWith("/gif ")) {
        const searchTerm = text.split(" ").slice(1).join(" ");
        // console.log(searchTerm);
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPI_KEY}&q=${searchTerm}`
        );
        const gifs = response.data.data;
        if (gifs.length > 0) {
          getGif = gifs[0].images.original.url; // gunakan URL GIF pertama
          const sendMessage = await GroupMessage.create({
            UserId: req.user.id,
            GroupId: 1,
            text,
            imgUploadGroup: getGif,
          });
          res.status(201).json(sendMessage);
          messageSent = true;
        }
      }

      if (!messageSent) {
        const sendMessage = await GroupMessage.create({
          UserId: req.user.id,
          GroupId: 1,
          text,
        });

        let getDef;
        // Jika pesan dimulai dengan /definitions, cari definisi kata
        if (text.startsWith("/definitions ")) {
          const word = text.split(" ")[1]; // ambil kata setelah /definitions
          const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
          );
          const definitions = response.data[0].meanings.map(
            (meaning) => meaning.definitions[0].definition
          );
          getDef = `Definitions of ${word}: ${definitions.join(", ")}`;
          await GroupMessage.create({
            UserId: 4,
            GroupId: 1,
            text: getDef,
          });
        }
        console.log(text);
        let chatai;
        // if (text.startsWith("/chatai ")) {
        //   console.log("masuk");
        //   const prompt = text.split(" ").slice(1).join(" ");
        //   const completion = await openai.chat.completions.create({
        //     messages: [
        //       { role: "system", content: "You are a helpful assistant." },
        //     ],
        //     model: "gpt-3.5-turbo",
        //   });
        //   // chatai = completion.data.choices[0].text.trim();
        //   console.log(completion);
        //   await GroupMessage.create({
        //     UserId: 7,
        //     GroupId: 1,
        //     text: chatai,
        //   });
        // }

        if (text.startsWith("/chatai ")) {
          console.log("masuk");
          const prompt = text.split(" ").slice(1).join(" ");

          const res = await herc.question({ model: "v3", content: prompt });
          await GroupMessage.create({
            UserId: 5,
            GroupId: 1,
            text: res.reply,
          });
        }

        console.log(res.reply);

        res.status(201).json(sendMessage);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deletePublicGroupMessage(req, res, next) {
    try {
      const { id } = req.params;

      const pubMessage = await GroupMessage.findByPk(id);

      await pubMessage.destroy(id);

      res.status(200).json({ message: "Message succesfully deleted." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
