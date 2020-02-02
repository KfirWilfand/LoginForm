const express = require("express");
var bodyParser = require("body-parser");
var emailHandler = require("./handlers/sendEmailHandler");
const PostgresSqlDb = require("../dal/postgresSqlDb");
const uuid = require("uuid/v4");
const session = require("express-session");
const static_path = "./static_pages";
var path = require("path");

const app = express();

const db = new PostgresSqlDb();
db.connenct();

// add & configure middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serving resources files
app.use("/styles", express.static(static_path + "/styles"));
app.use("/img", express.static(static_path + "/img"));
app.use("/js", express.static(static_path + "/js"));

app.get("/", function(req, res) {
  sess = req.session;

  //Session set when user Request our app via URL
  console.log(sess.userName);
  if (sess.userName) {
    res.redirect("/data");
  } else {
    res.redirect("/login");
  }
});

//serving authentication
// app.use("/login", express.static(static_path + "/login.html"));
app.post("/login" || "/login?res=bad", (req, res) => {
  let sess = req.session;
  let userName = req.body.userName;

  authResultPromise = db.isUserAuthenticate(userName, req.body.password);

  authResultPromise.then(result => {
    if (result) {
      sess.userName = userName;
      res.redirect("/");
    } else {
      res.redirect("/login?res=bad");
    }
  });
});

app.get("/login", (req, res) => {
  let sess = req.session;

  if (sess.userName) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "/../", static_path, "/login.html"));
  }
});

app.get('/logout', function (req, res) {
  delete req.session.userName;
  res.redirect("/");
});

app.get("/data", (req, res) => {
  sess = req.session;

  if (sess.userName) {
    res.sendFile(path.join(__dirname, "/../", static_path, "/data.html"));
  } else {
    res.redirect("/");
  }
});

app.get("/dataTable", (req, res) => {
  sess = req.session;

  if (sess.userName) {
    data = db.fetchData();

    data.then(result => {
        res.json(result);
    });
  } else {
    
    res.redirect("/");
  }
});

app.use(
  "/signup" || "/signup?res=bad",
  express.static(static_path + "/sign_up.html")
);
app.post("/signup", (req, res) => {
  let userPromise = db.addNewUser(req.body.userName, req.body.password);
  userPromise.then(result => {
    if (result) {
      res.redirect("/login");
    } else {
      res.redirect("/signup?res=bad");
    }
  });
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
