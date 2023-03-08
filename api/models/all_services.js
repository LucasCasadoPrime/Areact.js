const Github = require('../services/github');
const Mailer = require('../services/email');
const Discord = require('../services/discord');
const OpenDoor = require('../services/doors');
const Weather = require('../services/weather');

const github = new Github();
const mailer = new Mailer();
const discord = new Discord();
const door = new OpenDoor();
const weather = new Weather();

const functionsArray = [
    // ====================================================================================================
    // Github

    // Webhooks
    {
        name: 'createWebhook',
        service: 'github',
        paramsType: ['owner', 'repo', 'events'],
        callback: function(owner, repo, events) { return github.createWebhook(owner, repo, events); }
    },
    {
        name: 'deleteWebhook',
        service: 'github',
        paramsType: ['owner', 'repo', 'id'],
        callback: function(owner, repo, id) { return github.deleteWebhook(owner, repo, id); }
    },
    {
        name: 'getWebhooks',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner', 'repo'],
        callback: function(owner, repo) { return github.getWebhooks(owner, repo); }
    },
    //============================================
    // Repositories
    {
        name: 'getCommits',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner', 'repo'],
        callback: function(owner, repo) { return github.getCommits(owner, repo); }
    },
    {
        name: 'getStarredOfRepo',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner', 'repo'],
        callback: function(owner, repo) { return github.getStarredOfRepo(owner, repo); }
    },
    {
        name: 'getARepo',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner', 'repo'],
        callback: function(owner, repo) { return github.getARepo(owner, repo); }
    },
    {
        name: 'getBranches',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner', 'repo'],
        callback: function(owner, repo) { return github.getBranches(owner, repo); }
    },
    //============================================
    // Users
    {
        name: 'getRepos',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner'],
        callback: function(owner) { return github.getRepos(owner); }
    },
    {
        name: 'getFollowers',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner'],
        callback: function(owner) { return github.getFollowers(owner); }
    },
    {
        name: 'getFollowing',
        service: 'github',
        cron: '*/15 * * * *',
        paramsType: ['owner'],
        callback: function(owner) { return github.getFollowing(owner); }
    },
    // ====================================================================================================
    // Discord
    {
        name: 'discordSendMessage',
        service: 'discord',
        paramsType: ['message'],
        callback: function(message) { return discord.sendMessage(message); }
    },
    {
        name: 'SendEmbed',
        service: 'discord',
        paramsType: ['title', 'color', 'description'],
        callback: function(title, color, description) { return discord.sendEmbed(title, color, description); }
    },
    // ====================================================================================================
    // Email
    {
        name: 'sendMail',
        service: 'email',
        paramsType: ['to', 'subject', 'text'],
        callback: function(to, subject, text) { return mailer.sendEmail(to, subject, text); }
    },
    // ====================================================================================================
    // Door
    {
        name: 'openDoor',
        service: 'door',
        cron: '*/15 * * * *',
        paramsType: ['apikey', 'doorname'],
        callback: function(apikey, doorname) { return door.open(apikey, doorname); }
    },
    // ====================================================================================================
    // Weather
    {
        name: 'getWeather',
        service: 'weather',
        cron: '*/15 * * * *',
        paramsType: ['city'],
        callback: function(city) { return weather.getWeather(city); }
    },
    // ====================================================================================================

];

module.exports = functionsArray;