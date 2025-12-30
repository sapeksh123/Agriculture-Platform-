import connectDB from './config/db.js';
import app from './app.js';
import seedAdmin from './seeder/admin.seed.js';

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    // Start server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

// Run server
startServer();
