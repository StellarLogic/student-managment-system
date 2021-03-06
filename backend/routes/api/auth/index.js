const express = require("express");
const { signUp, login } = require("../../../controller/auth");
const { authMiddleware } = require("../../../middleware/authMiddleware");
const { isAccountActive } = require("../../../middleware/isAccountActive");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
