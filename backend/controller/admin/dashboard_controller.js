const moment = require("moment");
const { BAD_REQUEST, OK } = require("http-status");
const { Branch } = require("../../model/Branch");
const { Semester } = require("../../model/Semester");
const { User } = require("../../model/User");

exports.getAdminDashboard = async (req, res, next) => {
  let semester = await Semester.find();
  let branch = await Branch.find();
  let users = await User.find().populate("role");

  let teachers = users.filter(
    (user) => user.role && user.role.name == "teacher"
  ).length;
  let students = users.filter(
    (user) => user.role && user.role.name == "student"
  ).length;
  // return res.status(200).send({ teachers, students });
  // let students = await User.find({ role: "student" }).sort("createdAt");

  return res.status(OK).send({
    code: OK,
    data: {
      teachers: {
        count: teachers,
      },
      students: {
        count: students,
      },
      semesters: {
        count: semester.length,
      },
      branchs: {
        count: branch.length,
      },
    },
    message: ["Dashboard Details."],
  });
};
