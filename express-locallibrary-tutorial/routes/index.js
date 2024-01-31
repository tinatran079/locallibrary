var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  // redirect to new index page in path '/catalog'
  res.redirect("/catalog");
});

module.exports = router;
