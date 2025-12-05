const router = require("express").Router();

// Test route
router.get("/", (req, res) => {
  res.json("All good in here");
});

// Auth routes
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

// Private test route
const verifyToken = require("../middlewares/auth.middlewares");
router.get("/example-private-route", verifyToken, (req, res) => {
  res.send("private route");
});

// Players routes
const playersRouter = require("./player.routes");
router.use("/players", playersRouter);

// Positions routes
const positionsRouter = require("./position.routes");
router.use("/positions", positionsRouter);

// Comments routes 
const commentsRouter = require("./comment.routes");
router.use("/comments", commentsRouter);

// Users routes
const usersRouter = require("./user.routes");
router.use("/users", usersRouter);

// Cloudinary upload route
const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
