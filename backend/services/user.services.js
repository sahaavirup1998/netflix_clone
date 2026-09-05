import User from "../models/user.model.js";

export const signupUser = async (username, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

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
    throw new Error("User not found");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};
