import { signinUser, signupUser } from "../services/user.services.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = await signupUser(username, email, password);
    const { password: _, ...userData } = newUser.toObject();
    res
      .status(201)
      .json({ message: "User registered successfully", user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  try {
    const user = await signinUser(email, password);

    // Remove password before sending response
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      message: "User signed in successfully",
      user: userData,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};