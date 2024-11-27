const { Router } = require('express');
const router = Router();

const {
  signup,
  getCurrentUser,
  signin,
  changePassword
  ,verifyOtp,
} = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

router.post("/register", signup);
router.post("/login", signin);
router.post("/verify-otp", verifyOtp);
router.get("/user", authorization, getCurrentUser);
router.post("/changepassword", changePassword);

module.exports = router;
