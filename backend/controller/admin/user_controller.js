const { BAD_REQUEST, OK } = require("http-status");
const { User } = require("../../model/User");
const moment = require("moment");

// ################## GET ALL USER ##################
exports.getAllUsers = async (req, res, next) => {
  let users = await User.find({}, { __v: 0, updatedAt: 0 })
    .sort("createdAt")
    .populate("role", ["name", "_id"]);

  if (!users)
    return res.status(OK).send({
      code: OK,
      message: ["No user Found."],
    });

  const filteredUser = users.filter(
    (user) => user.role && user.role.name !== "admin"
  );

  return res.status(OK).send({
    code: OK,
    data: filteredUser,
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

  const filteredUser = formattedUser.filter(
    (user) => user.role && user.role.name == type
  );

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

// ################## UPDATE USERS ##################
exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;

  let user = await User.findById(userId);

  if (!user)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No user Found."],
    });

  const { firstname, lastname, username, email, password, role } = req.body;

  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  if (role) user.role = role;

  await user.save();

  return res.status(OK).send({
    code: OK,
    data: user,
    message: ["User updated successfully."],
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
