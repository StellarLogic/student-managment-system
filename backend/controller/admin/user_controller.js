const { BAD_REQUEST, OK } = require("http-status");
const { User } = require("../../model/User");

// ################## GET USER BY ROLE ##################
exports.getUsersByRole = async (req, res, next) => {
  const { type } = req.query;
  if (type == "admin")
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Not Authorized to access Admin."],
    });

  let users = await User.find({ role: type });

  if (!users)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No user Found."],
    });

  return res.status(OK).send({
    code: OK,
    data: users,
    message: ["List of users."],
  });
};

// ################## GET ALL USER ##################
exports.getAllUsers = async (req, res, next) => {
  let users = await User.find({ role: { $ne: "admin" } }).sort("createdAt");

  if (!users)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No user Found."],
    });

  return res.status(OK).send({
    code: OK,
    data: users,
    message: ["List of users."],
  });
};

// ################## ACTIVATE USERS ##################
exports.activateUser = async (req, res, next) => {
  console.log(req.user);
  let user = await User.findById(req.params.id);

  if (!user)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No user Found."],
    });

  user.isActivated = !user.isActivated;
  await user.save();

  return res.status(OK).send({
    code: OK,
    data: user,
    message: ["User ."],
  });
};
