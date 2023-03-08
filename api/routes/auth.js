const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

// Local auth

const jwtSecret = process.env.JWT_SECRET;

router.route("/register").post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const emailExists = await User.findOne({ "local.email": email });
    if (emailExists) 
        return res.status(400).json({ message: "Email already exists" });
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const token = jwt.sign({ id: email }, jwtSecret, { expiresIn: 3600 } , { resave: true });
        res.cookie("isConnect", token, { httpOnly: false }, { resave: true});
        const newUser = new User({
            local: {
                email: req.body.email,
                password: hashedPassword,
            }
        })
        const savedUser = await newUser.save();
        res.status(200).json({
            message: "User successfully registered",
            user: savedUser,
        })
    } catch (err) {
        res.status(401).json({
            message: "User not successful registered",
            error: err.message,
        })
    }
})

router.route("/login").post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.find({ "local.email": email });
    const token = jwt.sign({ id: email }, jwtSecret, { expiresIn: 3600 } , { resave: true });
    if (!user)
        return res.status(400).json({ message: "User does not exist" });
    try {
        const validPass = await bcrypt.compare(password, user[0].local.password);
        if (!validPass)
            return res.status(400).json({ message: "Invalid password" });
        user[0].token = token;
        await user[0].save();
        res.cookie("isConnect", token, { httpOnly: false }, { resave: true });
        res.status(200).json({
            message: "User successfully logged in",
            user,
            token,
        })
    } catch (err) {
        res.status(401).json({
            message: "User not successful logged in",
            error: err.message,
        })
    }
})

router.route("/logout").get(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "User successfully logged out",
    })
})

router.route("/delete").delete(async (req, res) => {
    const { email } = req.body;
    try {
        await User.findOneAndDelete({ email: email }).then(user => {
            if (!user) return res.status(400).json({ message: "User does not exist" });
            res.status(200).json({
                message: "User successfully deleted",
                user,
            })
        })
    } catch (err) {
        res.status(401).json({
            message: "User not successful deleted",
            error: err.mesage,
        })
    }
})

// ====================================================================================================

// Google auth

router.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent'
}));

router.get("/google/logout", (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
});

router.route("/google/callback").get(passport.authenticate('google', {
    failureRedirect: '/forbidden'
}));

// ====================================================================================================

// Discord auth

router.get('/discord/login', passport.authenticate('discord'));

router.get("/discord/logout", (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
});

router.route("/discord/callback").get(passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}));

// ====================================================================================================

// Twitter auth

router.get('/twitter/login', passport.authenticate('twitter', { scope: ['profile', 'email'],  prompt: 'consent',}));

router.get("/twitter/logout", (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
});

router.route("/twitter/callback").get(passport.authenticate('twitter', {
    failureRedirect: '/forbidden'
}));

// ====================================================================================================

// Facebook auth

router.get('/facebook/login', passport.authenticate('facebook', { scope: ['email', ] , authType: 'reauthenticate' }));

router.get("/facebook/logout", (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
});

router.route("/facebook/callback").get(passport.authenticate('facebook', {
    failureRedirect: '/forbidden'
}));


// ====================================================================================================

// Github auth

router.get('/github/login', passport.authenticate('github', { scope: ['user:email'], prompt: 'consent', }));

router.get("/github/logout", (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
});

router.route("/github/callback").get(passport.authenticate('github', {
    failureRedirect: '/forbidden',
}), (req, res) => {
    console.log('Connexion GitHub réussie !');
});

const express = require('express');
const cors = require('cors');
const app = express();

// Autoriser toutes les requêtes CORS
app.use(cors());

// Route pour la connexion à GitHub
app.get('/github/login', passport.authenticate('github', { scope: ['user:email'], prompt: 'consent', }));

// Route pour la déconnexion de GitHub
app.get('/github/logout', (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
});

// Route pour la callback de GitHub
app.get('/github/callback', cors(), passport.authenticate('github', {
    failureRedirect: '/forbidden'
}), (req, res) => {
    console.log('Connexion GitHub réussie !');
});

// ====================================================================================================


module.exports = router;