import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
} from "../utils/auth.util.js";
import sessionModel from "../models/session.model.js";
import crypto from "crypto";
import console from "console";

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

    const refreshToken = generateRefreshToken(user);
    // hash the refresh token before saving to database for security
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const session = await sessionModel.create({
      user: user._id,
      hashedRefreshToken,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const token = generateAccessToken(user);

    sendCookie(res, token);

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
    const refreshToken = generateRefreshToken(user); // also set in cookie
    // hash the refresh token before saving to database for security
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.create({
      user: user._id,
      refreshToken: hashedRefreshToken,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = generateAccessToken(user);

    sendCookie(res, accessToken, refreshToken);
    res.status(200).json({
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

/**
 * @name RefreshTokenController
 * @description refresh the access token using refresh token, excepts refresh token in cookies
 * @access public
 */
const refreshTokenController = async (req, res) => {
  const incomingRefreshtoken = req.cookies?.refreshToken;

  if (!incomingRefreshtoken) {
    return res.status(401).json({ message: "Invalid Refresh Token" });
  }

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(incomingRefreshtoken)
    .digest("hex");
  const session = await sessionModel.findOne({
    refreshToken:hashedRefreshToken,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({ message: "Invalid Refresh Token" });
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshtoken,
      process.env.JWT_REFRESH_SECRET,
    );
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    const newHashedRefreshToken = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshToken = newHashedRefreshToken;
    await session.save();

    sendCookie(res, newAccessToken, newRefreshToken);
    res.status(200).json({
      message: "Access token refreshed successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Refresh token error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @name LogoutController
 * @description Logout the user by invalidating the refresh token, excepts refresh token in cookies
 * @access public
 */
const logoutController = async (req, res) => {
  const incomingRefreshtoken = req.cookies?.refreshToken;

  if (!incomingRefreshtoken) {
    console.warn("Logout attempt without refresh token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(incomingRefreshtoken)
    .digest("hex");
 console.log("Hashed refresh token for logout:", hashedRefreshToken); // Debug log to verify the hashed token value
  const session = await sessionModel.findOne({
    refreshToken:hashedRefreshToken,
    revoked: false,
  });

  if (!session) {
    console.warn("Logout attempt with invalid or already revoked refresh token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("token");
  res.clearCookie("refreshToken");

  return res.status(200).json({ message: "Logged out successfully" });
};

export default {registerUserController, loginUserController, refreshTokenController, logoutController};
