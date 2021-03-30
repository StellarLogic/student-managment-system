const Joi = require("joi");
const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.validateRole = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Role"),
  });

  return schema.validate(user, {
    abortEarly: false,
  });
};

exports.Role = mongoose.model("role", roleSchema);
