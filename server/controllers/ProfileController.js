const { Profile, User } = require("../models");
const cloud_name = process.env.cloud_name;
const api_key = process.env.api_key;
const api_secret = process.env.api_secret;

const cloudinary = require("cloudinary").v2; // versi nodeJS
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret, // disimpan di env smua // ini ditaruh diatas aja
});

module.exports = class ProfileController {
  static async getAllProfiles(req, res, next) {
    try {
      const getAllProfiles = await Profile.findAll({ include: "User" });
      res.status(200).json(getAllProfiles);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createProfile(req, res, next) {
    try {
      // let formData = new FormData();
      // formData.append("image", req.file); // file adalah objek File atau Blob
      // // formData.append("fullName", "nama_full"); // "nama_gambar" adalah string yang ingin Anda kirim
      const { fullName, bio } = req.body;
      // console.log(req.file);
      // console.log(req.body);

      if (!req.file) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Image is required.",
        };
      }

      const findUser = await Profile.findOne({
        where: { UserId: req.user.id },
      });
      //   console.log(findUser);
      if (findUser) {
        throw {
          name: "CustomError",
          status: 403,
          message: "Profile has already been created.",
        };
      }

      // generate randomName for file
      let randomName =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const mimeType = req.file.mimetype;
      const data = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${mimeType};base64,${data}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // options ada banyak
        // - public_id -> untuk nama file
        // - folder: -> untuk nama folder
        public_id: randomName,
      });

      await Profile.create({
        UserId: req.user.id,
        fullName,
        profileImgUrl: result.secure_url,
        bio,
      });

      res.status(201).json({ message: "Profile created Succesfully." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getProfileByUsername(req, res, next) {
    try {
      const { username } = req.params;
      const findProfile = await User.findOne({
        where: { username: username },
        include: "Profile",
      });
      if (!findProfile) {
        throw {
          name: "CustomError",
          status: 404,
          message: "Profile not Found.",
        };
      }

      res.status(200).json(findProfile.Profile);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { username } = req.params;
      const { fullName, profileImgUrl, bio } = req.body;
      const userProfile = await User.findOne({
        where: { username: username },
        include: "Profile",
      });
      if (!userProfile) {
        throw {
          name: "CustomError",
          status: 404,
          message: "Profile not Found.",
        };
      }

      //   console.log(userProfile.Profile.id);

      const updatedProfile = await Profile.update(
        {
          UserId: req.user.id,
          fullName,
          profileImgUrl,
          bio,
        },
        { where: { id: userProfile.Profile.id } }
      );

      res.status(200).json({ message: "Profile updated Succesfully." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
