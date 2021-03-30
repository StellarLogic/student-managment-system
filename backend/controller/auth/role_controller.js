const { BAD_REQUEST, OK } = require("http-status");
const { Role, validateRole } = require("../../model/Role");
const _ = require("lodash");
const moment = require("moment");

// ################## ADD ROLE ##################
exports.addRole = async (req, res, next) => {
  const { error } = validateRole(req.body);
  if (error)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: error.details.map((err) => err.message),
    });
  let roles = await Role.find();
  const roleAlreadyPresent = roles.map((role) => role.name == req.body.name);
  console.log("name :>> ", roleAlreadyPresent);

  if (roleAlreadyPresent.includes(true))
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`${req.body.name} role is already present.`],
    });

  role = Role({
    name: req.body.name.toLowerCase(),
  });
  await role.save();

  return res.status(OK).send({
    code: OK,
    data: role,
    message: [`${req.body.name} role successfully created.`],
  });
};

// ################## GET ROLE ##################
exports.getRole = async (req, res, next) => {
  let roles = await Role.find({}, { _id: 1, name: 1, createdAt: 1 });
  const formattedRole = roles.map((role) => ({
    ...role.toJSON(),
    createdAt: moment(role.createdAt).format("DD-MM-YYYY"),
  }));

  return res.status(OK).send({
    code: OK,
    data: formattedRole,
    message: [`List of roles.`],
  });
};

// ################## GET ROLE ##################
exports.deleteRole = async (req, res, next) => {
  let role = await Role.findByIdAndDelete(req.params.id);
  if (!role)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`Invalid Role.`],
    });

  return res.status(OK).send({
    code: OK,
    data: role,
    message: [`${role.name} role successfully deleted.`],
  });
};
