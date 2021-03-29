const { BAD_REQUEST, OK } = require("http-status");
const { Branch } = require("../../model/Branch");
const { Semester } = require("../../model/Semester");
const { User } = require("../../model/User");

exports.getAdminDashboard = async (req, res, next) => {
  let semester = await Semester.find();
  let branch = await Branch.find();
  let user = await User.find();

  return res.status(OK).send({
    code: OK,
    data: {
      semester: {
        count: semester.length,
      },
      branch: {
        count: branch.length,
      },
      user: {
        count: user.length,
      },
    },
    message: ["Dashboard Details."],
  });
};
