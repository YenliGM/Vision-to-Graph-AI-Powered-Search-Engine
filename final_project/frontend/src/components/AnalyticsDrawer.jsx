import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Cpu, Share2, Zap } from 'lucide-react'; // Assuming lucide-react for icons

/**
 * AnalyticsDrawer - A professional slide-over for system performance metrics.
 * @param {boolean} isOpen - Controls visibility.
 * @param {function} onClose - Closes the drawer.
 * @param {object} data - Real-time metrics from the extraction engine.
 */
const AnalyticsDrawer = ({ isOpen, onClose, data }) => {
  // Default fallback data for demonstration
  const stats = data || {
    latency: 452,
    nodes: 12,
    edges: 18,
    confidence: 0.98,
    algorithms: [
      { name: 'BFS', complexity: 'O(V + E)', time: '1.2ms', status: 'Optimal' },
      { name: 'DFS', complexity: 'O(V + E)', time: '0.8ms', status: 'Complete' },
      { name: 'UCS', complexity: 'O(b^(1 + C*/ε))', time: '2.4ms', status: 'Optimal' },
      { name: 'IDS', complexity: 'O(b^d)', time: '3.1ms', status: 'Memory Efficient' },
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/70 backdrop-blur-xl border-l border-white/30 shadow-2xl z-50 p-6 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Analytics</h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Engine Performance Metrics</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/50 border border-white/50 rounded-2xl shadow-sm">
                <Cpu size={16} className="text-blue-600 mb-2" />
                <p className="text-sm text-slate-500">Latency</p>
                <p className="text-xl font-mono font-bold text-slate-800">{stats.latency}ms</p>
              </div>
              <div className="p-4 bg-white/50 border border-white/50 rounded-2xl shadow-sm">
                <Share2 size={16} className="text-blue-600 mb-2" />
                <p className="text-sm text-slate-500">Graph Density</p>
                <p className="text-xl font-mono font-bold text-slate-800">{stats.nodes}V / {stats.edges}E</p>
              </div>
            </div>

            {/* Confidence Score Section (Animated) */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700">Extraction Confidence</span>
                <span className="text-sm font-mono text-blue-600">{(stats.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.confidence * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                />
              </div>
            </div>

            {/* Algorithm Comparison Table */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Zap size={14} /> Heuristic Benchmarks
              </h3>
              <div className="border border-white/50 rounded-xl overflow-hidden bg-white/30 backdrop-blur-md">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="p-3 text-slate-600">ALGO</th>
                      <th className="p-3 text-slate-600">COMPLEXITY</th>
                      <th className="p-3 text-slate-600">TIME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">
                    {stats.algorithms.map((algo) => (
                      <tr key={algo.name} className="hover:bg-white/40 transition-colors">
                        <td className="p-3 font-bold text-slate-800">{algo.name}</td>
                        <td className="p-3 font-mono text-slate-500">{algo.complexity}</td>
                        <td className="p-3 text-blue-600 font-semibold">{algo.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="mt-12 text-center">
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Validated via Gemini-2.0-Flash Inference</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsDrawer;