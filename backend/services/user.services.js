import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signupUser = async (username, email, password) => {
  // Check email
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error("User already exists");
  }

  // Check username
  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    throw new Error("Username is already taken");
  }

  // Password hashing happens in user.model.js
  const newUser = new User({
    username,
    email,
    password,
  });

  await newUser.save();

  return newUser;
};

export const signinUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

// Generate JWT
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Fetch user using ID
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
