"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

  // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").save(newTweet, (err) =>{
        if(err){
          return callback(err);
        }
      })
      callback(null, true);

    },
      // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if(err){
          return callback(err);
        }
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });

    }
  };
}