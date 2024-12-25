const express = require("express");
const session = require("express-session");
const fs = require("fs");
const https = require("https");
const passport = require("passport");
const path = require("path");
const authRouter = require("./routes/authRouter");
const libraryRouter = require("./routes/libraryRouter");
const folderRouter = require("./routes/folderRouter")
const fileRouter = require("./routes/fileRouter")

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");

const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/", libraryRouter);
app.use("/", folderRouter)
app.use("/", fileRouter);


// SSL configuration
const sslOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};


https.createServer(sslOptions, app).listen(4005, () => {
  console.log("App listening on https://localhost:4005");
});
module.exports = app;


//app.listen(4005, () => console.log("app listening on port 4005!"));
