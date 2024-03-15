const { PrivateMessage } = require("../models");
async function deleteDirectMessageAuthorization(req, res, next) {
  try {
    const privMessageId = req.params.id;
    const privMessage = await PrivateMessage.findByPk(privMessageId);

    if (!privMessage) {
      throw { name: "NotFound" };
    }

    const sender = privMessage.SenderId;
    const reqMaker = req.user.id;

    if (sender !== reqMaker) {
      throw { name: "Unauthorized" };
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = deleteDirectMessageAuthorization;
