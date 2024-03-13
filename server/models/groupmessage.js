"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupMessage.belongsTo(models.User, { as: "User", foreignKey: "UserId" });
      GroupMessage.belongsTo(models.Group, {
        as: "Group",
        foreignKey: "GroupId",
      });
    }
  }
  GroupMessage.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        validate: {
          notEmpty: { msg: "UserId is required." },
          notNull: { msg: "UserId is required." },
        },
      },
      GroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Groups", key: "id" },
        validate: {
          notEmpty: { msg: "GroupId is required." },
          notNull: { msg: "GroupId is required." },
        },
      },
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GroupMessage",
    }
  );
  return GroupMessage;
};
