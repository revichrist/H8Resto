const router = require("express").Router();
const { UserController } = require("../controllers/userController");
const { errorHandler } = require("../middlewares/errorHandler");

router.get("/", (req, res, next) => {
  res.send("Semangat ngoding!!!");
});

router.get("/user", UserController.fetchUsers);
router.get("/user/:id", UserController.fetchOneUser);
router.post("/user", UserController.createUser);
router.delete("/user/:id", UserController.deleteUser);
router.use(errorHandler);

module.exports = { router };
