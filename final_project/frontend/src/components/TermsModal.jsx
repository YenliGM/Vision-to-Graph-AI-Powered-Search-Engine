// src/components/TermsModal.jsx
import React, { useEffect } from 'react';

export default function TermsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 text-left relative transform transition-all border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full p-1"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
          Security & Data Disclosure
        </h2>

        {/* Modal Content */}
        <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300">
          <section>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Data Handling</h3>
            <p>Images uploaded are processed in-memory via Gemini 2.0 and are not stored on our servers.</p>
          </section>
          <section>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Usage</h3>
            <p>This is a technical demonstration for recruitment purposes. No commercial warranties are provided.</p>
          </section>
          <section>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Cookie Policy</h3>
            <p>We use zero tracking cookies. Your privacy is respected by design.</p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-lg transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}