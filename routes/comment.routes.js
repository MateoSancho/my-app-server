const router = require("express").Router();
const Comment = require("../models/comment.model");
const verifyToken = require("../middlewares/auth.middlewares");
const isAdmin = require("../middlewares/isAdmin.middlewares");


// All comments
//* GET /api/comments/player/:playerId

router.get("/player/:playerId", async (req, res, next) => {
    try {
        const comments = await Comment.find({ player: req.params.playerId })
         .populate("author", "username email");
        res.json(comments)
    } catch (error) {
        next(error);
    }
});

// POST create a comment (should be a user)
//* POST /api/comments/:playerId
router.post("/:playerId", verifyToken, async (req, res, next) => {
    try {

        if (!req.body.text || req.body.text.trim() === "") {
            return res.status(400).json({ message: "comment cannot be empty"})
        }

        const newComment = await Comment.create({
            text: req.body.text,
            author: req.payload._id,      //from the token
            player: req.params.playerId
        });
        res.status(201).json(newComment);
    } catch (error) {
        next(error)
    }
});


// DELETE a comment (ADMIN or AUTHOR of the comment)
//* DELETE /api/comments/:commentId
router.delete("/:commentId", verifyToken, async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "comment not found"});
        }

        const userId = req.payload._id;
        const userRole = req.params.role;

        //only if you are author or admin
        if (String(comment.author) !== userId && userRole !== "admin") {
            return res.status(403).json({ message: "not authorized"});
        }

        await Comment.findByIdAndDelete(req.params.commentId);

        res.json({ message: "Comment deleted"})
    } catch (error) {
        next(error)
    }
})


module.exports = router;

