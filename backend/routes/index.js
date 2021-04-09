const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

// ################## AUTH ROUTE ##################
router.use("/user", require("./api/auth/index"));

// ################## ADMIN ROUTE ##################
router.use(
  "/admin",
  authMiddleware,
  roleCheck.isAdmin,
  require("./api/admin/index")
);

router.use("*", async (req, res) => {
  res.status(500).send({
    code: 500,
    message: [`Route no found`],
  });
});

module.exports = router;
