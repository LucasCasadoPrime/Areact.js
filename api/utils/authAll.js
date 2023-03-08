const { error } = require('console');
const jwt = require('jsonwebtoken');
const { User } = require("../models/user.model");

const jwtSecret = process.env.JWT_SECRET;

function isAuthenticatedLocal(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        console.log("User is not authenticated");
        res.redirect('/');
    }
}

//discord auth verification
function isAuthenticatedOther(req, res, next) {
    if (req.user) {
        console.log("User is authenticated");
        next();
    } else {
        console.log("User is not authenticated");
        res.redirect('/');
    }
}

module.exports = { isAuthenticatedLocal, isAuthenticatedOther }