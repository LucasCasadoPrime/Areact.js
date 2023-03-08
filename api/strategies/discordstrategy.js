const DiscordStrategy = require('passport-discord').Strategy;
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
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CLIENT_REDIRECT,
    scope: ['identify', 'guilds', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ 'discord.id': profile.id });
        if(user) {
            if (user.discord.username == profile.username) {
                return done(null, user);
            }
            user.discord.username = profile.username;
            user.discord.discriminator = profile.discriminator;
            user.discord.avatar = profile.avatar;
            user.discord.email = profile.email;
            user.discord.accesstoken = accessToken;
            user.discord.accesstokensecret = refreshToken;
            const savedUser = await user.save();
            return done(null, savedUser);
        } else {
            const newUser = new User({
                local: {
                    email: profile.email,
                },
                discord: {
                    id: profile.id,
                    username: profile.username,
                    discriminator: profile.discriminator,
                    avatar: profile.avatar,
                    email: profile.email,
                    accesstoken: accessToken,
                    accesstokensecret: refreshToken,
                }
            });
            await newUser.save();
            done(null, newUser);
        }
    } catch(err) {
        console.log(err);
    }
}));