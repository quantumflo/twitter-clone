const HttpError = require("../models/http-error");
const Tweet = require("../models/tweet");
const User = require("../models/user");

const getTweets = async (req, res, next) => {
  const userId = req.params.uid;
  const user = await User.findOne({ uid: userId });
  let tweets;

  try {
    tweets = await Tweet.find({ uid: { $in: user.following } }).sort({
      createdDate: -1,
    });

  } catch (err) {
    const error = new HttpError("fetching tweets failed", 500);
    return next(error);
  }
  res.json({ tweets });
};

const postTweet = async (req, res, next) => {
  const { tweet, uid } = req.body;
  console.log(tweet, uid);
  let post;

  const user = await User.findOne({ uid: uid }).then((res) => {
    post = new Tweet({
      name: res.name,
      uid: uid,
      tweet: tweet,
      likes: 0,
      createdDate: new Date(),
    });
  });

  try {
    await post.save();

    console.log("TWEET SAVED");
  } catch (err) {
    console.log(err);

    const error = new HttpError("New tweet not created", 500);
    return next(error);
  }
  res.status(201).json({ post });
};

exports.getTweets = getTweets;
exports.postTweet = postTweet;
