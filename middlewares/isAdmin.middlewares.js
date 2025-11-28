module.exports = function isAdmin(req, res, next) {
  // El verifyToken ya mete req.payload
  if (req.payload.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};
