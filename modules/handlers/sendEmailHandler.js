var nodemailer = require("nodemailer");

function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'mytestkfir@gmail.com',
           pass: 'KaKa100100'
       }
   });


  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
}

module.exports.sendEmail = sendEmail;
