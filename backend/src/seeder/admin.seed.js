import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const seedAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      const passwordMatch = await bcrypt.compare(adminPassword, existingAdmin.password);
      if (!passwordMatch) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        existingAdmin.password = hashedPassword;
        await existingAdmin.save();
        console.log("Admin password updated successfully");
      } else {
        console.log("Admin already exists and password is up to date");
      }
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin created successfully");
    }

    console.log(`Credentials — Email: ${adminEmail}, Password: ${adminPassword}`);
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

export default seedAdmin;
