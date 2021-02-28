const express = require("express");
const router = express.Router();

router.get("/test", function (req, res) {
  res.json({
    code: 0,
    data: "test",
    message: "",
  });
});

module.exports = router;
