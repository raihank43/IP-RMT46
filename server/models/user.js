"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { as: "Profile", foreignKey: "UserId" });
      User.hasMany(models.PrivateMessage, {
        as: "SentMessages",
        foreignKey: "SenderId",
      });
      User.hasMany(models.PrivateMessage, {
        as: "ReceivedMessages",
        foreignKey: "ReceiverId",
      });
      User.belongsToMany(models.Group, {
        through: "UserGroup",
        foreignKey: "UserId",
      });
      User.hasMany(models.GroupMessage, {
        as: "GroupMessages",
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email must be Unique.",
        },
        validate: {
          notEmpty: {
            msg: { msg: "Username is required." },
            notNull: { msg: "Username is required." },
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email must be Unique.",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: { msg: "Email is required." },
            notNull: { msg: "Email is required." },
            isEmail: { args: true, msg: "Invalid email format." },
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required.",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: [5],
            msg: "Panjang password tidak boleh kurang dari 5.",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
