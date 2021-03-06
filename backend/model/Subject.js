const Joi = require("joi");
const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.validateSubject = (subject) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Subject Name"),
    description: Joi.string().required().label("Subject Description"),
  });

  return schema.validate(subject, {
    abortEarly: false,
  });
};

exports.Subject = mongoose.model("subject", subjectSchema);
