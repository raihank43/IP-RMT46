"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGroup.belongsTo(models.User, { as: "User", foreignKey: "UserId" });
      UserGroup.belongsTo(models.Group, { as: "Group", foreignKey: "GroupId" });
    }
  }
  UserGroup.init(
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
    },
    {
      sequelize,
      modelName: "UserGroup",
    }
  );
  return UserGroup;
};
