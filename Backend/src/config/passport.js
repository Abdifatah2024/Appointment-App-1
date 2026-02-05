const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

/**
 * GOOGLE OAUTH STRATEGY
 * - Used for both REGISTER & LOGIN
 * - User creation / login is handled in controller
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, 
      // example: http://localhost:4000/api/auth/google/callback
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ✅ We only pass the Google profile
        // DB logic happens in auth.controller.js
        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/**
 * PASSPORT SESSION HANDLERS
 * (Even if you use JWT, passport requires these)
 */
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;


