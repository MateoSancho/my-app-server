const router = require("express").Router()
const verifyToken = require("../middlewares/auth.middlewares")
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

//GET -> info del usuario
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

// UPDATE user profile (name, email, profileImage)
router.patch("/me", verifyToken, async (req, res, next) => {
  try {
    const { username, email, profileImage } = req.body;
    const userId = req.payload._id;
    
    // Check if email is being changed and if it's already taken
    if (email) {
      const existingUser = await User.findOne({ 
        email: email, 
        _id: { $ne: userId } // Exclude current user
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          message: "Email is already taken by another user" 
        });
      }
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          username: username, 
          email: email, 
          profileImage: profileImage,
          updatedAt: new Date()
        }
      },
      { new: true } // Return the updated document
    ).select("-password");
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// UPDATE password
router.patch("/me/password", verifyToken, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.payload._id;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: "Current password and new password are required" 
      });
    }
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check current password
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    
    // Validate new password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: "New password needs 1 uppercase, 1 lowercase, 1 number and 8 characters"
      });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    user.password = hashedPassword;
    await user.save();
    
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;