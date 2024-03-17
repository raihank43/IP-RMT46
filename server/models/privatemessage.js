"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PrivateMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PrivateMessage.belongsTo(models.User, {
        as: "Sender",
        foreignKey: "SenderId",
      });
      PrivateMessage.belongsTo(models.User, {
        as: "Receiver",
        foreignKey: "ReceiverId",
      });
    }
  }
  PrivateMessage.init(
    {
      SenderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        validate: {
          notEmpty: { msg: "SenderId is required." },
          notNull: { msg: "SenderId is required." },
        },
      },
      ReceiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        validate: {
          notEmpty: { msg: "ReceiverId is required." },
          notNull: { msg: "ReceiverId is required." },
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Message is required." },
          notEmpty: { msg: "Message is required." },
        },
      },
      imgUploadPriv: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PrivateMessage",
    }
  );
  return PrivateMessage;
};
