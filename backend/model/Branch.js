const Joi = require("joi");
const mongoose = require("mongoose");

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    teachers: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "user" } }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    maxStudents: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.validateBranch = (branch) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Branch Name"),
    description: Joi.string().required().label("Description"),
    maxStudents: Joi.number()
      .required()
      .min(1)
      .max(240)
      .label("Max Student Count"),
  });

  return schema.validate(branch, {
    abortEarly: false,
  });
};

exports.Branch = mongoose.model("branch", branchSchema);
