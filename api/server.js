const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const discordStrategy = require('./strategies/discordstrategy');
const GoogleStrategy = require('./strategies/googlestrategy');
const TwitterStrategy = require('./strategies/twitterstrategy');
const FacebookStrategy = require('./strategies/facebookstrategy');
const GitHubStrategy = require('./strategies/githubstrategy');
const app = express();
const session = require('express-session');
const passport = require('passport');
const cookies = require("cookie-parser");
const body = require("body-parser");
const { isAuthenticatedOther } = require("./utils/authAll");
const port = process.env.PORT;

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hi There')
})

app.get('/about.json', (req, res) => {
  res.sendFile('about.json', { root: __dirname })
})
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Routes
const autRouter = require('./routes/auth');
const apiRouter = require('./routes/api');


// Middleware
app.use(cors(
  {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
));
app.use(express.json());
app.use(body());
app.use(cookies());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000*60*24 },
  name: 'token',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', autRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});