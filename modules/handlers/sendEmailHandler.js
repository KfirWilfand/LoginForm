var nodemailer = require("nodemailer");

function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: "postmaster@sandboxa2c1ef23f88e4e5ba703d83c31cf051d.mailgun.org",
      pass: "e8992f98ddb24c35cf142d4130522747-f8faf5ef-561bb444"
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
