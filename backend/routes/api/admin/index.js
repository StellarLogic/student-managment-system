const express = require("express");
const {
  getUsersByRole,
  getAllUsers,
  activateUser,
} = require("../../../controller/admin/user_controller");
const router = express.Router();

router.get("/users/role", getUsersByRole);
router.get("/users", getAllUsers);
router.put("/user/activate/:id", activateUser);

module.exports = router;
