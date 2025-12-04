const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.config.js");
const verifyToken = require("../middlewares/auth.middlewares");

// POST "/api/upload" - Protected route (only logged-in users)
router.post("/", verifyToken, uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      errorMessage: "There was a problem uploading the image. Check format and size (max 5MB)."
    });
    return;
  }

  // Send the URL of the uploaded file
  res.json({ imageUrl: req.file.path });
});

module.exports = router;