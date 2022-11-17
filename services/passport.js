const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// new google strategy creates a new instance of google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email }).then((existingUser) => {
        if (existingUser) {
          // user already exists
          done(null, existingUser);
        } else {
          // create a new user
          let role = "user";
          if (profile._json.email === "cse190001035@iiti.ac.in") role = "admin";
          new User({
            email: profile._json.email,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            role: role,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
