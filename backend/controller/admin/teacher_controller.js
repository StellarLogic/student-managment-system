const { BAD_REQUEST, OK } = require("http-status");
const {
  TeacherProfile,
  validateTeacherProfile,
} = require("../../model/TeacherProfile");
const { User } = require("../../model/User");
const moment = require("moment");
const { cloudinary } = require("../../middleware/cloudinary");
// var cloudinary = require("cloudinary").v2;

// console.log("cloudinary :>> ", cloudinary);

// ################# ADD TEACHER PROFILE ##########
exports.addTeacherProfile = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate("role");

  if (user.role.name !== "teacher")
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`Teacher Profile can't be created to a student.`],
    });

  const { error } = validateTeacherProfile(req.body);
  if (error)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: error.details.map((err) => err.message),
    });

  let profile = await TeacherProfile.findOne({ user: userId });

  if (profile)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`Profile Already Exist.`],
    });

  const {
    contact,
    bio,
    day,
    month,
    year,
    apartment,
    street,
    state,
    zip,
  } = req.body;

  profile = TeacherProfile({
    contact,
    bio,
    dob: { day, month, year },
    address: { apartment, street, state, zip },
    user: userId,
  });

  const { avatar, banner } = req.files;

  if (avatar) {
    const result = await cloudinary.uploader.upload(req.files.avatar[0].path, {
      folder: "avatar",
      use_filename: true,
    });
    profile.avatar.public_id = result.public_id;
    profile.avatar.path = result.url;
  }

  if (banner) {
    const result = await cloudinary.uploader.upload(req.files.banner[0].path, {
      folder: "banner",
      use_filename: true,
    });
    profile.banner.public_id = result.public_id;
    profile.banner.path = result.url;
  }

  await profile.save();

  return res.status(OK).send({
    code: OK,
    data: profile,
    message: [`Profile created successfully.`],
  });
};

// ################# GET SINGLE TEACHER PROFILE ##########
exports.getSingleTeacherProfile = async (req, res, next) => {
  let profile = await TeacherProfile.findOne(
    { user: req.params.id },
    { __v: 0 }
  ).populate({
    path: "user",
    select: "-_id -__v -updatedAt",
    populate: {
      path: "role",
      select: "name -_id",
    },
  });

  if (!profile)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`Profile Doesn't Exist.`],
    });

  return res.status(OK).send({
    code: OK,
    data: profile,
    message: [`Profile Found.`],
  });
};

// ################# GET All TEACHER PROFILE ##########
exports.getAllTeacherProfile = async (req, res, next) => {
  let profiles = await TeacherProfile.find(
    {},
    { __v: 0, updatedAt: 0 }
  ).populate({
    path: "user",
    select: "-_id -__v -updatedAt",
    populate: {
      path: "role",
      select: "name -_id",
    },
  });

  if (!profiles.length)
    return res.status(OK).send({
      code: OK,
      data: [],
      message: [`profiles List.`],
    });

  return res.status(BAD_REQUEST).send({
    code: BAD_REQUEST,
    data: profiles,
    message: [`profiles List.`],
  });
};

// ################# UPDATE TEACHER PROFILE ##########
exports.updateTeacherProfile = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate("role");

  if (user.role.name !== "teacher")
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`Teacher Profile can't be created to a student.`],
    });

  let profile = await TeacherProfile.findOne({ user: userId });
  if (!profile)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`Profile Doesn't Exist.`],
    });
  const {
    contact,
    bio,
    day,
    month,
    year,
    apartment,
    street,
    state,
    zip,
  } = req.body;

  if (contact) profile.contact = contact;
  if (bio) profile.bio = bio;
  if (day) profile.dob.day = day;
  if (month) profile.dob.month = month;
  if (year) profile.dob.year = year;
  if (apartment) profile.address.apartment = contact;
  if (street) profile.address.street = street;
  if (state) profile.address.state = state;
  if (zip) profile.address.zip = zip;

  const { avatar, banner } = req.files;

  if (avatar) {
    const result = await cloudinary.uploader.upload(req.files.avatar[0].path, {
      folder: "avatar",
      use_filename: true,
    });
    profile.avatar.public_id = result.public_id;
    profile.avatar.path = result.url;
  }

  if (banner) {
    const result = await cloudinary.uploader.upload(req.files.banner[0].path, {
      folder: "banner",
      use_filename: true,
    });

    profile.banner.public_id = result.public_id;
    profile.banner.path = result.url;
  }

  await profile.save();

  const updatedProfile = await TeacherProfile.findOne({ user: userId });
  return res.status(OK).send({
    code: OK,
    data: updatedProfile,
    message: [`Profile updated successfully.`],
  });
};

// ################# DELETE SINGLE TEACHER PROFILE ##########
exports.deleteSingleTeacherProfile = async (req, res, next) => {
  const userId = req.params.id;
  let profile = await TeacherProfile.findOneAndDelete({ user: userId });

  if (!profile)
    return res.status(BAD_REQUEST).send({
      code: BAD_REQUEST,
      message: [`Profile Doesn't Exist.`],
    });

  return res.status(OK).send({
    code: OK,
    message: [`Profile Successfully Deleted.`],
  });
};
