const { Item, Category, Ingredient, sequelize } = require("../models");
class FoodController {
  static async fetchFoods(request, response, next) {
    try {
      const { filter } = request.query;

      const filterByName = {};

      if (filter) {
        filterByName.name = [filter];
      }

      const data = await Item.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
        include: [
          {
            model: Category,
            attributes: ["name"],
            where: filterByName,
          },
          {
            model: Ingredient,
            attributes: ["name"],
          },
        ],
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addFood(request, response, next) {
    const trxRoom = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        imgUrl,
        categoryId,
        Ingredients,
        authorId,
      } = request.body;

      // const { id: authorId } = request.user;
      console.log(name);
      if (!categoryId) throw { name: "CategoryRequired" };

      const newFood = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          authorId,
        },
        {
          transaction: trxRoom,
        }
      );

      const ingredientsData = Ingredients.map((el) => {
        if (!el) throw { name: "IngredientsRequired" };
        const singleIngredient = {
          itemId: newFood.id,
          name: el,
        };
        return singleIngredient;
      });

      await Ingredient.bulkCreate(ingredientsData, {
        transaction: trxRoom,
      });

      await trxRoom.commit();

      response.status(201).json({
        message: "New food created",
      });
    } catch (error) {
      await trxRoom.rollback();
      next(error);
    }
  }

  static async fetchFoodDetail(request, response, next) {
    try {
      const { id } = request.params;

      const foodDetail = await Item.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Ingredient,
            attributes: ["name"],
          },
        ],
      });

      if (!foodDetail) throw { name: "DataNotFound" };

      response.status(200).json(foodDetail);
    } catch (error) {
      next(error);
    }
  }

  static async editFood(request, response, next) {
    try {
      const { id } = request.params;
      const { name, description, price, imgUrl, categoryId } = request.body;
      const foodDetail = await Item.findByPk(id);

      if (!foodDetail) throw { name: "DataNotFound" };

      await Item.update(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        message: "Food has been edited",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFood(request, response, next) {
    try {
      const { id } = request.params;

      const foodDetail = await Item.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!foodDetail) throw { name: "DataNotFound" };

      await Item.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        message: "Food deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAssociatedFood(request, response, next) {
    try {
      const { mongoId } = request.params;

      const data = await Item.findAll({
        where: {
          authorId: mongoId
        }
      })
      
      if (data.length === 0) throw { name: "DataNotFound" };
      
      await Item.destroy({
        where: {
          authorId: mongoId
        }
      })

      response.status(200).json({
        message: "Food(s) deleted"
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { FoodController };
