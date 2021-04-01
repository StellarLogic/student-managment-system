const { BAD_REQUEST, OK } = require("http-status");
const { User } = require("../../model/User");
const moment = require("moment");

// ################## GET ALL USER ##################
exports.getAllUsers = async (req, res, next) => {
  let users = await User.find({ role: { $ne: "admin" } })
    .sort("createdAt")
    .populate("role");

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

// ################## GET USER BY ROLE ##################
exports.getUsersByRole = async (req, res, next) => {
  const { type } = req.query;
  if (type == "admin")
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Not Authorized to access Admin."],
    });

  let users = await User.find().select("-__v").populate("role");

  const formattedUser = users.map((user) => {
    const createdAt = moment(user.createdAt).format("DD-MM-YYYY");
    const updatedAt = moment(user.updatedAt).format("DD-MM-YYYY");
    return { ...user.toJSON(), createdAt, updatedAt };
  });

  const filteredUser = formattedUser.filter((user) => user.role.name == type);

  if (!users)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No user Found."],
    });

  return res.status(OK).send({
    code: OK,
    data: filteredUser,
    message: ["List of users."],
  });
};

// ################## ACTIVATE USERS ##################
exports.activateUser = async (req, res, next) => {
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
    message: [`${user.firstname}'s Account activated Successfully.`],
  });
};

// ################## ACTIVATE USERS ##################
exports.deleteuser = async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No user Found."],
    });

  await user.remove();

  return res.status(OK).send({
    code: OK,
    data: user,
    message: [`${user.firstname}'s Account Deleted Successfully.`],
  });
};
