const Joi = require("joi");
const mongoose = require("mongoose");

const teacherProfileSchema = mongoose.Schema(
  {
    avatar: {
      public_id: { type: String },
      path: { type: String },
    },
    banner: {
      public_id: { type: String },
      path: { type: String },
    },
    contact: { type: String, require: true },
    bio: { type: String, require: true },
    skills: [{ type: String }],
    dob: {
      day: { type: String, require: true },
      month: { type: String, require: true },
      year: { type: String, require: true },
    },
    address: {
      apartment: { type: String, require: true },
      street: { type: String, require: true },
      state: { type: String, require: true },
      zip: { type: String, require: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    semester: [{ type: mongoose.Schema.Types.ObjectId, ref: "semester" }],
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: "subject" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

exports.validateTeacherProfile = (user) => {
  const schema = Joi.object({
    avatar: Joi.string(),
    banner: Joi.string(),
    bio: Joi.string().required().min(25).max(250).label("Bio"),
    skills: Joi.string().label("Skills"),
    day: Joi.string().required().label("Birth Day"),
    contact: Joi.string().length(10).required().label("Contact Number"),
    month: Joi.string().required().label("Birth Month"),
    year: Joi.string().required().label("Birth Year"),
    apartment: Joi.string().required().label("Apartment"),
    street: Joi.string().required().label("Street"),
    state: Joi.string().required().label("State"),
    zip: Joi.string().length(6).required().label("Zipcode"),
    semester: Joi.string(),
    subject: Joi.string(),
    students: Joi.string(),
  });

  return schema.validate(user, {
    abortEarly: false,
  });
};

exports.TeacherProfile = mongoose.model(
  "teacher_profile",
  teacherProfileSchema
);
