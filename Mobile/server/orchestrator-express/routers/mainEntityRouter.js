const router = require("express").Router();
const { MainEntity } = require("../controllers");

router.get("/", MainEntity.fetchAll);

module.exports = { mainEntityRouter: router };
