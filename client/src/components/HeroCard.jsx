function HeroCard({ dashboard }) {
  const progress = dashboard.progress_percent || 0;
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const remaining = (dashboard.protein_goal - dashboard.total_protein).toFixed(1);

  // Calculations for the circular progress SVG
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-[#1a103c] to-cyan-950 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
      
      {/* Ambient background glows for muted glassmorphism */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 flex items-center gap-10">
        
        {/* Left: Circular Progress Graphic */}
        <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="96" cy="96" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="12"
            />
            {/* Inner Decorative Arc (Muted Purple/Pink) */}
            <circle
              cx="96" cy="96" r={radius - 16}
              fill="none"
              stroke="#c026d3" 
              strokeWidth="4"
              strokeDasharray="100 400"
              strokeLinecap="round"
              className="opacity-40"
              style={{ transformOrigin: 'center', transform: 'rotate(60deg)' }}
            />
            {/* Active Progress Ring (Cyan) */}
            <circle
              cx="96" cy="96" r={radius}
              fill="none"
              stroke="#22d3ee" 
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="drop-shadow-[0_0_6px_rgba(34,211,238,0.4)] transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Bicep Graphic */}
          <div className="relative z-10 w-24 h-24 bg-slate-900/60 rounded-full flex items-center justify-center border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]">
            <span className="text-5xl filter drop-shadow-md">💪</span>
          </div>
        </div>

        {/* Right: Stats & Linear Bar */}
        <div className="flex-1">
          <p className="text-gray-300 text-lg font-medium tracking-wide">Today's Progress</p>
          
          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="text-6xl font-bold text-white tracking-tight">{dashboard.total_protein}g</h1>
            <p className="text-3xl text-gray-400 font-light">/ {dashboard.protein_goal}g</p>
            <p className="text-3xl text-cyan-400 font-medium drop-shadow-[0_0_4px_rgba(34,211,238,0.3)]">({progress}%)</p>
          </div>
          
          <p className="text-gray-400 text-sm mt-3 uppercase tracking-[0.15em] font-medium">
            Remaining: {remaining}g
          </p>

          {/* Glassmorphic Linear Progress Bar */}
          <div className="w-full mt-4 relative">
            {/* Track */}
            <div className="h-3.5 bg-slate-950/80 rounded-full border border-white/5 overflow-hidden shadow-inner">
              {/* Fill */}
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 rounded-full relative transition-all duration-1000 ease-out"
                style={{ width: `${safeProgress}%` }}
              >
                 {/* Glowing tip accent */}
                 <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white/40 to-transparent rounded-full"></div>
              </div>
            </div>
            {/* External soft glow underneath the bar */}
            <div
                className="absolute top-0 left-0 h-3.5 bg-cyan-400/20 blur-[6px] rounded-full pointer-events-none transition-all duration-1000 ease-out"
                style={{ width: `${safeProgress}%` }}
            />
          </div>

          <p className="text-slate-500 text-xs mt-3 uppercase tracking-widest">
            Remaining: {remaining}g
          </p>
        </div>

      </div>
    </div>
  );
}

export default HeroCard;