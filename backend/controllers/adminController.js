const User = require("../models/User");

exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await User.find({ role: "student" }).select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json({ success: true, students });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use", error: true });
    }

    const student = await User.create({
      name,
      email,
      password,
      role: "student",
    });

    return res.json({ success: true, student });
  } catch (error) {
    return res.status(400).json({ message: "Server error", error: true });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({ success: true, student });
  } catch (error) {
    return res.status(400).json({ message: "Server error", error: true });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};
