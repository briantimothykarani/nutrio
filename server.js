// server.js
import express from "express";
import cors from "cors";
import pg from "pg";

// Initialize the Express application
const app = express();
// Railway typically uses the PORT environment variable. Default to 3000 for local development.
const PORT = process.env.PORT || 3000;

// --- Database Connection Setup ---
const { Pool } = pg;
let dbPool;

try {
  // Railway automatically injects the DATABASE_URL environment variable.
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // CRUCIAL for Railway: ensures SSL is used for external connections
    ssl: {
      rejectUnauthorized: false,
    },
  });

  dbPool
    .query("SELECT 1 + 1 AS result")
    .then((res) =>
      console.log(
        "✅ PostgreSQL Database Connected! Test result:",
        res.rows[0].result,
      ),
    )
    .catch((err) =>
      console.error("❌ Database connection failed on startup:", err.message),
    );
} catch (error) {
  console.error(`❌ DB Initialization Error: ${error.message}`);
}
// --- End Database Connection Setup ---

// --- Middleware Setup (CORS FIX APPLIED HERE) ---

// 1. Define allowed origins:
const allowedOrigins = [
  "http://localhost:5173", // Your local React development server (REQUIRED to fix the current error)
  "https://brianthechildpredator.github.io", // Placeholder for your GitHub Pages base domain
  // Add the full URL once you know it, e.g., 'https://brianthechildpredator.github.io/nutrio-frontend/'
];

// Enable CORS for frontend access
app.use(
  cors({
    origin: allowedOrigins, // NOW USES THE SPECIFIC LIST
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Enable JSON body parsing
app.use(express.json());

// --- Routes ---

/**
 * @route GET /
 * @description Health check and welcome message. Essential for Railway's deployment checks.
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Nutrio Backend is Running! Ready for data access.",
    environment: process.env.NODE_ENV || "development",
    port: PORT,
  });
});

/**
 * @route GET /api/v1/status
 * @description A dedicated health check endpoint.
 */
app.get("/api/v1/status", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ----------------------------------------------------------------------
// NEW FEATURE: User Authentication (Sign-Up)
// ----------------------------------------------------------------------

/**
 * @route POST /api/v1/users/signup
 * @description Handles user registration.
 * NOTE: This is a placeholder. Database logic will be added here next.
 */
app.post("/api/v1/users/signup", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Missing required fields: email, password, and name." });
  }

  // For now, we return a success placeholder
  console.log(`Attempted sign-up for: ${email}`);
  res.status(201).json({
    message: "User registration received (Database connection needed next).",
    user: { name, email },
  });
});

// ----------------------------------------------------------------------

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`✅ Nutrio Backend running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/`);
});

// Export the app for testing or serverless functions if needed later
export default app;
