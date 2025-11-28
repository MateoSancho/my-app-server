const router = require("express").Router();

const verifyToken = require("../middlewares/auth.middlewares");
const isAdmin = require("../middlewares/isAdmin.middlewares")

const Player = require("../models/Player.model");

//* GET all players (PUBLIC)
router.get("/", async (req, res, next) => {
    try {
        const players = await Player.find().populate("position");
        res.json(players);
    } catch (error) {
        next(error)
    }
});

//* GET players by their ID (PUBLIC)
router.get("/:id", async (req, res, next) => {
    try {
        const player = await Player.findById(req.params.id).populate("position");

        if (!player) return res.status(404).json({message: "Player not found"});
        res.json(player);
    } catch (error) {
        next(error);
    }
});

//* CREATE players (ADMIN)
router.post("/", verifyToken, isAdmin, async (req, res, next) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json(player)
    } catch (error) {
        next(error);
    }
});

//* UPDATE players (ADMIN)
router.put("/:id", verifyToken, isAdmin, async (req, res, next) => {
    try {
        const updated = await Player.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!updated) return res.status(404).json({ message: "Player not found"});

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

//* DELETE players (ADMIN)
router.delete("/:id", verifyToken, isAdmin, async (req, res, next) => {
  try {
    const deleted = await Player.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Player not found" });

    res.json({ message: "Player deleted" });
  } catch (error) {
    next(error);
  }
});



module.exports = router;