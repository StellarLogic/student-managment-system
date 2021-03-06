const { OK, BAD_REQUEST } = require("http-status");
const { User, validateUser } = require("../../model/User");
const _ = require("lodash");

// ################## SIGNUP ##################
exports.signUp = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: error.details.map((err) => err.message),
    });

  const { firstname, lastname, username, email, password, role } = req.body;

  let user = await User.findOne({ $or: [{ email }, { username }] });
  if (user)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Username or Email Already is in use."],
    });

  user = User({
    firstname,
    lastname,
    username,
    email,
    password,
    role,
  });

  await user.save();

  const token = await user.generateToken();
  res.header("x-auth-token", token);
  return res.status(OK).send({
    code: OK,
    data: _.pick(user, [
      "firstname",
      "lastname",
      "username",
      "email",
      "role",
      "isActivated",
    ]),
    token,
    message: ["Account Successfully created"],
  });
};

// ################## LOGIN ##################
exports.login = async (req, res, next) => {
  const { username, email, password } = req.body;

  let user = await User.findOne({ $or: [{ email }, { username }] }).select(
    "+password"
  );

  if (!user)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Invalid Credentials."],
    });

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Invalid Credentials."],
    });

  if (!user.isActivated)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Acoount not Active, Please Contact Admin."],
    });

  const token = await user.generateToken();
  res.header("x-auth-token", token);
  return res.status(OK).send({
    code: OK,
    data: _.pick(user, [
      "firstname",
      "lastname",
      "username",
      "email",
      "role",
      "isActivated",
    ]),
    token,
    message: ["Successfully loggedin."],
  });
};
