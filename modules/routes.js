const express = require("express");
var bodyParser = require("body-parser");
var emailHandler = require("./handlers/sendEmailHandler");
var emailPassVerificationHandler=require("./handlers/emailPassVerificationHandler");
const LocalDb = require("../dal/localDb");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new LocalDb();

const static_path = "./static_pages";

//serving resources files
app.use("/styles", express.static(static_path + "/styles"));
app.use("/img", express.static(static_path + "/img"));

app.get("/", (req, res) => res.redirect("/login"));

//serving authentication
app.use("/login", express.static(static_path + "/login.html"));
app.post("/login", (req, res) => {
  authResult = db.isUserAuthenticate(req.body.userName, req.body.password);

  if (typeof authResult == "string") {
    return res.send(authResult);
  } else res.redirect("/contact");
});

app.use("/signup", express.static(static_path + "/sign_up.html"));
app.post("/signup", (req, res) => {
  isUserExist = db.isUserExist(req.body.userName);

  if (isUserExist) return res.send("The already user name exist!");
  if (req.body.password !== req.body.rePassword)
    return res.send("The password are NOT match");

     authResult=emailPassVerificationHandler.verifyEmailPassword(req.body.userName,req.body.password);

    if (typeof authResult == "string") {
      return res.send(authResult);
    } else{
      db.addNewUser(req.body.userName, req.body.password);
      res.redirect("/login");
    }
});

//serving contact form
app.use("/contact", express.static(static_path + "/contact_form.html"));
app.post("/contact", (req, res) => {
  const mailReceiver = "mytestkfir@gmail.com";

  var mailOptions = {
    from: req.body.email,
    to: mailReceiver,
    subject: req.body.concerningSelection,
    text: req.body.fullName + "/n" + req.body.subject
  };

  var isMailSent = emailHandler.sendEmail(mailOptions);

  if (isMailSent) res.redirect("/");
});

module.exports = app;
