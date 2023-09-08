"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Ingredient, { foreignKey: "itemId" });
      Item.belongsTo(models.Category, { foreignKey: "categoryId" });
      Item.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Item name is required",
          },
          notNull: {
            args: true,
            msg: "Item name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description is required",
          },
          notNull: {
            args: true,
            msg: "Description is required",
          }
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price is required",
          },
          notNull: {
            args: true,
            msg: "Price is required",
          },
          min: {
            args: 20000,
            msg: "Minimum price is 20000"
          }
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "ImgUrl is required",
          },
          notNull: {
            args: true,
            msg: "ImgUrl is required",
          },
        },
      },
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
