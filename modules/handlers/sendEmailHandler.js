var nodemailer = require("nodemailer");

function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    host: "email-smtp.eu-central-1.amazonaws.com",
    port: 465,
    auth: {
      user: "ses-smtp-user.20200218-223305",
      pass: "BE7Tvy0GNeZY/somDL9BQ77ldJ5wfCZJJz4LoCsZBYDp"
    }
  });

  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function(error, mailOptions) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Email sent: " + mailOptions.response);
        resolve(mailOptions.response);
      }
    });
  });
}

module.exports.sendEmail = sendEmail;
