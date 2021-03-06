const { BAD_REQUEST } = require("http-status");

exports.isAccountActive = async (req, res, next) => {
  if (!req.user.isActivated)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Acoount not Active, Please Contact Admin."],
    });

  next();
};
