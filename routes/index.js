var express = require('express');
const { availability } = require("../controllers/convenience.controller");
var router = express.Router();

/* GET home page. */
router.post("/api/available", availability);

module.exports = router;
