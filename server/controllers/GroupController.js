const axios = require("axios");
const { Group, GroupMessage, User, Profile } = require("../models");
const imgurClientId = process.env.imgurClientId;
const giphyAPI_KEY = process.env.giphyAPI_KEY;
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
        const imageBuffer = req.file.buffer;
        const base64Image = imageBuffer.toString("base64");

        const { data } = await axios.post(
          "https://api.imgur.com/3/image",
          {
            image: base64Image,
            type: "base64",
          },
          {
            headers: {
              Authorization: "Client-ID " + imgurClientId,
            },
          }
        );

        const linkImgur = data.data.link;

        const sendMessage = await GroupMessage.create({
          UserId: req.user.id,
          GroupId: 1,
          text,
          imgUploadGroup: linkImgur,
        });
        return res.status(201).json(sendMessage);
      }

      let messageSent = false;

      let getGif;
      // Jika pesan dimulai dengan /gif, cari GIF di GIPHY
      if (text.startsWith("/gif ")) {
        const searchTerm = text.split(" ").slice(1).join(" ");
        console.log(searchTerm);
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
