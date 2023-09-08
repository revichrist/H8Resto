require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
const { router } = require("./routers");
const port = process.env.PORT || 4000

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(morgan('tiny'))
  .use(express.json())
  .use(router)
  

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })