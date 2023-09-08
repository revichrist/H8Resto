const router = require("express").Router();
const { foodRouter } = require("./foodRouter");
const { categoryRouter } = require("./categoryRouter");
const { userRouter } = require("./userRouter");
const { loginRouter } = require("./loginRouter");
const { errorHandler, authentication } = require("../middlewares");

// buat ngetes saat deploy server aja, jalan apa nggak servernya
router.get("/", (request, response) => {
  response.send("Semangat ngoding!!!");
});

router.use("/", loginRouter);
router.use("/user", userRouter);

router.use(authentication);
router.use("/food", foodRouter);
router.use("/category", categoryRouter);

router.use(errorHandler);

module.exports = { router };
