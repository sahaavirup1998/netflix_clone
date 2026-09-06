import express from "express";

import {
  signup,
  signin,
  fetchUser,
  logout,
} from "../controllers/user.controller.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Signin
router.post("/signin", signin);

// Fetch logged-in user
router.get("/fetch-user", fetchUser);

// Logout
router.post("/logout", logout);

export default router;
