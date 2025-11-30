import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

//  Signup (only for farmers)
export const signupFarmer = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, "Please provide all required fields", 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "farmer",
    });

    const token = generateToken(user._id, user.role);

    return successResponse(
      res,
      "Farmer registered successfully",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      201
    );
  } catch (error) {
    next(error);
  }
};


//login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(res, "Please provide email and password", 400);
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Send success response
    return successResponse(res, "Login successful", {
      token,
      role: user.role
    });
  } catch (error) {
    console.error("Login error:", error.message);
    next(error);
  }
};