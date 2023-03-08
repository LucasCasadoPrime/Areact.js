const cron = require('node-cron');
const array = require('../models/all_services');
const Area = require('../models/area');

taskArray = [];

function findService(name) {
    return array.find(service => service.name === name);
}

function changeText(area, data) {
    console.log(`Changing text of reaction ${area.reaction.name}...`);
    const reactionArray = ["discordSendMessage", "SendEmbed", "sendMail"];
    var params = area.reaction.params;
    if (reactionArray.includes(area.reaction.name)) {
        //Github
        
        //User

        //getFollowers
        if (area.action.name === "getFollowers") {
            let text = "";
            data.forEach(element => {
                text += `${element.login} (${element.html_url})\n`;
            });
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }

        //getFollowing
        if (area.action.name === "getFollowing") {
            let text = "";
            data.forEach(element => {
                text += `${element.login} (${element.html_url})\n`;
            });
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }

        //getRepos
        if (area.action.name === "getRepos") {
            let text = "";
            data.forEach(element => {
                text += `${element.name} (${element.html_url})\n`;
            });
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }

        //=========================================
        
        //Repository

        //getARepo
        if (area.action.name === "getARepo") {
            let text = "";
            text += `The repo ${data.name} (${data.html_url}) by ${data.owner.login} (${data.owner.html_url}) has: \n ${data.stargazers_count} ⭐ and ${data.forks_count} 🍴`;
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }

        //getStarredOfRepo
        if (area.action.name === "getStarredOfRepo") {
            let text = "";
            data.forEach(element => {
                text += `${element.login} (${element.html_url}) has starred the repo !\n`;
            });
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }

        //getCommits
        if (area.action.name === "getCommits") {
            var text = "";
            text += `The last commit is from ${data[0].commit.author.name} : ${data[0].commit.message} on ${data[0].html_url}`;
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }

        //getBranches
        if (area.action.name === "getBranches") {
            let text = "";
            data.forEach(element => {
                text += `${element.name} (${element.commit.sha})\n`;
            });
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }
        //=========================================
        // Weather
        if (area.action.name === "getWeather") {
            let text = "";
            text += `The weather in ${data.name} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C`;
            if (area.reaction.name === "discordSendMessage") {
                area.reaction.params[0] = text;
            } else {
                area.reaction.params[2] = text;
            }
        }
        //=========================================
        console.log(`Reaction ${area.reaction.name} text changed`);
    }
    return params;
}

function conditionReaction(area, data) {
    console.log(`Conditioning reaction ${area.reaction.name}...`);
    var paramse = area.reaction.params;
    paramse = changeText(area, data);
    console.log(`Reaction ${area.reaction.name} conditioned`);
    return paramse;
}

function doReaction(area) {
    console.log(`Doing reaction ${area.reaction.name}...`);
    var callbackReaction = findService(area.reaction.name).callback;
    var params = conditionReaction(area, area.action.data);
    callbackReaction(...params);
    console.log(`Reaction ${area.reaction.name} done`);
}

function doAction(area) {
    console.log(`Doing action ${area.action.name}...`);
    var callbackAction = findService(area.action.name).callback;
    return callbackAction(...area.action.params)
      .then(data => {
        area.action.data = data;
        console.log(`Action ${area.action.name} done`);
        return area.action.data;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
}

function createArea(name, paction, aparams, preaction, rparams, user) {
    var action = findService(paction);
    var reaction = findService(preaction);
    var id = user.workflows.length;

    aparams = aparams.split(',');
    aparams = aparams.map(param => param.trim());
    action.params = aparams;

    rparams = rparams.split(',');
    rparams = rparams.map(param => param.trim());
    reaction.params = rparams;

    var area = new Area(id, name, action, aparams, reaction, rparams, user);
    return area;
}

function startArea(area) {
    console.log(`Starting area with id ${area._id}...`);
    var task = cron.schedule('*/5 * * * * *', () => {
        doAction(area)
            .then(data => {
                doReaction(area);
            })
            .catch(err => {
                console.log(err);
            });
    });
    task.start();
    taskArray.push(task);
    console.log(`Area started with id ${area._id}`);
}

function stopArea(area) {
    console.log(`Stopping area with id ${area._id}...`);
    var task = taskArray.find(task => task.id === area.id);
    task.stop();
    console.log(`Area stopped with id ${area._id}`);
}

module.exports = { createArea, startArea, stopArea};