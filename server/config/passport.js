const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../models/User");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.secretOrKey,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        req.user = user;
        // console.log(req.user);
        return done(null, req.user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value,
        id = profile.id,
        name = profile.displayName;

      // Link google
      if (
        req.user &&
        req.user.local.email === email &&
        !req.user.methods.includes("google")
      ) {
        req.user.methods.push("google");
        req.user.google = {
          name,
          id,
          email,
        };
        await req.user.save();
        return done(null, req.user);
      }
      if (!req.user) {
        User.findOne({ "google.id": id }).then((user) => {
          if (user) return done(null, user);

          // Login by google
          User.findOne({
            $or: [{ "local.email": email }, { "facebook.email": email }],
          }).then((foundUser) => {
            if (foundUser) {
              foundUser.methods.push("google");
              foundUser.google = {
                name,
                id,
                email,
              };
              foundUser.save(() => done(null, foundUser));
            }
            // Add new account
            else {
              const newUser = new User({
                methods: ["google"],
                google: {
                  name,
                  id,
                  email,
                },
              });
              newUser.save(() => done(null, newUser));
            }
          });
        });
      } else return done(null, false);
    }
  )
);

// Facebook
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value,
        id = profile.id,
        name = profile.displayName;
        
      // Link facebook
      if (
        req.user &&
        req.user.facebook.email === email &&
        !req.user.methods.includes("facebook")
      ) {
        req.user.methods.push("facebook");
        req.user.facebook = {
          id,
          name,
          email,
        };
        await req.user.save();
        return done(null, req.user);
      }
      if (!req.user) {
        User.findOne({ "facebook.id": id }).then((user) => {
          if (user) return done(null, user);

          // Login by facebook
          User.findOne({
            $or: [{ "google.email": email }, { "facebook.email": email }],
          }).then((foundUser) => {
            if (foundUser) {
              foundUser.methods.push("facebook");
              foundUser.facebook = {
                id,
                name,
                email,
              };
              foundUser.save(() => done(null, foundUser));
            }
            // Add new account
            else {
              const newUser = new User({
                methods: ["facebook"],
                facebook: {
                  id,
                  name,
                  email,
                },
              });
              newUser.save(() => done(null, newUser));
            }
          });
        });
      } else return done(null, false);
    }
  )
);
