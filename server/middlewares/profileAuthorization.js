const { Profile, User } = require("../models");
async function profileAuthorization(req, res, next) {
  try {
    const { username } = req.params;
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

    const profileOwner = userProfile.Profile.UserId;
    const reqSender = req.user.id;
    // console.log(req.user)
    // console.log(profileOwner)

    if (profileOwner !== reqSender) {
      throw { name: "Unauthorized" };
    }

    next()
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = profileAuthorization
