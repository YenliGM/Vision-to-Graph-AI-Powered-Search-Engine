/**
 * @fileoverview Main Entry Point - Vision-to-Graph API
 * This server orchestrates the flow between AI image extraction 
 * and graph search algorithms using Express.js.
 */

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';

// Import our specialized services
import { extractGraphFromImage } from './services/geminiService.js';
import { SearchEngine } from './services/searchEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- MIDDLEWARE CONFIGURATION ---
app.use(cors()); // Allows your Frontend to communicate with this Backend
app.use(express.json()); // Enables the server to read JSON data

// Configure Multer for secure memory storage of uploaded images
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit for international performance
});

/**
 * @route   POST /api/process-graph
 * @desc    Receives an image, extracts graph via AI, and returns adjacency list.
 * @access  Public
 */
app.post('/api/process-graph', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }

        console.log(`[SERVER] Processing image: ${req.file.originalname}`);

        // 1. Call the AI Service to transform image to data
        const adjacencyList = await extractGraphFromImage(
            req.file.buffer, 
            req.file.mimetype
        );

        res.status(200).json({
            success: true,
            graph: adjacencyList
        });

    } catch (error) {
        console.error('[ROUTE ERROR] /api/process-graph:', error.message);
        res.status(500).json({ error: 'Failed to extract graph from image.' });
    }
});

/**
 * @route   POST /api/search
 * @desc    Executes search algorithms on a provided graph.
 * @access  Public
 */
app.post('/api/search', (req, res) => {
    const { graph, start, goal, algorithm } = req.body;

    // Professional Practice: Validate inputs before heavy computation
    if (!graph || !start || !goal) {
        return res.status(400).json({ error: 'Missing required search parameters.' });
    }

    try {
        const engine = new SearchEngine(graph);
        let result = null;

        // Dynamic algorithm selection
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
            return res.status(404).json({ success: false, message: 'No path found between nodes.' });
        }

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error('[ROUTE ERROR] /api/search:', error.message);
        res.status(500).json({ error: 'Internal search engine failure.' });
    }
});

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
    console.error(`[FATAL ERROR] ${err.stack}`);
    res.status(500).send('Something went wrong on the server!');
});

app.listen(PORT, () => {
    console.log(`
    🚀  VISION-TO-GRAPH SERVER READY
    -------------------------------
    Environment: Production Standard
    Port: ${PORT}
    Status: Fully Functional
    `);
});