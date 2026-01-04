import ProductCategory from "../models/ProductCategoryModel.js"


export const CreateProductCategory = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await ProductCategory.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await ProductCategory.create({
      name,
      isActive,
    });

    return res.status(201).json({
      message: "Product category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("CreateProductCategory Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const GetAllProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("GetAllProductCategories Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const GetProductCategoryById = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error("GetProductCategoryById Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const UpdateProductCategory = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    const category = await ProductCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) category.name = name;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    return res.status(200).json({
      message: "Product category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("UpdateProductCategory Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const ToggleProductCategoryStatus = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isActive = !category.isActive;
    await category.save();

    return res.status(200).json({
      message: "Category status updated",
      data: category,
    });
  } catch (error) {
    console.error("ToggleProductCategoryStatus Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



