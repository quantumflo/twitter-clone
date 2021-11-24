const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }

    const decodedToken = jwt.verify(token, 'secretKey');
    req.userData = { uid: decodedToken.uid };
    next();
  } catch (err) {
    console.log(err);
    const error = new HttpError("CAught Authentication failed", 401);
    return next(error);
  }
};
