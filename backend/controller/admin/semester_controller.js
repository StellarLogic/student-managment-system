const { Semester, validateSemester } = require("../../model/Semester");
const { BAD_REQUEST, OK } = require("http-status");
const _ = require("lodash");
const dateFns = require("date-fns");

// console.log(dateFns);

// ################## GET SEMESTER ##################
exports.getAllSemester = async (req, res, next) => {
  let semester = await Semester.find()
    .populate("subjects", ["name"])
    .select("-__v");

  if (!semester)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No Semester Found."],
    });

  return res.status(OK).send({
    code: OK,
    data: semester,
    message: ["Semester List."],
  });
};

// ################## GET SINGLE SEMESTER ##################
exports.getSingleSemester = async (req, res, next) => {
  let semester = await Semester.findById(req.params.id)
    .populate("subjects", ["name"])
    .select("-__v");

  if (!semester)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["No Semester Found."],
    });

  return res.status(OK).send({
    code: OK,
    data: semester,
    message: ["Semester List."],
  });
};

// ################## ADD SEMESTER ##################
exports.addSemester = async (req, res, next) => {
  const { error } = validateSemester(req.body);
  if (error)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: error.details.map((err) => err.message),
    });

  const { name, description } = req.body;
  let semester = await Semester.findOne({ name });

  if (semester)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Semester With Same Name Already Exist."],
    });
  semester = Semester({
    name,
    description,
  });
  await semester.save();

  return res.status(OK).send({
    code: OK,
    data: _.pick(semester, ["name", "description", "subjects"]),
    message: ["Semester Created Successfully."],
  });
};

// ################## ADD SUBJECT TO SEMESTER ##################

exports.addSubjectToSem = async (req, res, next) => {
  let semester = await Semester.findById(req.params.id);
  if (!semester)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Semester deosn't Exist."],
    });

  let isSubjectPresent = semester.subjects.indexOf(req.body.subject);

  if (isSubjectPresent == -1)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Subject Already Present."],
    });

  if (Array.isArray(req.body.subject)) {
    req.body.subject.map((subject) => {
      semester.subjects.push(subject.toString());
    });
  } else {
    semester.subjects.push(req.body.subject.toString());
  }

  await semester.save();

  return res.status(OK).send({
    code: OK,
    data: semester,
    message: ["Subject added Successfully."],
  });
};
