const router = require("express").Router();

router.get("/test-comments", (req, res) => {
  res.json("Comments route working");
});

module.exports = router;

