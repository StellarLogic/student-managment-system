const { BAD_REQUEST } = require("http-status");

exports.roleCheck = {
  isAdmin: async (req, res, next) => {
    if (req.user.role.name !== "admin") {
      return res.status(BAD_REQUEST).send({
        code: BAD_REQUEST,
        message: ["UnAuthorized"],
      });
    }
    next();
  },
  isTeacher: async (req, res, next) => {
    if (req.user.role.name !== "teacher")
      return res.status(BAD_REQUEST).send({
        code: BAD_REQUEST,
        message: ["UnAuthorized"],
      });
    next();
  },
};
