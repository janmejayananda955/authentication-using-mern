import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @name registerUserController
 * @description Register a new user
 */
const registerUserController = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Field can't be empty",
      });
    }
    const { username, email, password } = req.body;

    /* validate the inputs */
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username, email, and password" });
    }

    /* check if the user already exists */
    const isUserAleadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserAleadyExists) {
      return res.status(400).json({
        message: "User already exists with the provided email or username",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User register successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @name loginUserController
 * @description login a user, excepts email and password in request body
 * @access public
 */
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email, and password" });
    }

    const user = await userModel.findOne({ email });
    /* check user exists or not */
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    /* check password correct or not*/
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);
    res.status(201).json({
      message: "User login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { registerUserController, loginUserController };
