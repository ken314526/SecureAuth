const User = require("../models/User");
const {
  generatePassToken,
  generateTokenExpiry,
} = require("../utils/generatePassToken");
const { generateJwtToken } = require("../utils/generateJwtToken");
const { sendMail } = require("../utils/sendMail");

exports.signup = async (req, res) => {
  try {
    const { name, email, course, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "User already exists", error: true });
      }

      const token = generatePassToken();
      existingUser.resetToken = token;
      await existingUser.save();

      const subject = "Verify Your Email";
      const message = `
        Token: ${token} <br/>
        <p>Click below link to verify your email</p>
        <a href="${process.env.CLIENT_URL}/verify/${token}">Verify</a>`;

      await sendMail(email, subject, message);
      return res.json({ message: "Verification email sent", success: true  });
    }

    const user = await User.create({ name, email, password, role: "student", course });
    const token = generatePassToken();
    user.verifyToken = token;
    user.verifyTokenExpiry = generateTokenExpiry();
    await user.save();

    const subject = "Verify Your Email";
    const message = `
      <p>Click below link to verify your email</p>
      <a href="${process.env.CLIENT_URL}/verify/${token}">Verify</a>
    `;

    await sendMail(email, subject, message);
    return res.json({ message: "Verification email sent", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verifyToken: req.params.token });
    if (!user) return res.status(400).json({ message: "Invalid token", error: true });
    if (user.verifyTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Token expired", error: true });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.json({ message: "Email verified", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials", error: true });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified", error: true });
    }

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    return res.status(200).json({
      token: generateJwtToken(user._id),
      user: userResponse,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found", error: true });

    const resetToken = generatePassToken();
    const tokenExpiryMinutes = parseInt(process.env.TOKEN_EXPIRY_MiNUTES);
    user.resetToken = resetToken;
    user.resetTokenExpiry = generateTokenExpiry();
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  
    const subject = "Password Reset Request";
    const message = `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Link valid for ${tokenExpiryMinutes} minutes</p>
      Or Copy and paste ${resetLink}
    `;

    await sendMail(user.email, subject, message);
    return res.json({ message: "Password reset email sent", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
    });

    if (!user || user.resetTokenExpiry < Date.now())
      return res.status(400).json({ message: "Invalid or expired token", error: true });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.json({ message: "Password reset successful", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect", error: true });

    user.password = newPassword;
    await user.save();

    return res.json({ message: "Password changed successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: true });
  }
};
