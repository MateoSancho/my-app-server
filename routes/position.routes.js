const router = require("express").Router();
const Position = require("../models/Position.model");


// all the positions
router.get("/", async (req, res, next) => {
  try {
    
    const positions = await Position.find().populate("players");
    res.json(positions);
  } catch (error) {
    next(error);
  }
});


// position by ID
router.get("/:id", async (req, res, next) => {
  try {
    const position = await Position.findById(req.params.id).populate("players");

    if (!position) return res.status(404).json({ message: "Position not found" });

    res.json(position);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
