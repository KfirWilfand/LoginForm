var nodemailer = require("nodemailer");

function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mytestkfir@gmail.com",
      pass: "KaKa100100"
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
