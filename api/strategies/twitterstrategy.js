const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user.model');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TT_CONSUMER_ID,
    consumerSecret: process.env.TT_CONSUMER_SECRET,
    callbackURL: process.env.TT_CALLBACK_URL
},
    async (token, tokenSecret, profile, done) => {
        console.log(profile);
        try {
            const user = await User.findOne({ "twitter.id": profile._json.id });
            if (user) {
                if (user.twitter.username == profile._json.screen_name) {
                    return done(null, user);
                }
                user.twitter.username = profile._json.screen_name;
                user.twitter.displayName = profile._json.name;
                user.twitter.photos = profile._json.profile_image_url_https;
                user.twitter.email = profile._json.email;
                user.twitter.accesstoken = token;
                user.twitter.accesstokensecret = tokenSecret;
                const savedUser = await user.save();
                return done(null, savedUser);
            }
            const newUser = new User({
                local: {
                    email: profile._json.email,
                },
                twitter: {
                    id: profile._json.id,
                    username: profile._json.screen_name,
                    displayName: profile._json.name,
                    photos: profile._json.profile_image_url_https,
                    email: profile._json.email,
                    accesstoken: token,
                    accesstokensecret: tokenSecret
                }
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        } catch (err) {
            done(err);
        }
    }
));