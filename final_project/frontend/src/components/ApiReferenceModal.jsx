import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Terminal, Globe, Copy } from 'lucide-react';

/**
 * ApiReferenceModal - A technical deep-dive into the Vision-to-Graph API.
 * Designed for recruiters and technical leads to evaluate system architecture.
 */
const ApiReferenceModal = ({ isOpen, onClose }) => {
  const sampleRequest = `curl -X POST https://api.visiontograph.labs/v1/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@graph_diagram.png" \\
  -F "schema=json-ld"`;

  const sampleResponse = {
    "@context": "https://schema.org/",
    "@type": "Graph",
    "name": "Neural Extraction Result",
    "nodes": [
      { "@id": "n1", "label": "Origin", "type": "start_node" },
      { "@id": "n2", "label": "Process_A", "type": "intermediary" }
    ],
    "edges": [
      { "source": "n1", "target": "n2", "weight": 1.5, "directed": true }
    ],
    "metadata": { "inference_engine": "gemini-2.0-flash", "confidence": 0.98 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue/10 rounded-2xl">
                  <Code2 className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">API Reference</h2>
                  <p className="text-sm text-slate-500 font-medium">RESTful Neural Extraction Endpoint v1.0</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
              
              {/* Endpoint Detail */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-md uppercase tracking-widest">POST</span>
                  <code className="text-sm font-mono font-bold text-slate-700">/v1/graph/extract</code>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Consumes a visual graph representation (Image/SVG) and returns a structured adjacency list mapped to 
                  <span className="font-semibold text-brand-blue"> JSON-LD</span> or <span className="font-semibold text-brand-blue">RDF</span> schemas.
                </p>
              </section>

              {/* Code Blocks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Request Example */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Terminal size={12} /> Request Sample
                    </span>
                    <button className="text-slate-400 hover:text-brand-blue transition-colors"><Copy size={14}/></button>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-5 overflow-x-auto border border-slate-800 shadow-inner">
                    <pre className="text-blue-300 font-mono text-xs leading-relaxed">
                      {sampleRequest}
                    </pre>
                  </div>
                </div>

                {/* Response Example */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Globe size={12} /> JSON-LD Response
                    </span>
                    <button className="text-slate-400 hover:text-brand-blue transition-colors"><Copy size={14}/></button>
                  </div>
                  <div className="bg-slate-950 rounded-2xl p-5 overflow-x-auto border border-slate-900 shadow-inner max-h-[300px]">
                    <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                      {JSON.stringify(sampleResponse, null, 2)}
                    </pre>
                  </div>
                </div>

              </div>

              {/* Technical Footnote */}
              <div className="p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-xl">
                <p className="text-xs text-brand-blue/80 font-medium leading-relaxed italic">
                  * All extractions are validated against deterministic graph theory constraints (BFS/DFS connectivity) 
                  during the neural inference post-processing stage.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApiReferenceModal;