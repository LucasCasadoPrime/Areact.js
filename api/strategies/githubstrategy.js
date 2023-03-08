const DiscordStrategy = require('passport-github').Strategy;
const passport = require('passport');
const User = require('../models/user.model');
require('dotenv').config();

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    const user = await User.findById(id);
    if(user)
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.GIT_CLIENT_ID,
    clientSecret: process.env.GIT_CLIENT_SECRET,
    callbackURL: process.env.GIT_CLIENT_REDIRECT
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ "github.id": profile.id });
        if (user) {
            if (user.github.name == profile._json.login) {
                return done(null, user);
            }
            user.github.name = profile._json.login;
            user.github.email = profile._json.email;
            user.github.accesstoken = accessToken;
            user.github.accesstokensecret = refreshToken;
            const savedUser = await user.save();
            return done(null, savedUser);
        }
        const newUser = new User({
            local: {
                email: profile._json.email,
            },
            github: {
                id: profile.id,
                name: profile._json.login,
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
}));