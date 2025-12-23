const transporter = require("../config/mailer");

exports.sendMail = async (email, subject, message) => {
  await transporter.sendMail({
    to: email,
    subject,
    html: message,
  });
};
