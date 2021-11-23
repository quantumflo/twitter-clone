const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  const { name, uid, password } = req.body;

  let doesUserExists;
  try {
    doesUserExists = await User.findOne({ uid: uid });
  } catch (err) {
    const error = new HttpError("Signing up failed", 500);
    return next(error);
  }
  console.log("USER: ", doesUserExists);
  if (doesUserExists) {
    const error = new HttpError("UserName already taken", 422);
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    uid,
    password: hashedPassword,
    following: [uid],
  });
  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("New User not created", 500);
    return next(error);
  }

  let token = jwt.sign({ uid: newUser.uid }, "secret-key", { expiresIn: "1h" });

  res.status(201).json({ uid: newUser.uid, token: token });
};

const login = async (req, res, next) => {
  const { uid, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ uid: uid });
  } catch (err) {
    const error = new HttpError("Login failed", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("user doesnt exist", 500);
    return next(error);
  }

  let isValidPassword = await bcrypt.compare(password, existingUser.password);
  // console.log("EX: ", existingUser);
  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials", 500);
    return next(error);
  }

  let token = jwt.sign({ uid: existingUser.uid }, "secret-key", { expiresIn: "1h" });
console.log("TOKEN LOGIN: " + token)
  res.status(201).json({ uid: existingUser.uid, token: token });

};

const getUsersNotFollowing = async (req, res, next) => {
  const uid = req.params.uid;
  const user = await User.findOne({ uid: uid });
  const users = await User.find({ uid: { $nin: user.following } });

  if (users && users.length === 0) {
    console.log("err");
    return next(new HttpError("No more users", 404));
  }

  console.log("USERS: ", users);
  res.json({ users });
};

const followUser = async (req, res, next) => {
  const { followUid } = req.body;
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findOneAndUpdate(
      { uid: uid },
      { $push: { following: [followUid] } }
    );
  } catch (err) {
    const error = new HttpError("Couldnt follow the user", 500);
    return next(error);
  }

  res.status(201).json({ user });
};

exports.getUsersNotFollowing = getUsersNotFollowing;
exports.followUser = followUser;
exports.login = login;
exports.signUp = signUp;
