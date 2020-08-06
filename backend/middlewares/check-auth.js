const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const { token, userid } = req.headers;

    if (!token) {
      return next(new Error("User don't have a token!"));
    }

    const decodedToken = jwt.verify(token, "secret");

    if (decodedToken.userId === userid) {
      console.log("TOKEN VERIFIED");
      next();
    } else {
      return next(new Error("Wrong token!"));
    }
  } catch (error) {
    console.log("[TOKEN] Wrong token.");
    return next(new Error("Token identification failed."));
  }
};
