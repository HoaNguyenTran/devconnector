const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/User");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

passport.serializeUser((user, done) => {
  console.log("ser");
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log("des");
  User.findById(id, (err, user) => {
    return done(null, user);
  });
});

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

        // If user doesn't exist, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        req.user = user;
        // console.log(user);
        return done(null, req.user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.googleClientID}`,
      clientSecret: `${process.env.googleClientSecret}`,
      callbackURL: "http://localhost:5000/api/users/oauth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value,
        id = profile.id,
        name = profile.displayName;

      // Link google
      if (
        req.user &&
        !req.user.methods.includes("google")
      ) {
        req.user.methods.push("google");
        req.user.google = {
          id,
          name,
          email,
        };
        await req.user.save();
        return done(null, req.user);
      }
      if (!req.user) {
        await User.findOne({ "google.id": id }).then(async (user) => {
          if (user) {
            return done(null, user);
          }

          // Login by google
          if (!user) {
            await User.findOne({
              $or: [{ "local.email": email }, { "facebook.email": email }],
            }).then(async (foundUser) => {
              if (foundUser) {
                foundUser.methods.push("google");
                foundUser.google = {
                  id,
                  name,
                  email,
                };
                await foundUser.save();
                return done(null, foundUser);
              }
              // Add new account
              else {
                const newUser = new User({
                  methods: ["google"],
                  google: {
                    id,
                    name,
                    email,
                  },
                });
                await newUser.save();
                return done(null, newUser);
              }
            });
          }
        });
      } else {
        return done(null, false);
      }
    }
  )
);

// Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: `${process.env.facebookClientID}`,
      clientSecret: `${process.env.facebookClientSecret}`,
      callbackURL: "http://localhost:5000/api/users/oauth/facebook/callback",
      passReqToCallback: true,
      profileFields: ["emails", "name"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value,
      id = profile.id,
      name = profile.name.familyName.concat(" ").concat(profile.name.givenName);

      // Link facebook
      if (
        req.user &&
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
            $or: [{ "local.email": email }, { "google.email": email }],
          }).then(async (foundUser) => {
            if (foundUser) {
              foundUser.methods.push("facebook");
              foundUser.facebook = {
                id,
                name,
                email,
              };
              await foundUser.save();
              return done(null, foundUser);
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

              await newUser.save();
              return done(null, newUser);
            }
          });
        });
      } else return done(null, false);
    }
  )
);
