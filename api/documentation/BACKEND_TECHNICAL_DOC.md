# Backend Technical Documentation

The following code uses Express, a Node.js framework for building web applications, to create a server that handles HTTP requests. It also uses several middleware and authentication strategies for user authentication.

## Required Modules

- `express`: used for creating an instance of the Express application.
-  `cors`: middleware for handling Cross-Origin Resource Sharing (CORS).
- `mongoose`: a Node.js package for working with MongoDB.
- `discordStrategy`, `GoogleStrategy`, `TwitterStrategy`, `FacebookStrategy`, `GitHubStrategy`: authentication strategies for various OAuth providers.
- `session`: middleware for handling session data.
- `passport`: middleware for handling authentication.
- `cookie-parser`: middleware for handling cookies.
- `body-parser`: middleware for handling request bodies.

## Configuration

- `PORT`: the port that the server will listen on.
- `MONGO_URI`: the URI of the MongoDB database.

## Routes

- `GET /`: handles requests to the root endpoint and returns a response with the text "Hi There".
- `GET /about.json` : handles requests to the "/about.json" endpoint and returns a JSON file.

## Middleware

- `cors`: allows the server to be accessed by any client.
- `session`: stores session data in a MongoDB database.
- `passport.initialize()`: initializes Passport.
- `passport.session()`: stores user data in a session.
- `cookie-parser`: parses cookies.
- `body-parser`: parses request bodies.

## Endpoints

- `GET /dashboard`: handles requests to the "/dashboard" endpoint and returns User data.

## Authentication Strategies

- `DiscordStrategy`: authenticates users using Discord.
- `GoogleStrategy`: authenticates users using Google.
- `TwitterStrategy`: authenticates users using Twitter.
- `FacebookStrategy`: authenticates users using Facebook.
- `GitHubStrategy`: authenticates users using GitHub.

### Routes

- `GET /auth/StrategyName/login`: handles requests to the "/auth/StrategyName/login" endpoint and redirects the user to the OAuth provider's login page.

- `GET /auth/StrategyName/logout`: handles requests to the "/auth/StrategyName/logout" endpoint and logs the user out.

- `GET /auth/StrategyName/callback`: handles requests to the "/auth/StrategyName/callback" endpoint and redirects the user to the dashboard.

- `GET /auth/register`: handles requests to the "/auth/register" endpoint and redirects the user to the dashboard.

- `GET /auth/login` : handles requests to the "/auth/login" endpoint and redirects the user to the dashboard.

- `GET /auth/logout` : handles requests to the "/auth/logout" endpoint and logs the user out.


## Models

- `User`: a model for storing user data (mongoose model)
- `Area`: a model for storing area data (mongoose model)
- `area`: object for storing area data (JSON)
- `service`: object for storing service data (JSON)
- `all_services`: object for storing all service data (JSON)

## Services

### Github

#### Action 

- `getWebhooks(owner, repo)`: gets all webhooks for a repository.
- `getCommits(owner, repo)`: gets all commits for a repository.
- `getStarredOfRepo(owner, repo)`: gets all users who starred a repository.
- `getBranches(owner, repo)`: gets all branches for a repository.
- `getRepos(owner)`: gets all repositories for a user.
- `getARepo(owner, repo)`: gets a repository.
- `getFollowers(owner)`: gets all followers for a user.
- `getFollowing(owner)`: gets all users that a user is following.

#### Reaction

- `createWebhook(owner, repo, [events])`: creates a webhook for a repository.
- `deleteWebhook(owner, repo, id)`: deletes a webhook for a repository.

### Discord

#### Reaction

- `discordSendMessage(message)`: sends a message to a Discord channel.
- `discordSendEmbed(embed)`: sends an embed to a Discord channel.

### Email

#### Reaction

- `sendEmail(to, subject, text)`: sends an email to a user.

### Epitech Door

#### Action

- `openDoor(apikey, doorname)`: opens the Epitech door.

#### Reaction

- `openDoor(apikey, doorname)`: opens the Epitech door.


### OpenWeatherMap

#### Action

- `getWeather(city)`: gets the weather for a city.


## Area/Worflow

### Routes

- `GET /getWorkflows`: handles requests to the "/getWorkflows" endpoint and returns for all workflows (id, action.name, reaction.name).

- `GET /createArea/:name/:action/:actionParams/:reaction/:reactionParams`: handles requests to the "/createArea/:name/:action/:actionParams/:reaction/:reactionParams" endpoint and creates an area.

- `GET /deleteArea/:id`: handles requests to the "/deleteArea/:id" endpoint and deletes an area.

- `GET /updateArea/:id/:name/:action/:actionParams/:reaction/:reactionParams`: handles requests to the "/updateArea/:id/:name/:action/:actionParams/:reaction/:reactionParams" endpoint and updates an area.

- `GET /startArea/:id`: handles requests to the "/startArea/:id" endpoint and starts an area.

- `GET /stopArea/:id`: handles requests to the "/stopArea/:id" endpoint and stops an area.


## Contributing

If you want to contribute to this project you must follow the following rules:

If the  API is already added to the project, you
just have to code it in the coresponding file in the `services` folder an add the service to the `functionArray` in the following file: `models/all_services.js` following the same format as the others.

```javascript
// models/all_services.js
    {
        name: 'getCommits',
        service: 'github',
        cron: '* * * * *',
        paramsType: ['owner', 'repo'],
        callback: function(owner, repo) { return github.getCommits(owner, repo); }
    }
//service/github.js
    function getCommits(owner, repo) {
        return new Promise((resolve, reject) => {
            github.repos.getCommits({
                owner: owner,
                repo: repo
            }, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
```

If the API is not already added to the project, you have to impement a new file in the `services` folder and add the service to the `functionArray` in the following file: `models/all_services.js` following the same format as the others.

```javascript
// models/all_services.js
    const newService = require('../services/newService');

    const newServiceAction = NewServiceAction();
    {
        name: 'actionName',
        service: 'newService',
        cron: '* * * * *',
        paramsType: ['newServiceParam1', 'newServiceParam2'],
        callback: function(newServiceParam1, newServiceParam2) { return newService.actionName(newServiceParam1, newServiceParam2); }
    }
//service/newService.js

    class NewServiceAction {
        constructor() {
            this.name = 'newService';
        }
        
        actionName(newServiceParam1, newServiceParam2) {
        return new Promise((resolve, reject) => {
            //do something
            });
        }
    }
```

## Authors

- **Lucas Casado** - *Backend* - [LucasCasadoPrime](https://github.com/LucasCasadoPrime)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## TODO

- [ ] Add more services
- [ ] Add more actions
- [ ] Add more reactions
- [ ] Add more authentication strategies

