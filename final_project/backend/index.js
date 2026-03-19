/**
 * @fileoverview Main Entry Point - Vision-to-Graph API
 * This server orchestrates the workflow between AI-powered image extraction 
 * and graph search algorithms using Express.js.
 * * Features: Dynamic CORS for cloud environments, secure file handling, 
 * and standardized error responses.
 */

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';

// Import specialized domain services
import { extractGraphFromImage } from './services/geminiService.js';
import { SearchEngine } from './services/searchEngine.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- DYNAMIC CORS CONFIGURATION ---
/**
 * Professional CORS setup designed for GitHub Codespaces.
 * Instead of a hardcoded URL, it dynamically validates the origin to allow
 * subdomains from the .app.github.dev environment and local development.
 */
// --- IMPROVED DYNAMIC CORS CONFIGURATION ---
const corsOptions = {
    origin: (origin, callback) => {
        // 1. Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        // 2. Define allowed patterns (Localhost and Codespaces)
        const allowedPatterns = [
            /^https?:\/\/localhost(:\d+)?$/,         // Matches http://localhost:5173, https://localhost, etc.
            /^https?:\/\/.*\.app\.github\.dev$/,    // Matches any GitHub Codespace URL
            /^https?:\/\/.*\.preview\.app\.github\.dev$/ // Matches Codespace preview URLs
        ];

        // 3. Check if the current origin matches any pattern
        const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));

        if (isAllowed) {
            callback(null, true);
        } else {
            // Log for debugging but don't pass an Error object to avoid 500 status codes
            console.warn(`[CORS] Request from unauthorized origin: ${origin}`);
            callback(null, false); 
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// --- MULTER CONFIGURATION ---
/**
 * Configures image uploads to use memory storage for faster processing
 * and sets a 5MB limit to optimize performance for international users.
 */
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } 
});

/**
 * @route   POST /api/process-graph
 * @desc    Receives an image, extracts graph data via AI, and returns an adjacency list.
 * @access  Public (Standard API)
 */
app.post('/api/process-graph', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }

        console.log(`[PROCESS] Analyzing graph from image: ${req.file.originalname}`);

        // Invoke AI service to transform visual data into a structured graph
        const adjacencyList = await extractGraphFromImage(
            req.file.buffer, 
            req.file.mimetype
        );

        res.status(200).json({
            success: true,
            graph: adjacencyList
        });

    } catch (error) {
        console.error('[SERVICE ERROR] /api/process-graph:', error.message);
        res.status(500).json({ error: 'Failed to extract graph data from the provided image.' });
    }
});

/**
 * @route   POST /api/search
 * @desc    Executes pathfinding algorithms (BFS, DFS, UCS) on a provided graph.
 * @access  Public (Standard API)
 */
app.post('/api/search', (req, res) => {
    const { graph, start, goal, algorithm } = req.body;

    // Validation: Ensure all necessary data for computation is present
    if (!graph || !start || !goal) {
        return res.status(400).json({ error: 'Missing required parameters: graph, start, or goal.' });
    }

    try {
        const engine = new SearchEngine(graph);
        let result = null;

        // Dynamic algorithm selection based on client request
        switch (algorithm?.toUpperCase()) {
            case 'DFS':
                result = engine.runDFS(start, goal);
                break;
            case 'UCS':
                result = engine.runUCS(start, goal);
                break;
            case 'BFS':
            default:
                result = engine.runBFS(start, goal);
                break;
        }

        if (!result) {
            return res.status(404).json({ success: false, message: 'No valid path exists between nodes.' });
        }

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error('[ALGORITHM ERROR] /api/search:', error.message);
        res.status(500).json({ error: 'The search engine encountered an internal error.' });
    }
});

// --- GLOBAL ERROR HANDLING ---
app.use((err, req, res, next) => {
    console.error(`[CRITICAL] Unhandled Exception: ${err.stack}`);
    res.status(500).json({ 
        error: 'Internal Server Error', 
        message: 'A critical error occurred. Please contact the system administrator.' 
    });
});

// --- SERVER INITIALIZATION ---
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    -------------------------------------------
    🚀  VISION-TO-GRAPH SERVER IS LIVE
    -------------------------------------------
    Listening on Port: ${PORT}
    CORS Status: Enabled (Dynamic Validation)
    Mode: Cloud Optimized (Codespaces)
    -------------------------------------------
    `);
});