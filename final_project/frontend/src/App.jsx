import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    /* We use min-h-screen to ensure the purple gradient 
       covers the whole background even on big monitors */
    <div className="min-h-screen w-full">
      <Dashboard />
    </div>
  );
}

export default App;