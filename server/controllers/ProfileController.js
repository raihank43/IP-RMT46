const { Profile, User } = require("../models");

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
      const { fullName, profileImgUrl, bio } = req.body;

      const findUser = await Profile.findOne({
        where: { UserId: req.user.id },
      });
      console.log(findUser);
      if (findUser) {
        throw {
          name: "CustomError",
          status: 403,
          message: "Profile has already been created.",
        };
      }

      await Profile.create({
        UserId: req.user.id,
        fullName,
        profileImgUrl,
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
};
