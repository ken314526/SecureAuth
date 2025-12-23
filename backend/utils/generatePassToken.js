const crypto = require("crypto");

const tokenBits = parseInt(process.env.TOKEN_BITS);
const tokenExpiryMinutes = parseInt(process.env.TOKEN_EXPIRY_MiNUTES);

exports.generatePassToken = () => crypto.randomBytes(tokenBits).toString("hex");
exports.generateTokenExpiry = () => Date.now() + tokenExpiryMinutes * 60 * 1000;