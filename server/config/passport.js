const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

// Local Strategy
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

// Google oauth strategy
// passport.use("google",
//   new GooglePlusTokenStrategy(
//     {
//       clientID: process.env.googleClientID,
//       clientSecret: process.env.googleClientSecret
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log(profile);

//     }
//   )
// );
