
const passport = require("passport")
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: "1055312176468-moa6hlkcondl7ea9vqnroaelk2nienqp.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

module.exports = passport;