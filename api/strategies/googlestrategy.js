const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');
require('dotenv').config();

// Google auth

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GG_CLIENT_ID,
    clientSecret: process.env.GG_CLIENT_SECRET,
    callbackURL: process.env.GG_CLIENT_REDIRECT,
    passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({ "google.email": profile._json.email });
            if (user) {
                if (user.google.name == profile._json.name) {
                    return done(null, user);
                }
                user.google.name = profile._json.name;
                user.google.email = profile._json.email;
                user.google.accesstoken = accessToken;
                user.google.accesstokensecret = refreshToken;
                const savedUser = await user.save();
                return done(null, savedUser);
            }
            const newUser = new User({
                local: {
                    email: profile._json.email,
                },
                google: {
                    name: profile._json.name,
                    email: profile._json.email,
                    accesstoken: accessToken,
                    accesstokensecret: refreshToken
                }
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        } catch (error) {
            console.log(error);
        }
    }
));