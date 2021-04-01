const jwt = require("jsonwebtoken");
const { BAD_REQUEST } = require("http-status");
const { User } = require("../model/User");

exports.authMiddleware = async (req, res, next) => {
  if (!req.header("x-auth-token"))
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Not authorized to access this route"],
    });

  let token = req.header("x-auth-token").split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).populate("role", [
    "name",
    "_id",
  ]);

  if (!user)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["User Doesn't Exist."],
    });

  req.user = user;
  next();
};
