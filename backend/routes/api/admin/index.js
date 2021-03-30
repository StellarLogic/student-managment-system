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
  getUsersByRole,
  getAllUsers,
  activateUser,
  deleteuser,
} = require("../../../controller/admin/user_controller");
const router = express.Router();

// ################## DASHBOARD ROUTE ##################
router.get("/dashboard", getAdminDashboard);

// ################## USER ROUTE ##################
router.get("/users/role", getUsersByRole);
router.get("/users", getAllUsers);
router.put("/user/activate/:id", activateUser);
router.delete("/user/delete/:id", deleteuser);

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
