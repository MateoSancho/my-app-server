const router = require("express").Router();

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const authRouter = require("./auth.routes")
router.use("/auth", authRouter)



//example of private route
const verifyToken = require("../middlewares/auth.middlewares")

router.get("/example-private-route", verifyToken, (req, res) => {
  console.log("user requesting things", req.payload)
  res.send("private route")
})


module.exports = router;
