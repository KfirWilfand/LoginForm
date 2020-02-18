var nodemailer = require("nodemailer");

function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "88782c4b1d8271",
      pass: "3543db6cc7cc43"
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
