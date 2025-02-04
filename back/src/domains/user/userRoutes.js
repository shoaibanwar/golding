// User-related API routes
import express from "express";
import UserService from "./userService.js";
import UserController from "./userController.js";
import AuthMiddleware from "./userMiddleware.js";

const router = express.Router();

// Initialize service and controller instances
const userService = new UserService();
const userController = new UserController(userService);

/**
 * @route   POST /user/login
 * @desc    Authenticate user and return a JWT token
 * @access  Public
 */
router.post("/login", userController.login.bind(userController));
// Binding ensures `this` in login method refers to `UserController` instance

/**
 * @route   GET /user/status
 * @desc    Retrieve list of users (protected route)
 * @access  Private (requires authentication)
 */
router.get("/status", AuthMiddleware.verifyToken, userController.getStatus.bind(userController));
// Uses AuthMiddleware to verify JWT before accessing the controller method

export default router;