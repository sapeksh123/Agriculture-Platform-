import User from "../models/user.model.js";
import Owner from "../models/OwnerModel.js";
import Shopkeeper from "../models/ShopkeeperModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

/* 
   CREATE OWNER
*/
export const createOwner = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      businessName,
      address,
      phoneNumber,
      aadharNumber,
    } = req.body;

    // 1️⃣ Validation
    if (
      !name ||
      !email ||
      !password ||
      !businessName ||
      !address ||
      !phoneNumber ||
      !aadharNumber
    ) {
      return errorResponse(res, "All fields are required", 400);
    }

    // 2️⃣ Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    // 3️⃣ Create User
    const user = await User.create({
      name,
      email,
      password,
      role: "owner",
    });

    // 4️⃣ Get image URLs from Cloudinary
    const ownerImage = req.files?.ownerImage?.[0]?.path || "";
    const shopImage = req.files?.shopImage?.[0]?.path || "";

    // 5️⃣ Create Owner profile
    const owner = await Owner.create({
      user: user._id,
      businessName,
      address,
      phoneNumber,
      aadharNumber,
      ownerImage,
      shopImage,
    });

    // 6️⃣ Response
    return successResponse(res, "Owner created successfully", { owner }, 201);
  } catch (error) {
    next(error);
  }
};

/* 
   CREATE SHOPKEEPER
*/
export const createShopkeeper = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      shopName,
      address,
      phoneNumber,
      aadharNumber,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !shopName ||
      !address ||
      !phoneNumber ||
      !aadharNumber
    ) {
      return errorResponse(res, "All fields are required", 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "shopkeeper",
    });

    const ownerImage = req.files?.ownerImage?.[0]?.path || "";
    const shopImage = req.files?.shopImage?.[0]?.path || "";

    const shopkeeper = await Shopkeeper.create({
      user: user._id,
      shopName,
      address,
      phoneNumber,
      aadharNumber,
      ownerImage,
      shopImage,
    });

    return successResponse(res, "Shopkeeper created successfully", { shopkeeper }, 201);
  } catch (error) {
    next(error);
  }
};

/* 
   GET ALL OWNERS
  */
export const getAllOwners = async (req, res, next) => {
  try {
    const owners = await Owner.find().populate("user", "name email role");
    return successResponse(res, "Owners fetched successfully", { owners });
  } catch (error) {
    next(error);
  }
};

/* 
   GET OWNER BY ID
*/
export const getOwnerById = async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.params.id).populate(
      "user",
      "name email role"
    );

    if (!owner) {
      return errorResponse(res, "Owner not found", 404);
    }

    return successResponse(res, "Owner fetched successfully", { owner });
  } catch (error) {
    next(error);
  }
};

/* 
   GET ALL SHOPKEEPERS
 */
export const getAllShopkeepers = async (req, res, next) => {
  try {
    const shopkeepers = await Shopkeeper.find().populate(
      "user",
      "name email role"
    );
    return successResponse(res, "Shopkeepers fetched successfully", { shopkeepers });
  } catch (error) {
    next(error);
  }
};

/* 
   GET SHOPKEEPER BY ID
 */
export const getShopkeeperById = async (req, res, next) => {
  try {
    const shopkeeper = await Shopkeeper.findById(req.params.id).populate(
      "user",
      "name email role"
    );

    if (!shopkeeper) {
      return errorResponse(res, "Shopkeeper not found", 404);
    }

    return successResponse(res, "Shopkeeper fetched successfully", { shopkeeper });
  } catch (error) {
    next(error);
  }
};

/* 
   TOGGLE OWNER STATUS
 */
export const toggleOwnerStatus = async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return errorResponse(res, "Owner not found", 404);
    }

    owner.status = owner.status === "active" ? "inactive" : "active";
    await owner.save();

    return successResponse(res, "Owner status updated", { owner });
  } catch (error) {
    next(error);
  }
};

/* 
   TOGGLE SHOPKEEPER STATUS
*/
export const toggleShopkeeperStatus = async (req, res, next) => {
  try {
    const shopkeeper = await Shopkeeper.findById(req.params.id);
    if (!shopkeeper) {
      return errorResponse(res, "Shopkeeper not found", 404);
    }

    shopkeeper.status =
      shopkeeper.status === "active" ? "inactive" : "active";
    await shopkeeper.save();

    return successResponse(res, "Shopkeeper status updated", { shopkeeper });
  } catch (error) {
    next(error);
  }
};

// update owner 

export const updateOwner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      businessName,
      address,
      phoneNumber,
      aadharNumber,
      status,
    } = req.body;

    // 1️⃣ Find owner + user
    const owner = await Owner.findById(id).populate("user");
    if (!owner) {
      return errorResponse(res, "Owner not found", 404);
    }

    // 2️⃣ Update USER fields
    if (name) {
      owner.user.name = name;
    }

    // ✅ Email update (SAFE)
    if (email && email !== owner.user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return errorResponse(res, "Email already in use", 400);
      }
      owner.user.email = email;
    }

    await owner.user.save();

    // 3️⃣ Update OWNER fields
    if (businessName) owner.businessName = businessName;
    if (address) owner.address = address;
    if (phoneNumber) owner.phoneNumber = phoneNumber;
    if (aadharNumber) owner.aadharNumber = aadharNumber;
    if (status) owner.status = status;

    // 4️⃣ Image update
    if (req.files?.ownerImage) {
      owner.ownerImage = req.files.ownerImage[0].path;
    }

    if (req.files?.shopImage) {
      owner.shopImage = req.files.shopImage[0].path;
    }

    await owner.save();

    return successResponse(res, "Owner updated successfully", { owner });
  } catch (error) {
    next(error);
  }
};



// update shopkeeper
export const updateShopkeeper = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, shopName, address, phoneNumber, aadharNumber, status } = req.body;

    const shopkeeper = await Shopkeeper.findById(id).populate("user");
    if (!shopkeeper) {
      return errorResponse(res, "Shopkeeper not found", 404);
    }

    // ✅ Update name
    if (name) {
      shopkeeper.user.name = name;
    }

    // ✅ Update email (NEW)
    if (email && email !== shopkeeper.user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return errorResponse(res, "Email already in use", 400);
      }
      shopkeeper.user.email = email;
    }

    await shopkeeper.user.save();

    // Shopkeeper fields
    if (shopName) shopkeeper.shopName = shopName;
    if (address) shopkeeper.address = address;
    if (phoneNumber) shopkeeper.phoneNumber = phoneNumber;
    if (aadharNumber) shopkeeper.aadharNumber = aadharNumber;
    if (status) shopkeeper.status = status;

    // Images
    if (req.files?.ownerImage) {
      shopkeeper.ownerImage = req.files.ownerImage[0].path;
    }
    if (req.files?.shopImage) {
      shopkeeper.shopImage = req.files.shopImage[0].path;
    }

    await shopkeeper.save();

    return successResponse(res, "Shopkeeper updated successfully", { shopkeeper });
  } catch (error) {
    next(error);
  }
};

