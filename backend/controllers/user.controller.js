import jwt from "jsonwebtoken";

import {
  signupUser,
  signinUser,
  generateToken,
  getUserById,
} from "../services/user.services.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Create user
    const newUser = await signupUser(username, email, password);

    // Generate JWT
    const token = generateToken(newUser._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Remove password
    const { password: _, ...userData } = newUser.toObject();

    return res.status(201).json({
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await signinUser(email, password);

    // Generate JWT
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Remove password
    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      message: "Logged in successfully",
      user: userData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// FETCH LOGGED-IN USER
export const fetchUser = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserById(decoded.id);

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
