const { Category, Item } = require("../models");
const { Op } = require("sequelize");

class CategoryController {
  static async fetchCategories(request, response, next) {
    try {
      const { filter } = request.query;

      const filterByName = {}

      if(filter){
        filterByName.name = [filter]
      }

      const data = await Category.findAll({
        attributes: ["id", "name"],
        where: filterByName,
        include: {
          model: Item,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchCategoryDetail(request, response, next) {
    try {
      const { id } = request.params;
      const data = await Category.findByPk(id, {
        attributes: ["id", "name"],
      });

      if (!data) throw { name: "DataNotFound" };

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(request, response, next) {
    try {
      const { name } = request.body;

      await Category.create({
        name,
      });

      response.status(201).json({
        message: "New category created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(request, response, next) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      if (!name) throw { name: "CategoryNameRequired" };

      const data = await Category.findByPk(id);

      if (!data) throw { name: "DataNotFound" };

      await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        message: "Category updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(request, response, next) {
    try {
      const { id } = request.params;

      const data = await Category.findByPk(id);

      if (!data) throw { name: "DataNotFound" };

      await Category.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        message: "Category deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { CategoryController };
