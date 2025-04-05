// controllers/authController.js
exports.getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
  });
};
