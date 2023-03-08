const router = require("express").Router();
const User = require("../models/user.model");
const fetch = require('cross-fetch');
const jwt = require('jsonwebtoken');
const { createArea, startArea, stopArea } = require("../services/factory");
require('dotenv').config();

// get the token from the cookie
function getTokenInCookie(req) {
    const cookiesName = "isConnect";
    const cookies = req.cookies[cookiesName];
    return cookies;
}


router.route("/createArea/:name/:action/:aparams/:reaction/:rparams").get((req, res) => {
    const name = req.params.name;
    const action = req.params.action;
    const reaction = req.params.reaction;
    const aparams = req.params.aparams;
    const rparams = req.params.rparams;

    const cookies = getTokenInCookie(req);
    const decode = jwt.decode(cookies);

    if (decode) {
        User.find({ "local.email": decode.id })
            .then(user => {
                const area = createArea(name, action, aparams, reaction, rparams, user[0]);
                user[0].workflows.push(area);
                user[0].save()
                    .then(() => res.json("Workflow added!"))
                    .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err));
    } else {
        res.status(400).json("Error: ")
    }
});

router.route("/deleteWorkflow/:id").get((req, res) => {
    const id = req.params.id;

    const cookies = getTokenInCookie(req);
    const decode = jwt.decode(cookies);

    if (decode) {
        const user = User.find({ "local.email": decode.id })
        .then(user => {
            user[0].workflows = user[0].workflows.filter(workflow => workflow._id.toString() !== id);
            user[0].save()
            .then(() => res.json("Workflow deleted!"))
            .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
        res.status(400).json("Error: Authentication failed")
    } 
});


router.route("/updateWorkflow/:id/:action/:aparams/:reaction/:rparams").get((req, res) => {
    const id = req.params.id;
    const action = req.params.action;
    const reaction = req.params.reaction;
    const aparams = req.params.aparams;
    const rparams = req.params.rparams;

    const cookies = getTokenInCookie(req);
    const decode = jwt.decode(cookies);

    if (decode) {
        User.find({ "local.email": decode.id })
        .then(user => {
            user[0].workflows.forEach(workflow => {
            if (workflow._id.toString() === id) {
                workflow.action.name = action;
                workflow.action.params = aparams;
                workflow.reaction.name = reaction;
                workflow.reaction.params = rparams;
            }
            });
            user[0].save()
            .then(() => res.json("Workflow updated!"))
            .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
        res.status(400).json("Error: " + err)
    }
});

//get all workflows id and name
router.route("/getWorkflows").get((req, res) => {

    const cookies = getTokenInCookie(req);
    const decode = jwt.decode(cookies);

    if (decode) {
        const user = User.find({ "local.email": decode.id });
        user.then(user => {
            const workflows = user[0].workflows.map(workflow => {
                return {
                    id: workflow._id,
                    action: workflow.action.name,
                    reaction: workflow.reaction.name
                }
            });
            res.json(workflows);
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
        res.status(400).json("Error: Authentication failed");
    }
});

//get workflow by id
router.route("/getWorkflow/:id").get((req, res) => {
    const id = req.params.id;

    const cookies = getTokenInCookie(req);
    const decode = jwt.decode(cookies);

    if (decode) {
        const user = User.find({ "local.email": decode.id });
        user.then(user => {
            const workflow = user[0].workflows.filter(workflow => workflow._id.toString() === id);
            res.json(workflow);
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
        res.status(400).json("Error: Authentication failed");
    }
});

//http://localhost:8080/api/startArea/63fdc3f0294def255b2396c5
router.route("/startWorkflow/:id").get((req, res) => {
    const id = req.params.id;

    const cookies = getTokenInCookie(req);
    const decode = jwt.decode(cookies);

    if (decode) {
        const user = User.find({ "local.email": decode.id });
        user.then(user => {
            user[0].workflows.forEach(workflow => {
                if (workflow._id.toString() === id) {
                    startArea(workflow);
                }
                workflow.cronJob.active = true;
            });
            user[0].save();
            res.json("Workflow started!");
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
        res.status(400).json("Error: Authentication failed");
    }
});

http://localhost:8080/api/stopArea/63fdc3f0294def255b2396c5
router.route("/stopWorkflow/:id").get((req, res) => {
    const id = req.params.id;

    const cookies = getTokenInCookie(req);
    const decode = jwt.decode(cookies);

    if (decode) {
        const user = User.find({ "local.email": decode.id });
        user.then(user => {
            user[0].workflows.forEach(workflow => {
                if (workflow._id.toString() === id) {
                    stopArea(workflow);
                    workflow.cronJob.active = false;
                }
            });
            user[0].save();
            res.json("Workflow stopped!");
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
        res.status(400).json("Error: Authentication failed");
    }
});

router.route("/download/app.apk").get((req, res) => {
    res.download("../app.apk");
});

module.exports = router;