const router = require("express").Router();

//  Test Route
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

// example of private route
const verifyToken = require("../middlewares/auth.middlewares");

router.get("/example-private-route", verifyToken, (req, res) => {
  console.log("user requesting things", req.payload);
  res.send("private route");
});

// players
const playerRouter = require("./player.routes");
router.use("/players", playerRouter);

// positions
const positionRouter = require("./position.routes");
router.use("/positions", positionRouter);

// comments
const commentRouter = require("./comment.routes");
router.use("/comments", commentRouter);

//users
const userRouter = require("./user.routes");
router.use("/users", userRouter)

module.exports = router;

