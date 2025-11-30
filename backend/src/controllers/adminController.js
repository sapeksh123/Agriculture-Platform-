import User from "../models/user.model.js";
import Owner from "../models/OwnerModel.js";
import Shopkeeper from "../models/ShopkeeperModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// Create Owner
export const createOwner = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      businessName,
      address,
      phoneNumber,
      aadharNumber
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !businessName || !address || !phoneNumber || !aadharNumber) {
      return errorResponse(res, "Please provide all required fields", 400);
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    // Create user with owner role
    const user = await User.create({
      name,
      email,
      password,
      role: "owner",
    });

    // Create owner profile
    const owner = await Owner.create({
      user: user._id,
      businessName,
      address,
      phoneNumber,
      aadharNumber
    });

    return successResponse(
      res,
      "Owner created successfully",
      {
        owner: {
          ...owner.toObject(),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// Create Shopkeeper
export const createShopkeeper = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      shopName,
      address,
      phoneNumber,
      aadharNumber
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !shopName || !address || !phoneNumber || !aadharNumber) {
      return errorResponse(res, "Please provide all required fields", 400);
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    // Create user with shopkeeper role
    const user = await User.create({
      name,
      email,
      password,
      role: "shopkeeper",
    });

    // Create shopkeeper profile
    const shopkeeper = await Shopkeeper.create({
      user: user._id,
      shopName,
      address,
      phoneNumber,
      aadharNumber
    });

    return successResponse(
      res,
      "Shopkeeper created successfully",
      {
        shopkeeper: {
          ...shopkeeper.toObject(),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// Get all owners
export const getAllOwners = async (req, res, next) => {
  try {
    const owners = await Owner.find().populate("user", "name email role");
    return successResponse(res, "Owners retrieved successfully", { owners });
  } catch (error) {
    next(error);
  }
};

// Get all shopkeepers
export const getAllShopkeepers = async (req, res, next) => {
  try {
    const shopkeepers = await Shopkeeper.find()
      .populate("user", "name email role");
    return successResponse(res, "Shopkeepers retrieved successfully", { shopkeepers });
  } catch (error) {
    next(error);
  }
};


// Get owner by ID
export const getOwnerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const owner = await Owner.findById(id)
      .populate("user", "name email role");

    if (!owner) {
      return errorResponse(res, "Owner not found", 404);
    }

    return successResponse(res, "Owner retrieved successfully", { owner });
  } catch (error) {
    next(error);
  }
};

// Get shopkeeper by ID
export const getShopkeeperById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const shopkeeper = await Shopkeeper.findById(id)
      .populate("user", "name email role");

    if (!shopkeeper) {
      return errorResponse(res, "Shopkeeper not found", 404);
    }

    return successResponse(res, "Shopkeeper retrieved successfully", { shopkeeper });
  } catch (error) {
    next(error);
  }
};


// Toggle Owner Status
export const toggleOwnerStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const owner = await Owner.findById(id);
    if (!owner) {
      return errorResponse(res, "Owner not found", 404);
    }

    // Toggle logic
    owner.status = owner.status === "active" ? "inactive" : "active";
    await owner.save();

    return successResponse(
      res,
      `Owner status updated to ${owner.status}`,
      { owner }
    );
  } catch (error) {
    next(error);
  }
};

// Toggle Shopkeeper Status
export const toggleShopkeeperStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const shopkeeper = await Shopkeeper.findById(id);
    if (!shopkeeper) {
      return errorResponse(res, "Shopkeeper not found", 404);
    }

    // Toggle logic
    shopkeeper.status = shopkeeper.status === "active" ? "inactive" : "active";
    await shopkeeper.save();

    return successResponse(
      res,
      `Shopkeeper status updated to ${shopkeeper.status}`,
      { shopkeeper }
    );
  } catch (error) {
    next(error);
  }
};
