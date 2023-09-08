const router = require("express").Router();
const { foodRouter } = require("./foodRouter");
const { categoryRouter } = require("./categoryRouter");
const { errorHandler } = require("../middlewares");

// buat ngetes saat deploy server aja, jalan apa nggak servernya
router.get("/", (request, response) => {
  response.send("Semangat ngoding!!!");
});

router.use("/food", foodRouter);
router.use("/category", categoryRouter);

router.use(errorHandler);

module.exports = { router };
