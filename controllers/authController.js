
const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/queries');
const { body, validationResult } = require("express-validator");



const passLengthErr =  "must be at least 8 characters.";
const usernameLengthErr =  "must be at least 5 characters.";

// Validates password when creating account
const validateUser = [

 body("email").trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .isLength({ min: 5, max: 100 }).withMessage(`Email ${usernameLengthErr}`),
 body("password").notEmpty()
    .withMessage('Password is required').trim().isLength({min: 8, max: 50}).withMessage(`Password ${passLengthErr}`).matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
]

/**
  * Displays index page
  * @param request, response
  * @return none
  */
async function displayIndex(req, res) {
    res.render("views/index", {user: req.user});
}

/**
  * Renders sign up form
  * @param request, response
  * @return none
  */
async function signUpGet(req, res) {
    res.render("views/forms/signUpForm");
}


/**
  * Renders login form
  * @param request, response
  * @return none
  */
async function logInGet(req, res) {
    res.render("views/forms/logInForm");
}

/**
  * Authenitcates user log in
  * @param request, response, next
  * @return none
  */
async function logInPost(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/library');
      });
    })(req, res, next);
  }

const signUpPost = [
    validateUser,

     async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("views/signUpForm", {
          title: "Sign Up",
          errors: errors.array(),
        });
      }
      const { email, password  } = req.body;

      try {
        // Hashes the password with bcrypt
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          if (err) {
            // Handles hashing error
            return next(err);
          }

          // Stores hashedPassword in DB
          try {
              await db.insertNewUsers({email, hashedPassword});


            res.redirect("/log-in");
          } catch (dbError) {
            // Handles database insertion error
            res.redirect("/");
            return next(dbError);
          }
        });
      } catch (err) {
        // Handle other errors
        res.redirect("/");
        return next(err);

      }
  }

]

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
      try {
        const user = await db.getUser(email);


        if (!user) {

          return done(null, false, { message: "Incorrect email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        // Passwords do not match!
        return done(null, false, { message: "Incorrect password" })

        }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );


passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserById(id);
      done(null, user);
    } catch(err) {
      done(err);
    }
  });




module.exports =  {

    displayIndex,
    signUpGet,
    signUpPost,
    logInGet,
    logInPost


  }
