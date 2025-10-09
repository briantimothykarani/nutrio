// server.js
import express from 'express';
import cors from 'cors';

// Initialize the Express application
const app = express();
// Railway typically uses the PORT environment variable. Default to 3000 for local development.
const PORT = process.env.PORT || 3000; 

// --- Middleware Setup ---

// Enable CORS for frontend access
app.use(cors({
    origin: '*', // Allows all origins for simplicity, but consider tightening this later.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable JSON body parsing
app.use(express.json());

// --- Routes ---

/**
 * @route GET /
 * @description Health check and welcome message.
 */
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Nutrio Backend is Running! Ready for data access.",
        environment: process.env.NODE_ENV || 'development',
        port: PORT
    });
});

/**
 * @route GET /api/v1/status
 * @description A dedicated health check endpoint.
 */
app.get('/api/v1/status', (req, res) => {
    res.status(200).json({ 
        status: "OK", 
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`✅ Nutrio Backend running on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/`);
});

// Export the app for testing or serverless functions if needed later
export default app;
