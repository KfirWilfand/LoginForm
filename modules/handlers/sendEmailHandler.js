var nodemailer = require("nodemailer");

function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    host: "out.walla.co.il",
    port: 587,
    auth: {
      user: "tempam@walla.co.il",
      pass: "funfun100100"
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
