const router = require("express").Router();
const { CategoryController } = require("../controllers");

router.get("/", CategoryController.fetchCategories);
router.get("/:id", CategoryController.fetchCategoryDetail);
router.post("/", CategoryController.addCategory);
router.put("/:id", CategoryController.editCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = { categoryRouter: router };
