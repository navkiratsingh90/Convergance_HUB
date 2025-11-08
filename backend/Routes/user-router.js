import express from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  jwtAuth,
} from "../controllers/authController.js";

const router = express.Router();

// Auth APIs
router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected test route
router.get("/me", jwtAuth, (req, res) => {
  res.status(200).json({ msg: "Authorized", userId: req.user });
});

export default router;
