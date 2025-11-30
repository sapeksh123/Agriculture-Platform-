// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Not authorized as admin",
    });
  }
};

// Middleware to check if user is owner
export const isOwner = (req, res, next) => {
  if (req.user && req.user.role === "owner") {
    next();
  } else {
    res.status(403).json({
      message: "Not authorized as owner",
    });
  }
};

// Middleware to check if user is shopkeeper
export const isShopkeeper = (req, res, next) => {
  if (req.user && req.user.role === "shopkeeper") {
    next();
  } else {
    res.status(403).json({
      message: "Not authorized as shopkeeper",
    });
  }
};

// Middleware to check if user is farmer
export const isFarmer = (req, res, next) => {
  if (req.user && req.user.role === "farmer") {
    next();
  } else {
    res.status(403).json({
      message: "Not authorized as farmer",
    });
  }
};
