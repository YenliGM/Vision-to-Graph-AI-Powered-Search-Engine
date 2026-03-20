import React from 'react';
import { useFileUpload } from '../hooks/useFileUpload';

const Dashboard = () => {
  const { file, status, error, uploadFile } = useFileUpload();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) uploadFile(selected);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-6xl font-black mb-4 tracking-tight text-[--color-brand-white]">
          Vision <span className="text-[--color-brand-blue]">to</span> Graph
        </h1>
        <p className="text-[--color-brand-blue] text-xl font-light tracking-widest uppercase">
          AI-Powered Search Engine
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Upload Zone */}
        <section className="bg-[--color-brand-white]/5 backdrop-blur-lg border border-[--color-brand-white]/10 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl mb-6 text-[--color-brand-gold]">Data Extraction</h2>
          
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all
              ${status === 'uploading' ? 'border-[--color-brand-gold] bg-[--color-brand-gold]/5' : 'border-[--color-brand-white]/20 hover:border-[--color-brand-blue]/50'}
            `}
          >
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={status === 'uploading'}
            />
            
            <div className="space-y-4">
              <div className="text-4xl">
                {status === 'success' ? '✅' : '📁'}
              </div>
              <p className="text-lg">
                {status === 'uploading' ? 'Processing with Gemini AI...' : 'Drop your graph image here'}
              </p>
              <span className="text-sm text-[--color-brand-white]/40 font-mono">
                PNG, JPG or SVG up to 10MB
              </span>
            </div>
          </div>

          {/* Error Management System */}
          {status === 'error' && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              {error}
            </div>
          )}
        </section>

        {/* Results / Status Section */}
        <section className="space-y-6">
          <div className="bg-[--color-brand-brown]/30 p-8 rounded-3xl border border-[--color-brand-white]/5 min-h-[300px]">
            <h2 className="text-2xl mb-4 text-[--color-brand-white]">System Status</h2>
            
            {status === 'idle' && (
              <p className="text-[--color-brand-white]/40 italic">Waiting for input data...</p>
            )}

            {status === 'uploading' && (
              <div className="flex flex-col gap-4">
                <div className="h-2 w-full bg-[--color-brand-white]/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[--color-brand-blue] animate-[loading_2s_ease-in-out_infinite] w-1/2"></div>
                </div>
                <p className="text-sm text-[--color-brand-blue] animate-pulse">Initializing Graph Algorithm...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 text-[--color-brand-success]">
                  <span className="h-3 w-3 rounded-full bg-[--color-brand-success] animate-ping"></span>
                  <p className="font-semibold text-lg">Graph Extracted Successfully</p>
                </div>
                <div className="p-4 bg-black/20 rounded-lg font-mono text-xs text-[--color-brand-blue]">
                  {`{ "nodes": 12, "edges": 15, "algorithm": "BFS" }`}
                </div>
                <button className="w-full py-4 bg-[--color-brand-gold] text-[--color-brand-brown] font-bold rounded-xl hover:brightness-110 transition-all uppercase tracking-widest text-sm">
                  Initialize Visual Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;