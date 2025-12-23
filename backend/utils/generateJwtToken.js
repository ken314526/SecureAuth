const jwt = require("jsonwebtoken");

const jwtExpiry = process.env.JWT_EXPIRY || "1d";
exports.generateJwtToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: jwtExpiry });
