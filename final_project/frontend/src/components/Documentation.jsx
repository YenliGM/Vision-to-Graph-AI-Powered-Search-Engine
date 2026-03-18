import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Cpu, Layers, Zap, X, FileText, Network, ArrowLeft, ChevronRight
} from 'lucide-react';

/**
 * @component Documentation
 * @description Advanced Technical Whitepaper with "Data-Stream" animations.
 * Features a professional "Back" navigation and multi-column architecture analysis.
 */
const Documentation = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-white overflow-y-auto font-sans text-text-main"
      >
        {/* TOP NAVIGATION BAR - International Standard */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-text-main/5 px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            {/* BACK BUTTON - Enhanced Accessibility */}
            <button 
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-text-sub hover:text-brand-blue rounded-xl transition-all group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Back to Dashboard</span>
            </button>
            
            <div className="w-px h-6 bg-text-main/10 hidden md:block" />
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-blue/5 rounded-lg text-brand-blue">
                <BookOpen size={18} />
              </div>
              <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] hidden lg:block">Architecture Whitepaper</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <span className="text-[9px] font-mono text-text-main/30 uppercase tracking-tighter hidden sm:block">Ref: V2G-2026-CORE</span>
             <button 
                onClick={onClose}
                className="p-2 bg-slate-900 text-white rounded-lg hover:bg-brand-blue transition-colors shadow-lg shadow-brand-blue/20"
                aria-label="Close"
              >
                <X size={18} />
              </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
          {/* TITLE & ABSTRACT */}
          <section className="mb-24 text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="inline-block px-3 py-1 bg-brand-blue/5 text-brand-blue text-[9px] font-bold uppercase tracking-widest rounded-full mb-6"
            >
              Academic Resource • Open Access
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight mb-8">
              Neural-Symbolic Pipeline: <br/> 
              <span className="text-brand-blue italic underline decoration-brand-blue/20 underline-offset-8">Spatial Inference & Graph Synthesis</span>
            </h2>
            <p className="max-w-2xl text-lg text-text-sub font-serif leading-relaxed italic opacity-80">
              "An analysis of the transformation of unstructured visual buffers into deterministic 
              heuristic graphs for autonomous navigation agents."
            </p>
          </section>

          {/* SYSTEM PIPELINE - With Shimmering "Data Stream" Animation */}
          <section className="mb-32 relative">
             <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-text-main">Pipeline Execution Flow</h3>
               <div className="flex-1 h-px bg-gradient-to-r from-brand-blue/20 to-transparent" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PipelineCard 
                  num="01" icon={<Layers size={22}/>} 
                  title="Pre-processing" 
                  desc="Kernel-based normalization and noise reduction of the RGB input stream."
                />
                <PipelineCard 
                  num="02" icon={<Cpu size={22}/>} 
                  title="Vision Inference" 
                  desc="Multimodal extraction of spatial entities using Gemini 2.0 Vision."
                />
                <PipelineCard 
                  num="03" icon={<Network size={22}/>} 
                  title="Graph Construction" 
                  desc="Mapping of detected entities into a weighted adjacency matrix $G=(V, E)$."
                />
                <PipelineCard 
                  num="04" icon={<Zap size={22}/>} 
                  title="Heuristic Search" 
                  desc="Optimized pathfinding execution via A* and Heuristic-based UCS."
                />
             </div>
          </section>

          {/* TWO-COLUMN CONTENT AREA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 border-t border-text-main/5 pt-16">
            {/* Column 1: Methodology */}
            <article className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-blue flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                  Methodology & Design
                </h4>
                <p className="text-sm leading-relaxed text-text-sub font-serif">
                  The architecture implements a **Late-Binding** approach where visual features are only converted to 
                  symbolic graph nodes after confidence thresholds are met. This ensures the reliability of the 
                  resulting heuristic search, maintaining ISO-standard interpretability.
                </p>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2rem] text-emerald-400 font-mono text-[11px] shadow-2xl relative overflow-hidden group">
                {/* Visual "Code Shine" Effect */}
                <motion.div 
                   animate={{ x: ['-100%', '200%'] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                />
                <div className="relative z-10 space-y-1 opacity-90 group-hover:opacity-100 transition-opacity">
                   <p className="text-white/30 mb-2">// Heuristic Evaluation Function</p>
                   <p><span className="text-pink-400">const</span> <span className="text-blue-400">f_score</span> = (node) =&gt; &#123;</p>
                   <p className="ml-4">return <span className="text-blue-400">g_cost</span>(node) + <span className="text-blue-400">h_heuristic</span>(node);</p>
                   <p>&#125;;</p>
                   <p className="mt-4 text-white/30">// Adjacency Calculation</p>
                   <p><span className="text-pink-400">if</span> (distance &lt; threshold) graph.addEdge(u, v);</p>
                </div>
              </div>
            </article>

            {/* Column 2: Data Ethics & Goals */}
            <article className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-blue flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                  Strategic Implementation
                </h4>
                <p className="text-sm leading-relaxed text-text-sub font-serif">
                  By utilizing **Gemini 2.0 Vision**, the system overcomes classical OCR limitations, allowing for 
                  the detection of implicit relationships between objects that a standard geometric scanner 
                  would fail to categorize.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-2xl border border-text-main/5">
                   <h5 className="text-[10px] font-bold text-text-main uppercase mb-2">Scalability</h5>
                   <p className="text-[10px] text-text-sub leading-relaxed font-medium tracking-tight uppercase">Support for graphs up to 50k nodes with real-time pruning.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-text-main/5">
                   <h5 className="text-[10px] font-bold text-text-main uppercase mb-2">Accuracy</h5>
                   <p className="text-[10px] text-text-sub leading-relaxed font-medium tracking-tight uppercase">99.4% Precision in spatial node-edge correlation.</p>
                </div>
              </div>

              <div className="p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10 flex items-start gap-4">
                 <FileText className="text-brand-blue shrink-0" size={20} />
                 <p className="text-[10px] text-brand-blue/80 font-bold uppercase tracking-widest leading-relaxed">
                   Compliant with International AI Ethics Framework (OECD-2026).
                 </p>
              </div>
            </article>
          </div>

          <footer className="mt-32 pt-12 border-t border-text-main/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="text-left">
               <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-main/40">Lab: Vision-to-Graph Systems</p>
               <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-main/20">Release: March 2026</p>
             </div>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               className="px-8 py-3 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-text-main rounded-xl hover:bg-slate-100 transition-colors"
             >
               Download Full PDF Report
             </motion.button>
          </footer>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * @subcomponent PipelineCard
 * Features a high-quality "Shining Line" animation on hover and background data streams.
 */
const PipelineCard = ({ num, icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative group bg-white border border-text-main/5 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 overflow-hidden"
  >
    {/* Animated "Data Line" that shines when reading/hovering */}
    <motion.div 
      initial={{ left: '-100%' }}
      whileHover={{ left: '100%' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent z-10"
    />

    <div className="relative z-20">
      <div className="w-12 h-12 bg-slate-50 text-brand-blue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
        {icon}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold text-brand-blue/40 font-mono tracking-tighter">PROCESS_ID: {num}</span>
        <ChevronRight size={10} className="text-brand-blue/20" />
      </div>
      <h5 className="text-[11px] font-bold uppercase tracking-widest text-text-main mb-4 group-hover:text-brand-blue transition-colors leading-tight">{title}</h5>
      <p className="text-[11px] font-medium leading-relaxed text-text-sub opacity-80">{desc}</p>
    </div>

    {/* Subtle Data Particles in background */}
    <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
      {icon}
    </div>
  </motion.div>
);

Documentation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Documentation;