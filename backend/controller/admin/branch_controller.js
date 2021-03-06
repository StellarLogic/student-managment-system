const { Branch, validateBranch } = require("../../model/Branch");
const { BAD_REQUEST, OK } = require("http-status");
const _ = require("lodash");

// ################## ADD BRANCH ##################
exports.addBranch = async (req, res, next) => {
  const { error } = validateBranch(req.body);

  if (error)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: error.details.map((err) => err.message),
    });
  const { name, description, maxStudents } = req.body;
  let branch = await Branch.findOne({ name });

  if (branch)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Branch With Same Name Already Exist."],
    });
  branch = Branch({
    name,
    description,
    maxStudents,
  });
  await branch.save();

  return res.status(OK).send({
    code: OK,
    data: _.pick(branch, ["name", "description", "maxStudents"]),
    message: ["Branch Created Successfully."],
  });
};

// ################## GET BRANCH ##################
exports.getAllBranch = async (req, res, next) => {
  let branch = await Branch.find();

  if (!branch)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No branch Found."],
    });

  return res.status(OK).send({
    code: OK,
    data: branch,
    message: ["Branch List."],
  });
};

// ################## ADD TEACHER TO BRANCH ##################
