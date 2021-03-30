const express = require("express");
const { signUp, login, getLoggedUser } = require("../../../controller/auth");
const {
  addRole,
  getRole,
  deleteRole,
} = require("../../../controller/auth/role_controller");
const { authMiddleware } = require("../../../middleware/authMiddleware");
const { isAccountActive } = require("../../../middleware/isAccountActive");
const { roleCheck } = require("../../../middleware/roleCheck");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", authMiddleware, getLoggedUser);
router.post("/role", authMiddleware, roleCheck.isAdmin, addRole);
router.get("/role", authMiddleware, getRole);
router.delete("/role/:id", authMiddleware, roleCheck.isAdmin, deleteRole);

module.exports = router;
