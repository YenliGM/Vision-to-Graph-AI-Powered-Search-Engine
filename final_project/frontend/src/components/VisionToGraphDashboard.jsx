import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Share2, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';

/**
 * @description Professional Error Management Component
 * Displays contextual errors with an internationalized look.
 */
const ErrorMessage = ({ message }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 shadow-sm"
  >
    <AlertCircle className="w-5 h-5 flex-shrink-0" />
    <p className="font-body text-sm font-medium">{message}</p>
  </motion.div>
);

/**
 * @description Dynamic Graph Visualization Component
 * Uses Framer Motion for smooth state transitions between graph nodes.
 */
const GraphVisualizer = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-full gap-6">
      <div className="flex-1 min-h-[400px] rounded-3xl border border-text-main/10 bg-white shadow-2xl flex items-center justify-center p-12 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-md">
          {/* Animated Paths */}
          <motion.path
            d="M 20 50 L 50 50"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-text-main/20"
            animate={{ pathLength: stage > 0 ? 1 : 0 }}
          />
          <motion.path
            d="M 50 50 L 80 30"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-text-main/20"
            animate={{ pathLength: stage > 1 ? 1 : 0 }}
          />
          
          {/* Nodes */}
          <motion.circle 
            cx="20" cy="50" r="4" 
            className="fill-gold stroke-text-main stroke-[0.5]"
            initial={false}
            animate={{ scale: stage === 0 ? 1.2 : 1 }}
          />
          <motion.circle 
            cx="50" cy="50" r="4" 
            className={`${stage >= 1 ? 'fill-brand-blue' : 'fill-white'} stroke-text-main stroke-[0.5]`}
            animate={{ r: stage === 1 ? 6 : 4 }}
          />
          <motion.circle 
            cx="80" cy="30" r="4" 
            className={`${stage >= 2 ? 'fill-brand-success' : 'fill-white'} stroke-text-main stroke-[0.5]`}
          />

          {/* Metadata Label */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <rect x="55" y="40" width="30" height="8" rx="1" className="fill-text-main" />
                <text x="57" y="46" className="fill-white font-mono text-[3px]">Node_ID: 425437</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      <div className="p-4 bg-text-main/5 rounded-2xl border border-text-main/5 backdrop-blur-sm">
        <p className="font-body text-xs text-text-sub text-center uppercase tracking-widest font-semibold">
          AI Inference: Real-time relationship extraction active
        </p>
      </div>
    </div>
  );
};

/**
 * @main VisionToGraphDashboard
 * Core logic for file orchestration and professional UI layout.
 */
const VisionToGraphDashboard = () => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus('uploading');
    setError(null);

    // Simulated API Latency for UX demonstration
    setTimeout(() => {
      if (file.size > 5 * 1024 * 1024) {
        setStatus('error');
        setError('File exceeds 5MB limit for rapid extraction. Please optimize the image.');
      } else {
        setStatus('success');
      }
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-brand-white text-text-main selection:bg-brand-blue/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        
        {/* Navigation Header */}
        <nav className="flex items-center justify-between mb-20 p-4 border border-text-main/10 rounded-2xl bg-white/50 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-text-main rounded-lg flex items-center justify-center text-white font-header font-black text-xl">V</div>
            <span className="font-header font-black text-2xl tracking-tight">Vision <span className="text-brand-blue">to</span> Graph</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Analytics', 'API Reference', 'Graph Explorer', 'Documentation'].map((item) => (
              <a key={item} href="#" className="text-xs font-bold uppercase tracking-tighter hover:text-brand-blue transition-colors">
                {item}
              </a>
            ))}
          </div>

          <button className="hidden sm:block px-6 py-2.5 bg-brand-blue text-white font-bold rounded-xl shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-widest">
            View on GitHub
          </button>
        </nav>

        {/* Hero & Action Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left: Content & Upload */}
          <div className="lg:col-span-7 space-y-10">
            <header className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold-700 text-[10px] font-black uppercase tracking-widest border border-gold/20"
              >
                <Cpu className="w-3 h-3" /> Zero-ETL Extraction Powered by Gemini
              </motion.div>
              
              <h1 className="text-5xl lg:text-6xl font-header font-black leading-[1.1] tracking-tight text-balance">
                Vision-to-Graph:  <span className="text-brand-blue">Visual Intelligence</span> into Structured Data.
              </h1>
              
              <p className="font-body text-xl text-text-sub leading-relaxed max-w-2xl">
                Automated neural extraction of weighted directed graphs. Generate interoperable JSON-LD and RDF structures with zero manual ETL. Validated Search Optimality: BFS, DFS, and UCS Implementation.
              </p>
            </header>

            {/* Dropzone Component */}
            <div className="group relative">
              <div className={`
                relative h-72 border-2 border-dashed rounded-3xl transition-all duration-500 flex flex-col items-center justify-center gap-4 overflow-hidden
                ${status === 'uploading' ? 'border-brand-blue bg-brand-blue/5' : 'border-text-main/10 bg-white hover:border-brand-blue/40 hover:shadow-2xl hover:shadow-brand-blue/5'}
              `}>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  onChange={handleFileUpload}
                  disabled={status === 'uploading'}
                />
                
                <AnimatePresence mode="wait">
                  {status === 'uploading' ? (
                    <motion.div 
                      key="uploading"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
                      <p className="font-header font-bold text-brand-blue animate-pulse">Processing Nodes...</p>
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 bg-brand-success/10 text-brand-success rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <p className="font-header font-bold text-lg">Extraction Complete</p>
                    </motion.div>
                  ) : (
                    <motion.div key="idle" className="flex flex-col items-center gap-4 px-6 text-center">
                      <div className="w-16 h-16 bg-text-main/5 text-text-main/40 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:text-brand-blue transition-all duration-500">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-header font-bold text-lg mb-1">Upload Visualization</p>
                        <p className="font-body text-sm text-text-sub">Drag and drop high-res image or SVG</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <div className="mt-6">
                    <ErrorMessage message={error} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { icon: Layers, label: 'Semantic Mapping' },
                { icon: Share2, label: 'JSON-LD / RDF-EXT' },
                { icon: ExternalLink, label: 'Restful Architecture' }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white border border-text-main/5 rounded-xl shadow-sm">
                  <Icon className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visualization Panel */}
          <section className="lg:col-span-5 h-full min-h-[500px]">
            <GraphVisualizer />
          </section>

        </main>

        <footer className="mt-24 pt-8 border-t border-text-main/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-text-main/30">
          <p>© 2026 Vision To Graph Labs • International Edition</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Who we are</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VisionToGraphDashboard;