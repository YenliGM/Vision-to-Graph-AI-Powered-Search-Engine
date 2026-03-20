import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, ChevronRight, Binary, Image as ImageIcon, Zap} from 'lucide-react';

/**
 * @fileoverview AIPanelVisualizer
 * @module components/AIPanelVisualizer
 * @description A professional, two-stage visualizer that handles the 
 * image upload prompt and then transitions to a robust side-by-side 
 * comparison view of the original input and the generated JSON data.
 */

// Define standard spring physics for professional motion design
const panelTransition = { duration: 0.6, type: "spring", stiffness: 80, damping: 18 };

const AIPanelVisualizer = ({ status, handleFileUpload, graphData }) => {
  // --- INTERNAL STATE (Manages the "After" panel toggle) ---
  // The left panel always shows the image. The right panel is toggled by the user.
  const [activeRightPanel, setActiveRightPanel] = useState('raw_json'); // 'raw_json' | 'node_map' (future)
  
  // Track the original file for the "Before" preview
  const [originFile, setOriginFile] = useState(null);
  const [originImageUrl, setOriginImageUrl] = useState(null);

  /**
   * Effect: Handles the file selection and generates a local Blob URL 
   * for an instant, zero-latency "Before" preview on the client side.
   */
  useEffect(() => {
    // When the status changes to uploading, we capture the file and create the URL
    if (originFile) {
      // Create a local Object URL (Blob) that can be accessed by the <img> tag
      const objectUrl = URL.createObjectURL(originFile);
      setOriginImageUrl(objectUrl);
      
      // Critical cleanup: Revoke the URL when the component unmounts
      // to prevent memory leaks. Professional Standard.
      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }
  }, [originFile]);

  // Intermediate function to capture the file and pass it to the hook
  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginFile(file);
      // Now pass the event to the centralized hook for network handling
      handleFileUpload(e); 
    }
  };

  /**
   * Helper: Professional fallback logic for raw adjacency lists or wrapped data
   */
  const getGraphData = () => {
    // Some formats return { success: true, graph: { ... } } 
    // Others return { ...adjacency_list... } directly. We handle both.
    const actualData = graphData?.graph || graphData;
    
    // Safety check: ensure we are not trying to stringify metadata (like "success")
    if (actualData && typeof actualData === 'object' && actualData.success !== undefined) {
      // If we accidentally got the full response object
      delete actualData.success; 
    }
    
    return JSON.stringify(actualData, null, 2);
  };

  return (
    <div className="relative group max-w-2xl mx-auto lg:mx-0">
      <AnimatePresence mode="wait">
        
        {/* ========================================================================= */}
        {/* STAGE 1: THE ACTIVE UPLOAD ZONE (Idle or Uploading States) */}
        {/* ========================================================================= */}
        {status !== 'success' && (
          <motion.div 
            key="upload-prompt"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            transition={panelTransition}
            layout
            className={`
              relative h-[250px] md:h-[300px] rounded-[2.5rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center text-center p-8
              ${status === 'error' ? 'border-red-500 bg-red-500/5' : 
                status === 'uploading' ? 'border-brand-blue bg-brand-blue/5' : 
                'border-text-main/10 hover:border-brand-blue/40 bg-white shadow-xl shadow-text-main/5'}
            `}
          >
            {/* Standard Hidden File Input (Covers the whole div for drag/click) */}
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={onFileSelected}
              disabled={status === 'uploading'}
              accept="image/*"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-text-main/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-text-main/40" />
              </div>
              <div>
                <p className="text-lg font-bold text-text-main tracking-tight">
                  {status === 'uploading' ? 'Analyzing Visual Semantics...' : 'Select Visualization'}
                </p>
                <p className="text-xs text-text-sub uppercase tracking-widest font-semibold mt-1">
                  Drag and drop or click to browse
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: THE TWO-PANEL RESULTS VIEW (Success State) */}
        {/* ========================================================================= */}
        {status === 'success' && (
          <motion.div
            key="results-view"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={panelTransition}
            layout
            className="flex flex-col md:flex-row gap-6 md:gap-4 h-full min-h-[400px] md:min-h-[500px]"
          >
            
            {/* PANEL LEFT: The "Origin" Image (Before) */}
            <div className="relative flex-1 bg-white rounded-[2rem] border border-text-main/5 p-6 shadow-xl shadow-text-main/5 overflow-hidden">
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-brand-white border border-text-main/5 rounded-full z-10">
                <ImageIcon className="w-3.5 h-3.5 text-text-sub" />
                <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest">
                  Origin (Input)
                </span>
              </div>
              
              {/* Image Container with contain-fit to avoid distortion */}
              <div className="h-full w-full flex items-center justify-center pt-10">
                {originImageUrl && (
                  <img 
                    src={originImageUrl} 
                    alt="Uploaded graph input" 
                    className="max-h-full max-w-full object-contain rounded-xl bg-slate-950/20 p-4"
                  />
                )}
              </div>
            </div>

            {/* Transition Arrow (Centered on larger screens) */}
            <div className="hidden lg:flex items-center justify-center -mx-2 z-10">
              <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shadow-lg shadow-brand-blue/20">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* PANEL RIGHT: The "Processed" Data (After) */}
            <div className="relative flex-1 h-full min-h-[300px] bg-slate-900 rounded-[2rem] border-2 border-brand-blue/10 p-6 shadow-xl shadow-brand-blue/5 overflow-hidden">
              
              {/* Header with Panel Selector (User can switch views here) */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between gap-2 z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-white/5 rounded-full">
                  <Binary className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                    AI Output (Adjacency)
                  </span>
                </div>

                {/* The Selector/Option Toggle */}
                <div className="flex gap-1.5 p-1 bg-slate-800 rounded-full border border-white/5">
                  <button 
                    onClick={() => setActiveRightPanel('raw_json')}
                    className={`p-2 rounded-full transition-colors ${activeRightPanel === 'raw_json' ? 'bg-brand-blue text-white' : 'text-text-sub/50 hover:text-white'}`}
                    title="View Raw Adjacency List (JSON)"
                  >
                    <Binary size={14} />
                  </button>
                  {/* Future-proof button for your B) approach */}
                  <button 
                    disabled // Disabled for now as requested
                    onClick={() => setActiveRightPanel('node_map')}
                    className={`p-2 rounded-full transition-colors ${activeRightPanel === 'node_map' ? 'bg-brand-blue text-white' : 'text-text-sub/50'}`}
                    title="View Stylized Node Map (Future)"
                  >
                    <Zap size={14} className="opacity-40" />
                  </button>
                </div>
              </div>
              
              {/* Content Area with Syntax-style formatting */}
              <div className="h-full w-full pt-16 font-mono text-xs overflow-auto">
                <AnimatePresence mode="wait">
                  {activeRightPanel === 'raw_json' && (
                    <motion.pre
                      key="raw-json"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-slate-300 leading-relaxed whitespace-pre"
                    >
                      {/* Safely extracts and formats the JSON graph data */}
                      {JSON.stringify(graphData?.graph || graphData, null, 2)}                      
                    </motion.pre>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIPanelVisualizer;