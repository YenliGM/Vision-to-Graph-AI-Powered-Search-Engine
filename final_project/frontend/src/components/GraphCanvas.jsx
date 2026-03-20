import React, { useState, useEffect, useMemo } from 'react';
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle } from 'lucide-react';
import '@xyflow/react/dist/style.css';



const GraphCanvas = ({ graphData }) => {
  // Use standard React state instead of useNodesState to avoid context issues
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  
  // Internal change handlers for React Flow
  const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));

  // 1. Data Transformation Logic
  useEffect(() => {
    // Determine the actual graph object (handle wrappers)
    const actualData = graphData?.graph ? graphData.graph : graphData;

    // Safety Check: If it's not a valid object, don't try to render
    if (!actualData || typeof actualData !== 'object' || Array.isArray(actualData)) {
      console.warn("[VISUALIZER] Waiting for valid object data...");
      return;
    }

    const newNodes = [];
    const newEdges = [];
    const nodeSet = new Set();
    const SPACING = 220;
    let i = 0;

    try {
      Object.entries(actualData).forEach(([source, neighbors]) => {
        // Add Source
        if (!nodeSet.has(source)) {
          nodeSet.add(source);
          newNodes.push({
            id: source,
            data: { label: source },
            position: { x: (i % 3) * SPACING, y: Math.floor(i / 3) * SPACING },
            style: { background: '#fff', color: '#1e293b', border: '2px solid #3b82f6', borderRadius: '12px', fontWeight: 'bold', padding: '10px' }
          });
          i++;
        }

        // Add Neighbors
        if (Array.isArray(neighbors)) {
          neighbors.forEach((neighbor) => {
            const [target, weight] = Array.isArray(neighbor) ? neighbor : [neighbor, ""];
            
            if (!nodeSet.has(target)) {
              nodeSet.add(target);
              newNodes.push({
                id: target,
                data: { label: target },
                position: { x: (i % 3) * SPACING, y: Math.floor(i / 3) * SPACING },
                style: { background: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '10px' }
              });
              i++;
            }

            // Create Edge (Using String for markerEnd to avoid ReferenceErrors)
            newEdges.push({
              id: `e${source}-${target}`,
              source,
              target,
              label: weight?.toString(),
              animated: true,
              style: { stroke: '#3b82f6' },
              markerEnd: { type: 'arrowclosed', color: '#3b82f6' }
            });
          });
        }
      });

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (err) {
      console.error("[VISUALIZER] Layout Error:", err);
    }
  }, [graphData]);

  // 2. Error Boundary: If nodes failed to load, show a clean message
  if (!nodes || nodes.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900/50 rounded-[2.5rem] border border-white/10">
        <div className="p-4 bg-slate-800 rounded-2xl mb-4">
          <AlertTriangle className="text-yellow-500 w-8 h-8" />
        </div>
        <h3 className="text-white font-exo font-bold text-lg">Processing AI Data...</h3>
        <p className="text-slate-400 text-sm px-8 text-center mt-2">
          If this persists, the AI response might be empty or in the wrong format.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative h-full w-full bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        colorMode="dark"
      >
        <Background color="#334155" gap={20} />
        <Controls />
      </ReactFlow>

      {/* HUD Overlay */}
      <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-3 bg-slate-950/80 border border-white/10 rounded-2xl shadow-2xl">
        <Zap className="text-blue-400 w-4 h-4 animate-pulse" />
        <span className="text-xs font-bold text-white uppercase tracking-widest font-exo">Live Graph Extraction</span>
      </div>
    </motion.div>
  );
};

export default GraphCanvas;