import express from "express";
import authController from "../controller/auth.controller.js";

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public 
 */
authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description login new user
 * @access Public 
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route get /api/auth/refreshToken
 * @description Generates a new access token using a valid refresh token cookie
 * @access Public 
 */
authRouter.get("/refresh-token", authController.refreshTokenController)

/**
 * @route get /api/auth/logout
 */
authRouter.get("/logout", authController.logoutController)

export default authRouter;