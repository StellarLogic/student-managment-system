const { Semester, validateSemester } = require("../../model/Semester");
const { BAD_REQUEST, OK } = require("http-status");
const _ = require("lodash");
const dateFns = require("date-fns");
const { Subject } = require("../../model/Subject");

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
    data: _.pick(semester, ["_id", "name", "description", "subjects"]),
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

  // if (isSubjectPresent == -1)
  //   return res.status(BAD_REQUEST).send({
  //     code: BAD_REQUEST,
  //     message: ["Subject Already Present."],
  //   });

  let includedSubject = [];

  if (Array.isArray(req.body.subjects)) {
    req.body.subjects.map((subject) => {
      if (semester.subjects.includes(subject)) {
        includedSubject.push(subject);
      } else {
        console.log("else", subject);
        semester.subjects.push(subject);
      }
    });
  } else {
    semester.subjects.push(req.body.subject);
  }

  await semester.save();

  if (includedSubject.length > 0) {
    // const ids = includedSubject.map(function (obj) {
    //   return ObjectId(obj._id);
    // });
    const presentSubjecs = await Subject.find(
      {
        _id: { $in: includedSubject },
      },
      { name: 1, _id: 1 }
    );

    return res.status(OK).send({
      code: OK,
      data: presentSubjecs,
      message: ["These subject are already present and added."],
    });
  }

  return res.status(OK).send({
    code: OK,
    data: semester,
    message: ["Subject added Successfully."],
  });
};

// ################## ADD TEACHER TO SEMESTER ##################
exports.addUserToSem = async (req, res, next) => {
  let semester = await Semester.findById(req.params.id);
  if (!semester)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: ["Semester deosn't Exist."],
    });

  if (req.query.user == "teacher") {
    let isTeacher = semester.teachers.indexOf(req.body.users);
    console.log(semester.teachers);
    if (isTeacher == -1)
      return res.status(BAD_REQUEST).send({
        code: BAD_REQUEST,
        message: ["Teacher Already Present."],
      });

    if (Array.isArray(req.body.teachers)) {
      req.body.teachers.map((teacher) => {
        semester.teachers.push(teacher.toString());
      });
    } else {
      semester.teachers.push(req.body.teacher.toString());
    }
  }
  await semester.save();

  return res.status(OK).send({
    code: OK,
    data: semester,
    message: ["Teacher added Successfully."],
  });
};
