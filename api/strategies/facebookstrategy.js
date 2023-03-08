const FacebookStrategy = require('passport-facebook').Strategy;
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

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CLIENT_REDIRECT,
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    console.log(refreshToken)
    try {
        const user = await User.findOne({ "facebook.id": profile.id });
        if (user) {
            if (user.facebook.username == profile.username) {
                return done(null, user);
            }
            user.facebook.username = profile.username;
            user.facebook.displayName = profile.displayName;
            user.facebook.accesstoken = accessToken;
            user.facebook.accesstokensecret = refreshToken;
            const savedUser = await user.save();
            return done(null, savedUser);
        }
        const newUser = new User({
            local: {
                email: profile._json.email,
            },
            facebook: {
                id: profile._json.id,
                email: profile._json.email,
                username: profile.username,
                displayName: profile.displayName,
                accesstoken: accessToken,
                accesstokensecret: refreshToken,
            }
        });
        const savedUser = await newUser.save();
        done(null, savedUser);
    } catch (error) {
        console.log(error);
    }
}));