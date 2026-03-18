import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @description Generative Graph Visualizer
 * Simulates real-time AI inference by dynamically rendering a web of nodes.
 * Optimized for Vite 6 and Tailwind 4.
 */
const GraphVisualizer = () => {
  // Generates a random set of nodes within the SVG coordinate space (0-100)
  const [nodes, setNodes] = useState([
    { id: 1, x: 30, y: 40, color: 'var(--color-brand-blue)' },
    { id: 2, x: 70, y: 60, color: 'var(--color-gold)' },
    { id: 3, x: 50, y: 20, color: 'var(--color-brand-success)' },
  ]);

  useEffect(() => {
    // Professional "Heartbeat" interval to update the graph every 3 seconds
    const interval = setInterval(() => {
      setNodes((prevNodes) => {
        // Keep between 3 and 6 nodes for a clean visual balance
        const shouldAdd = prevNodes.length < 6;
        if (shouldAdd) {
          return [
            ...prevNodes,
            {
              id: Date.now(),
              x: Math.random() * 80 + 10, // Keep nodes away from edges
              y: Math.random() * 80 + 10,
              color: Math.random() > 0.5 ? 'var(--color-brand-blue)' : 'var(--color-gold)',
            },
          ];
        }
        // Remove the oldest node to simulate data flow
        return prevNodes.slice(1);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col h-full gap-6">
      {/* Main Visualization Container */}
      <div className="flex-1 min-h-[400px] rounded-3xl border border-text-main/10 bg-white shadow-2xl flex items-center justify-center p-12 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-md">
          <AnimatePresence>
            {/* Generative Connections: Lines between consecutive nodes */}
            {nodes.map((node, i) => {
              if (i === 0) return null;
              const prev = nodes[i - 1];
              return (
                <motion.line
                  key={`line-${node.id}`}
                  x1={prev.x} y1={prev.y}
                  x2={node.x} y2={node.y}
                  stroke="var(--color-text-main)"
                  strokeWidth="0.3"
                  strokeOpacity="0.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                />
              );
            })}

            {/* Generative Nodes */}
            {nodes.map((node) => (
              <motion.circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r="3"
                fill={node.color}
                stroke="var(--color-text-main)"
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, duration: 0.8}}
              />
            ))}
          </AnimatePresence>
        </svg>
      </div>

      {/* Professional Status Indicator */}
      <div className="p-4 bg-text-main/5 rounded-2xl border border-text-main/5 backdrop-blur-sm">
        <p className="font-header text-[10px] text-text-sub text-center uppercase tracking-[0.2em] font-bold">
          AI INFERENCE ACTIVE 
        </p>
      </div>
    </div>
  );
};

export default GraphVisualizer;