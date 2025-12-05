const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.config.js");
const verifyToken = require("../middlewares/auth.middlewares");

// POST "/api/upload" - Protected route (only logged-in users)
router.post("/", verifyToken, uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      errorMessage: "No file received or upload failed."
    });
  }

  try {
    // Return the URL of the uploaded file
    res.json({ 
      success: true,
      imageUrl: req.file.path 
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      errorMessage: "Server error during upload."
    });
  }
});

module.exports = router;