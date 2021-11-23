const express = require("express");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users-routes");
const tweetRoutes = require("./routes/tweets-routes");
const path = require('path')
require('dotenv').config();

const MONGO_URL =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q7vmq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  // const MONGO_URL =
  // `mongodb+srv://shashank:shashank@cluster0.q7vmq.mongodb.net/twitter?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join('public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, x-requested-with, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  next();
});

app.use("/api/tweets", tweetRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use((req, res, next) => {
  throw new HttpError("Could not resolve the route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(MONGO_URL)
  .then(() => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));
