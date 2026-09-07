import React from 'react'

const AiRecomendation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333333] px-8 py-10 mt-4 flex flex-col items-center gap-4 min-h-[550px]">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg">
        AI Movie Recommendations
      </h2>
      <div className="w-full flex items-center justify-between mb-8">
        <div className="h-2 flex-1 bg-[#232323] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e50914] transition-all duration-300 ease-in-out"
            style={{ width: "40%" }}
          ></div>
        </div>
        <span className="text-white font-bold ml-4 text-sm">2/5</span>
      </div>
      <div className="flex flex-col items-center flex-1 gap-4 w-full">
        <div className="flex-1 mb-6 w-full">
          <h3 className="text-lg font-bold text-white mb-4 text-center">
            What is your preferred genre?
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="w-full py-3 rounded-xl border-2 transtion font-semibold text-base text-white flex items-center justify-center gap-2 bg-[#e50914] border-[#e50914] hover:bg-transparent hover:text-[#e50914] shasdow-lg transition-all duration-300">
              Option 1
            </button>
            <button className="w-full py-3 rounded-xl border-2 transtion font-semibold text-base text-white flex items-center justify-center gap-2 bg-[#232323] border-[#333333] hover:bg-transparent hover:text-[#e50914] shasdow-lg transition-all duration-300">
              Option 2
            </button>
            <button className="w-full py-3 rounded-xl border-2 transtion font-semibold text-base text-white flex items-center justify-center gap-2 bg-[#e50914] border-[#e50914] hover:bg-transparent hover:text-[#e50914] shasdow-lg transition-all duration-300">
              Option 3
            </button>
            <button className="w-full py-3 rounded-xl border-2 transtion font-semibold text-base text-white flex items-center justify-center gap-2 bg-[#232323] border-[#333333] hover:bg-transparent hover:text-[#e50914] shasdow-lg transition-all duration-300">
              Option 4
            </button>
          </div>
          <div>
            <button>Back</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiRecomendation
