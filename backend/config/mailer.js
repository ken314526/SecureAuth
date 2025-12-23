const nodemailer = require("nodemailer");

const HOST = process.env.EMAIL_HOST;
const PORT = process.env.EMAIL_PORT;
const USER = process.env.EMAIL_USER;
const PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  auth: {
    user: USER,
    pass: PASS
  }
});

module.exports = transporter;
