// config/passport.js
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const queries = require("../db/usersQueries");
const bcrypt = require("bcryptjs");


passport.use(
  new LocalStrategy(
      { usernameField: "email", passwordField: "password" }, // Configure field names
      async (email, password, done) => {
          try {
              const user = await queries.getUserCredentials(email);

              if (!user) {
                  return done(null, false, { message: "Incorrect email" });
              }

              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                  return done(null, false, { message: "Incorrect password" });
              }

              return done(null, user);
          } catch (err) {
              return done(err);
          }
      }
  )
);

// Serialize user to save their ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by fetching their details using the stored ID
passport.deserializeUser(async (id, done) => {
  try {
      const user = await queries.getUserById(id);
      done(null, user);
  } catch (err) {
      done(err);
  }
});

module.exports = passport;
