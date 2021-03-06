const { Subject, validateSubject } = require("../../model/Subject");
const { BAD_REQUEST, OK } = require("http-status");
const _ = require("lodash");

// ################## ADD SUBJECT ##################
exports.addSubject = async (req, res, next) => {
  const { error } = validateSubject(req.body);
  if (error)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: error.details.map((err) => err.message),
    });

  const { name, description } = req.body;
  let subject = await Subject.findOne({ name });

  if (subject)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Subject With Same Name Already Exist."],
    });
  subject = Subject({
    name,
    description,
  });
  await subject.save();

  return res.status(OK).send({
    code: OK,
    data: _.pick(subject, ["name", "description"]),
    message: ["Subject Created Successfully."],
  });
};

// ################## GET SUBJECT ##################
exports.getAllSubject = async (req, res, next) => {
  let subject = await Subject.find().select("-__v");

  if (!subject)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      data: [],
      message: ["No Subject Found."],
    });

  return res.status(OK).send({
    code: OK,
    data: subject,
    message: ["Subject List."],
  });
};
