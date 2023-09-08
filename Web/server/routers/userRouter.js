const router = require("express").Router();
const { FoodController, CategoryController } = require("../controllers");

router.get('/food', FoodController.fetchFoods)
router.get('/food/:id', FoodController.fetchFoodDetail)
router.get('/categories', CategoryController.fetchCategories)

module.exports = { userRouter: router };
