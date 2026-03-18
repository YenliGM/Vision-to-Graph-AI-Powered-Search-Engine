import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, Minimize2, RotateCcw, Settings2, 
  MousePointer2, Move, Info, Share2, X,
  Play, Activity, Terminal, CheckCircle2
} from 'lucide-react';

/**
 * @component GraphExplorer
 * @description Highly responsive and functional graph analysis dashboard.
 * Implements simulated heuristic search logic and professional error handling.
 */
const GraphExplorer = ({ isExplorerMode, onExit }) => {
  // State Management
  const [activeAlgo, setActiveAlgo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  /**
   * Mock Data Engine
   * Generates professional-grade analysis reports based on selected algorithms.
   */
  const runAlgorithmInference = (algoName) => {
    setIsProcessing(true);
    setAnalysisResult(null);
    setActiveAlgo(algoName);

    // Simulate Network/Processing Latency (Standard for AI UI/UX)
    setTimeout(() => {
      const mockResults = {
        'Shortest Path (UCS)': { path: 'N-842 → N-102 → N-504', cost: '14.82ms', nodes: 3 },
        'BFS Discovery': { layers: 4, totalNodes: 124, connectivity: '98.2%' },
        'DFS Traversal': { maxDepth: 12, cyclesDetected: 0, status: 'Complete' },
        'Cycle Detection': { found: false, complexity: 'O(V+E)', hash: '0x842AF' }
      };
      
      setAnalysisResult(mockResults[algoName]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col lg:flex-row h-full min-h-[600px] w-full bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-text-main/5 overflow-hidden"
    >
      {/* 1. MAIN VISUALIZATION CANVAS */}
      <div className="relative flex-1 bg-[#f8fafc] overflow-hidden min-h-[300px]">
        
        {/* Header Controls */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-30">
          <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-white flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-brand-blue animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest leading-none">
              {isProcessing ? 'Engine: Processing' : 'Engine: Standby'}
            </span>
          </div>

          {isExplorerMode && (
            <button 
              onClick={onExit}
              className="p-3 bg-white/90 backdrop-blur-md hover:bg-red-50 text-text-sub hover:text-red-500 rounded-2xl border border-text-main/5 shadow-lg transition-all active:scale-90"
              aria-label="Exit Explorer"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Visual Feedback Area */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
           <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                  <Activity size={48} className="text-brand-blue animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-brand-blue/20 rounded-full"
                  />
                </div>
                <p className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-widest">Inference in progress...</p>
              </motion.div>
            ) : analysisResult ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white border border-brand-blue/10 p-6 rounded-[2rem] shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-brand-blue">
                  <CheckCircle2 size={24} />
                  <h4 className="text-sm font-bold uppercase tracking-tight">Analysis Complete</h4>
                </div>
                <div className="space-y-3">
                  {Object.entries(analysisResult).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-[10px] text-text-sub uppercase font-bold">{key}:</span>
                      <span className="text-xs font-mono font-bold text-text-main">{value}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setAnalysisResult(null)}
                  className="mt-6 w-full py-3 text-[10px] font-bold uppercase tracking-widest text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-colors"
                >
                  Clear Results
                </button>
              </motion.div>
            ) : (
              <div className="text-center opacity-20">
                <Share2 size={64} className="mx-auto text-brand-blue mb-4" />
                <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Select Algorithm to Start</p>
              </div>
            )}
           </AnimatePresence>
        </div>

        {/* Canvas Toolbar (Desktop Only) */}
        <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 p-2 bg-white/90 backdrop-blur-md border border-white rounded-2xl shadow-2xl z-20">
          <button onClick={() => setZoomLevel(prev => Math.min(prev + 10, 200))} className="p-3 hover:bg-brand-blue/5 rounded-xl text-text-sub hover:text-brand-blue transition-colors">
            <Maximize2 size={18} />
          </button>
          <button onClick={() => setZoomLevel(prev => Math.max(prev - 10, 50))} className="p-3 hover:bg-brand-blue/5 rounded-xl text-text-sub hover:text-brand-blue transition-colors">
            <Minimize2 size={18} />
          </button>
          <div className="w-px h-6 bg-text-main/10 mx-2" />
          <button className="p-3 bg-brand-blue text-white rounded-xl shadow-md"><MousePointer2 size={18} /></button>
          <button className="p-3 hover:bg-brand-blue/5 rounded-xl text-text-sub transition-colors"><Move size={18} /></button>
          <div className="w-px h-6 bg-text-main/10 mx-2" />
          <button onClick={() => {setAnalysisResult(null); setActiveAlgo(null);}} className="p-3 hover:bg-red-50 rounded-xl text-text-sub hover:text-red-500 transition-colors">
            <RotateCcw size={18} />
          </button>
        </nav>
      </div>

      {/* 2. ALGORITHM & INSPECTOR PANEL (Responsive Sidebar) */}
      <AnimatePresence>
        {isExplorerMode && (
          <motion.aside 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-full lg:w-[350px] bg-white border-l border-text-main/5 p-6 md:p-8 flex flex-col gap-8 z-40 overflow-y-auto max-h-[500px] lg:max-h-none"
          >
            {/* Algorithm Selector */}
            <section>
              <div className="flex items-center gap-2 mb-6 text-brand-blue">
                <Settings2 size={16} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Algorithm Suite</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {['Shortest Path (UCS)', 'BFS Discovery', 'DFS Traversal', 'Cycle Detection'].map((algo) => (
                  <button 
                    key={algo}
                    disabled={isProcessing}
                    onClick={() => runAlgorithmInference(algo)}
                    className={`group flex items-center justify-between p-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                      activeAlgo === algo 
                      ? 'bg-brand-blue text-white border-brand-blue shadow-lg' 
                      : 'hover:border-brand-blue/30 text-text-sub border-transparent bg-slate-50'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {algo}
                    <Play size={12} className={activeAlgo === algo ? 'text-white' : 'text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity'} />
                  </button>
                ))}
              </div>
            </section>

            {/* Live Data Inspector */}
            <section className="mt-auto">
              <div className="flex items-center gap-2 text-text-main/40 mb-4">
                <Terminal size={14} />
                <span className="text-[9px] font-bold uppercase tracking-tighter font-mono">System.Inspector_Output</span>
              </div>
              <div className="bg-slate-900 rounded-2xl p-5 shadow-inner font-mono overflow-hidden relative">
                <div className="absolute top-0 right-0 p-2 opacity-10"><Info size={32} className="text-white" /></div>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[9px] text-white/40 uppercase">Target_Node</span>
                    <span className="text-[10px] text-emerald-400 font-bold">N-842</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[9px] text-white/40 uppercase">Engine_Status</span>
                    <span className={`text-[10px] font-bold ${isProcessing ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {isProcessing ? 'BUSY' : 'READY'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[9px] text-white/40 uppercase">Active_Thread</span>
                    <span className="text-[10px] text-brand-blue font-bold">{activeAlgo ? '0x01' : 'None'}</span>
                  </div>
                </div>
              </div>
            </section>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// PropTypes for Production Safety
GraphExplorer.propTypes = {
  isExplorerMode: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired
};

export default GraphExplorer;