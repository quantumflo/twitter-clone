const express = require("express");
const tweets = require("../controller/tweets-controller");
const router = express.Router();

router.get("/:uid", tweets.getTweets )
router.post("/", tweets.postTweet)

module.exports = router;