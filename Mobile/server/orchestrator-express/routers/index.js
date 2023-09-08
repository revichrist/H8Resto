const { errorHandler } = require("../middlewares/errorHandler");
const { mainEntityRouter } = require("./mainEntityRouter");
const { userRouter } = require("./userRouter");
const router = require("express").Router();

router.get('/', (req,res) => {
  res.send('Connected to orchestrator! Port:' + process.env.PORT)
})

router.use('/food', mainEntityRouter)
router.use('/user', userRouter)
router.use(errorHandler)

module.exports = {router}