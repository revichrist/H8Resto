const router = require("express").Router();
const { FoodController } = require("../controllers");

router.get("/", FoodController.fetchFoods);
router.get("/:id", FoodController.fetchFoodDetail);
router.post("/", FoodController.addFood);
router.put("/:id", FoodController.editFood);
router.delete("/:id", FoodController.deleteFood);
router.delete("/associate/:mongoId", FoodController.deleteAssociatedFood);

module.exports = { foodRouter: router };
