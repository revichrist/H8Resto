const { Item, User, Category, Ingredient, sequelize } = require("../models");
class FoodController {
  static async fetchFoods(request, response, next) {
    try {
      const { filter } = request.query;

      const filterByName = {}

      if(filter){
        filterByName.name = [filter]
      }

      const data = await Item.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
        include: [
          {
            model: User,
            attributes: ["email", "username"],
          },
          {
            model: Category,
            attributes: ["name"],
            where: filterByName
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
      const { name, description, price, imgUrl, categoryId, ingredients } =
        request.body;

      const { id: authorId } = request.user;

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

      const ingredientsData = ingredients.map((el) => {
        if(!el) throw {name: "IngredientsRequired"}
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
        message: "New food created"
      })
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
}

module.exports = { FoodController };
