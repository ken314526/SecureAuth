const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const student = await User.findOneAndUpdate(
      { _id: req.user._id },
      req.body,
      { new: true }
    ).select("-password");
    return res.json({ success: true, student });
  } catch (error) {
    return res.status(400).json({ message: "Server error", error: true });
  }
};
