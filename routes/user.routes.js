const router = require("express").Router()
const verifyToken = require("../middlewares/auth.middlewares")
const User = require("../models/User.model");

//GET -> info del usuario
//*GET /api/user/me
router.get("/me", verifyToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.payload._id).select("-password");

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;