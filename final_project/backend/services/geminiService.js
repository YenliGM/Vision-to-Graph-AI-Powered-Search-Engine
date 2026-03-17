/**
 * @fileoverview Gemini AI Service
 * This service uses the modern Google Gen AI SDK to extract graph data
 * from images, following international enterprise standards.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// 1. SECURITY CHECK: Ensure the secret key exists before starting
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    throw new Error("[FATAL] GEMINI_API_KEY is missing. Please check your .env file.");
}

// 2. INITIALIZE THE BRAIN: Setup the Google Gen AI client
const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-2.5-flash";

/**
 * Transforms a graph image into a structured JSON adjacency list.
 * * @param {Buffer} imageBuffer - Raw image data from the upload.
 * @param {string} mimeType - The type of image (e.g., 'image/png').
 * @returns {Promise<Object>} The extracted graph data.
 */
export const extractGraphFromImage = async (imageBuffer, mimeType) => {
    try {
        // Access the most modern vision model
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        // Professional Prompt: Asking for strict JSON format as done in Colab
        const prompt = `
            Act as a Data Engineer. Analyze this graph image.
            Return a strictly valid JSON adjacency list in this format:
            {"Node": [["Neighbor", weight]]}
            Important: Return ONLY the JSON. No conversation or markdown.
        `;

        // Convert the image into a format the AI understands
        const imagePart = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // 3. ROBUST CLEANING: Find the JSON even if the AI adds extra text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("The AI did not return a valid graph structure.");
        }

        // Return the final data ready for the Search Engine
        return JSON.parse(jsonMatch[0]);

    } catch (error) {
        // Professional Error Logging
        console.error(`[AI ERROR] ${new Date().toISOString()}:`, error.message);
        throw new Error("Could not read the graph image. Please try a clearer picture.");
    }
};