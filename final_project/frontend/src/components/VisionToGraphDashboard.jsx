import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Share2, 
  Cpu, 
  ExternalLink,
  Menu, // Added for mobile
  X     // Added for mobile
} from 'lucide-react';

import GraphVisualizer from './GraphVisualizer';
import TermsModal from './TermsModal';
import AnalyticsDrawer from './AnalyticsDrawer';
import ApiReferenceModal from './ApiReferenceModal';
import GraphExplorer from './GraphExplorer';
import Documentation from './Documentation';
import GraphCanvas from './GraphCanvas';
import AIPanelVisualizer from './AIPanelVisualizer';
import { EXTERNAL_LINKS } from '../config/constants';
import { useGraphUpload } from '../hooks/useGraphUpload';


/**
 * @description Professional Error Management Component
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
 * @description Sleek Loading State for AI Extraction
 */
const ProcessingState = ({ onCancel }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-full w-full flex flex-col items-center justify-center bg-slate-900/50 rounded-[2.5rem] border border-white/10 backdrop-blur-md"
  >
    <div className="relative mb-8">
      <div className="w-20 h-20 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
      <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-blue w-8 h-8" />
    </div>
    <h3 className="text-white font-header font-bold text-xl uppercase tracking-widest">Analyzing Neural Patterns</h3>
    <p className="text-slate-400 text-sm mt-2 font-body">Gemini is extracting graph structures...</p>
    
    <button 
      onClick={onCancel}
      className="mt-8 px-6 py-2 rounded-full border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
    >
      Cancel Request
    </button>
  </motion.div>
);

/**
 * @main VisionToGraphDashboard
 * Responsive version with Mobile Hamburger Menu and Centered Navigation.
 */
