function App() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {/* The White Card: This will only be white if Tailwind is working perfectly */}
      <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center max-w-md border border-slate-200">
        <h1 className="text-5xl font-black text-blue-600 mb-4">
          Verified! 🚀
        </h1>
        <p className="text-slate-600 text-lg font-medium">
          If you see this <span className="text-blue-500 font-bold">white card</span>, your environment meets international standards.
        </p>
      </div>
    </div>
  )
}

export default App