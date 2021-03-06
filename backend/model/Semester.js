const Joi = require("joi");
const mongoose = require("mongoose");

const semesterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "subject" }],
  },
  {
    timestamps: true,
  }
);

exports.validateSemester = (semester) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Semester Name"),
    description: Joi.string().required().label("Semester Description"),
  });

  return schema.validate(semester, {
    abortEarly: false,
  });
};

exports.Semester = mongoose.model("semester", semesterSchema);
