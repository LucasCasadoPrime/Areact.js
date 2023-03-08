const Twitter = require('twitter-lite');
const dotenv = require('dotenv');
dotenv.config();

async function postTweet(accessToken, accessTokenSecret, tweet) {
    const client = new Twitter({
        consumer_key: process.env.TT_CONSUMER_ID,
        consumer_secret: process.env.TT_CONSUMER_SECRET,
        access_token_key: accessToken,
        access_token_secret: accessTokenSecret
    });
    try {
        await client.post('/statuses/update', { status: tweet })
    } catch (err) {
        console.log(err);
    }
}

async function changeBio(accessToken, accessTokenSecret, bio) {
    const client = new Twitter({
        consumer_key: process.env.TT_CONSUMER_ID,
        consumer_secret: process.env.TT_CONSUMER_SECRET,
        access_token_key: accessToken,
        access_token_secret: accessTokenSecret
    });
    try {
        await client.post('/account/update_profile', { description: bio })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { postTweet, changeBio };