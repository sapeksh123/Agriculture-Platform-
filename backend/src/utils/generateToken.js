import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Make sure environment variables are loaded

const generateToken = (id, role) => {
  try {
    const token = jwt.sign(
      { id, role },
      process.env.JWT_SECRET, // ensure this variable exists in your .env file
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("❌ Error generating token:", error.message);
    throw error;
  }
};

export default generateToken;
