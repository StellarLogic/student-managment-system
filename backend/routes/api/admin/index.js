const express = require("express");
const {
  getAllBranch,
  addBranch,
} = require("../../../controller/admin/branch_controller");
const {
  getAdminDashboard,
} = require("../../../controller/admin/dashboard_controller");
const {
  getAllSemester,
  addSemester,
  addSubjectToSem,
  getSingleSemester,
  addUserToSem,
} = require("../../../controller/admin/semester_controller");
const {
  addSubject,
  getAllSubject,
} = require("../../../controller/admin/subject_controller");
const {
  addTeacherProfile,
  getSingleTeacherProfile,
  getAllTeacherProfile,
  updateTeacherProfile,
  deleteSingleTeacherProfile,
} = require("../../../controller/admin/teacher_controller");
const {
  getUsersByRole,
  getAllUsers,
  activateUser,
  deleteuser,
  updateUser,
} = require("../../../controller/admin/user_controller");
const router = express.Router();
const upload = require("../../../middleware/uploadImage");

// ################## DASHBOARD ROUTE ##################
router.get("/dashboard", getAdminDashboard);

// ################## USER ROUTE ##################
router.get("/users/role", getUsersByRole);
router.get("/users", getAllUsers);
router.put("/user/activate/:id", activateUser);
router.delete("/user/delete/:id", deleteuser);
router.put("/user/:id", updateUser);

// ################## USER PROFILE ROUTE ##################
router.post(
  "/user/profile/:id",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  addTeacherProfile
);
router.put(
  "/user/profile/:id",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  updateTeacherProfile
);
router.get("/user/profile/:id", getSingleTeacherProfile);
router.get("/user/profile", getAllTeacherProfile);
router.delete("/user/profile/:id", deleteSingleTeacherProfile);

// ################## BRANCH ROUTE ##################
router.get("/branch", getAllBranch);
router.post("/branch", addBranch);

// ################## SUBJECT ROUTE ##################
router.get("/subject", getAllSubject);
router.post("/subject", addSubject);

// ################## SEMESTER ROUTE ##################
router.get("/semester", getAllSemester);
router.post("/semester", addSemester);
router.put("/semester/:id", addSubjectToSem);
router.get("/semester/:id", getSingleSemester);
router.put("/semester/user/:id", addUserToSem);

module.exports = router;
