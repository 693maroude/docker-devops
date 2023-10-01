const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("<h2 style='font-family: monospace;'>WORKING!</h2>");
});

module.exports = router;