const VisionToGraphDashboard = () => {
  // --- UI STATE (Manages what the user sees) ---
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isTermsOpen, setIsTermsOpen] = useState(false); // Terms modal state
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false); // Analytics drawer state
  const [isApiOpen, setIsApiOpen] = useState(false); // API Reference modal state
  const [isExplorerMode, setIsExplorerMode] = useState(false); // Graph Explorer mode state
  const [isDocsOpen, setIsDocsOpen] = useState(false); // Documentation modal state
  const [localPreview, setLocalPreview] = useState(null);   
  
  // --- LOGIC HOOK (Manages the "Heavy Lifting" and Connection) ---
  // We extract status and error directly from our custom delivery specialist
  const { status, error, graphData, handleFileUpload,resetUpload } = useGraphUpload();
  useEffect(() => {
  if (status === 'idle') setLocalPreview(null);
    }, [status]);
  

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-blue/10">
      {/* FIXED RESPONSIVE NAVIGATION BAR
          Maintains sticky position and glassmorphism on all devices.
      */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-text-main/5 py-4 md:py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="font-header text-lg md:text-xl font-bold tracking-tight text-text-main uppercase">
              VisionToGraph <span className="text-brand-blue">Labs</span>
            </span>
          </div>

          {/* Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex gap-10 font-sans">
             {['Analytics', 'Api Reference', 'Graph Explorer', 'Documentation'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Analytics') setIsAnalyticsOpen(true); // Hook up the Analytics Drawer
                  if (item === 'Api Reference') setIsApiOpen(true); // Hook up the API Reference
                  if (item === 'Graph Explorer') setIsExplorerMode(!isExplorerMode); // Toggle Focused Explorer Mode
                  if (item === 'Documentation') setIsDocsOpen(true); // Hook up the Documentation Modal
                  // Add logic for other buttons here in future commits
              }}
                className="text-xs font-bold uppercase tracking-[0.2em] text-text-sub hover:text-brand-blue transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Section: Button + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a href={EXTERNAL_LINKS.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                <button className="hidden sm:block bg-text-main text-white px-6 md:px-8 py-3 rounded-xl text-[10px] md:text-xs font-bold font-sans uppercase tracking-widest hover:bg-brand-blue transition-all shadow-xl shadow-text-main/10 active:scale-95">
                  GitHub Repo
                </button>
              </a>
            
            {/* Hamburger Button (Visible only on mobile) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-main hover:bg-text-main/5 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Animated) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white/95 border-t border-text-main/5"
            >
              <div className="flex flex-col items-center gap-8 py-12 px-4 font-sans">
                {['Analytics', 'Api Reference', 'Graph Explorer', 'Documentation'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                    setIsMenuOpen(false); // Close mobile menu first
                    if (item === 'Analytics') {
                    // Small delay ensures the menu starts closing before the drawer slides in
                      setTimeout(() => setIsAnalyticsOpen(true), 150);
                    }
                    if (item === 'Api Reference') setIsApiOpen(true); // Hook up the API Reference
                    if (item === 'Graph Explorer') setIsExplorerMode(!isExplorerMode); // Toggle Focused Explorer Mode
                    if (item === 'Documentation') setIsDocsOpen(true); // Hook up the Documentation Modal
                    // Add logic for other buttons here in future commits
                  }}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-text-sub hover:text-brand-blue transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  {item}
                </button>
               ))}

                <a href={EXTERNAL_LINKS.GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="w-full sm:hidden">
                  <button className="sm:hidden w-full bg-text-main text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 font-sans">
                    GitHub Repo
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area: Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-12 md:pt-24 items-center">
          
          {/* Left Column: UI Controls (Hidden in Explorer Mode) */}
          <AnimatePresence mode="wait">
            {!isExplorerMode && (
              <motion.section 
                key="ui-controls"
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, width: 0, transition: { duration: 0.4 } }}
                className="lg:col-span-7 space-y-8 md:space-y-12 order-2 lg:order-1"
              >
                <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/5 border border-brand-blue/10">
                    <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                    <span className="text-[10px] font-bold font-sans uppercase tracking-[0.2em] text-brand-drops">ZERO ETL EXTRACTION POWERED BY GEMINI 2.0</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-header font-bold text-text-main leading-[1.1] tracking-tighter">
                    Transform  <br className="hidden md:block" /> 
                    <span className="text-brand-blue italic">Visual Intelligence</span> into Structured Data.
                  </h1>
                  <p className="text-base md:text-xl text-text-sub font-body max-w-2xl mx-auto lg:mx-0">
                    Automated neural extraction of weighted directed graphs. Generate interoperable JSON-LD and RDF structures with zero manual ETL
                  </p>
                </div>

                {/* ========================================================================= 
                  INTEGRATED AI PANEL VISUALIZER 
                  - Replaces manual logic with the specialized AIPanelVisualizer component.
                  - Manages its own internal transition between Upload and Analysis views.
                  ========================================================================= */}
                <div className="relative group max-w-xl lg:max-w-4xl mx-auto lg:mx-0 transition-all duration-700">
                  <AIPanelVisualizer 
                    status={status} 
                    handleFileUpload={handleFileUpload} 
                    graphData={graphData} 
                  />

                  {/* Standardized Error Message Container */}
                    <div className="mt-6 h-12">
                      <AnimatePresence>
                      {status === 'error' && <ErrorMessage message={error} />}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 pt-4">
                  {[
                    { icon: Layers, label: 'Semantic Mapping' },
                    { icon: Share2, label: 'JSON-LD / RDF-EXT' },
                    { icon: ExternalLink, label: 'Restful Architecture' }
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white border border-text-main/5 rounded-xl shadow-sm">
                      <Icon className="w-4 h-4 text-brand-blue" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* RIGHT COLUMN: DYNAMIC VISUALIZATION & EXPLORER PANEL */}
        <motion.section 
          layout // Critical for smooth resizing between span-5 and span-12
          transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          className={`relative h-full min-h-[400px] md:min-h-[500px] order-1 lg:order-2 overflow-hidden ${
            isExplorerMode ? 'lg:col-span-12' : 'lg:col-span-5'
          }`}
        >
          <AnimatePresence mode="wait">
            {/* PRIORITY 1: EXPLORER MODE (FULL SCREEN FOCUS) */}
            {isExplorerMode ? (
              <motion.div
                key="explorer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full w-full"
              >
              <GraphExplorer 
                isExplorerMode={isExplorerMode} 
                onExit={() => setIsExplorerMode(false)} 
              />
            </motion.div>
          ) : (
            /* PRIORITY 2: AI EXTRACTION PIPELINE */
            <motion.div
              key="viz-stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              {status === 'uploading' || status === 'processing' ? (
                <ProcessingState 
                  key="processing" 
                  onCancel={resetUpload} 
                />
              ) : graphData ? (
                /* PHASE A: THE AI-GENERATED CANVAS */
                <GraphCanvas key="canvas" graphData={graphData} />
              ) : (
                /* DEFAULT: AMBIENT GRAPH ANIMATION */
                <GraphVisualizer key="ambient" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ERROR OVERLAY: Professional feedback toast */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-6 left-6 right-6 z-50"
            >
              <ErrorMessage message={error} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

        </main>
      

        <footer className="mt-32 pt-12 pb-12 border-t border-text-main/10 flex flex-col md:flex-row gap-6 justify-between items-center text-xs font-bold font-sans uppercase tracking-[0.2em] text-text-main/60 bg-slate-50/50 px-8 rounded-xl">
          <p>© 2026 Vision To Graph Labs • International Edition</p>
          <div className="flex gap-8">
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-brand-blue transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit"
            >
              TERMS & PRIVACY
            </button>
            
            <a 
              href={EXTERNAL_LINKS.PERSONAL_PORTFOLIO} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-blue transition-colors"
              >
              Who we are
            </a>
          </div>
          <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
          <AnalyticsDrawer isOpen={isAnalyticsOpen} onClose={() => setIsAnalyticsOpen(false)} />
          <ApiReferenceModal isOpen={isApiOpen} onClose={() => setIsApiOpen(false)} />
          <Documentation isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
          
        </footer>
      </div>
    </div>
  );
};

export default VisionToGraphDashboard;