"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { as: "User", foreignKey: "UserId" });
    }
  }
  Profile.init(
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
      fullName: DataTypes.STRING,
      profileImgUrl: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
