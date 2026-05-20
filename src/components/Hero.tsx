import { motion } from 'motion/react';
import { ArrowRight, Brain, Terminal, Compass, SquareCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: (tabId: string) => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 math-grid border-b border-white/5 bg-[#050506] w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Math Aesthetic Accent in background */}
        <div className="absolute right-0 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-900/10 blur-3xl pointer-events-none" />
        <div className="absolute left-10 top-10 -z-10 h-64 w-64 rounded-full bg-blue-900/15 blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          
          {/* Subtle math sequence ticker */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400/80">
              Axiom: e^(iπ) + 1 = 0
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-500" />
            <span className="font-mono text-[10px] text-gray-400">
              1, 1, 2, 3, 5, 8, 13...
            </span>
          </motion.div>

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-400/80 block mb-3 font-semibold">
            George Pólya's Legacy
          </span>

          {/* Main Titles */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            id="hero-title"
            className="font-display text-5xl font-light tracking-tighter text-white sm:text-7xl md:text-8xl leading-[0.9]"
          >
            Math Is <br />
            <span className="italic font-serif text-blue-400 ml-1">
              God
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="hero-subtitle"
            className="mt-6 font-mono text-sm tracking-widest text-white/50 uppercase sm:text-base"
          >
            Learn the art of problem solving.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/50 leading-relaxed font-light"
          >
            Inspired by <b>George Pólya’s</b> philosophy, we strip mathematical and algorithmic problems 
            to their absolute first principles. Discover heuristics, build spatial intuition, and understand 
            why code behaves exactly the way it does.
          </motion.p>

          {/* Core Action CTAs with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => onExploreClick('programming')}
              className="group flex items-center space-x-2 rounded-lg bg-white hover:bg-blue-50 px-8 py-3 text-xs font-semibold tracking-wider uppercase text-black transition-all font-mono active:scale-98 shadow-sm"
              id="hero-explore-btn"
            >
              <span>Explore Problems</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onExploreClick('courses')}
              className="flex items-center space-x-2 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-8 py-3 text-xs font-semibold tracking-wider uppercase text-white transition-all font-mono"
              id="hero-courses-btn"
            >
              <span>Start Free Courses</span>
            </button>
          </motion.div>

        </div>

        {/* Decorative Grid SVG - Elegant vector mathematical spirals & formulas */}
        <div className="mt-16 relative flex justify-center max-w-3xl mx-auto h-48 md:h-60 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-1 md:p-2 backdrop-blur-md">
          <div className="absolute inset-0 math-grid opacity-40" />
          
          <svg className="w-full h-full text-blue-400/10 stroke-current select-none" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Elegant Sine / Cosine overlapping waves */}
            <path d="M 0 120 Q 200 40, 400 120 T 800 120" strokeWidth="1.5" strokeDasharray="5, 5" />
            <path d="M 0 120 Q 200 200, 400 120 T 800 120" strokeWidth="1" strokeOpacity="0.5" />
            
            {/* Concentric coordinate curves */}
            <circle cx="400" cy="120" r="100" strokeWidth="0.5" strokeOpacity="0.3" id="coord-circle" />
            <circle cx="400" cy="120" r="60" strokeWidth="0.5" strokeOpacity="0.2" />
            
            {/* Coordinate Axis */}
            <line x1="100" y1="120" x2="700" y2="120" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="400" y1="10" x2="400" y2="230" strokeWidth="0.5" strokeOpacity="0.4" />
            
            {/* Mathematical formulas as vectors */}
            <text x="510" y="80" fill="currentColor" fillOpacity="0.2" className="font-mono text-[10px]">Δy / Δx = f&#39;(x)</text>
            <text x="260" y="160" fill="currentColor" fillOpacity="0.2" className="font-mono text-[10px]">∑ i = n(n+1)/2</text>
            <text x="415" y="40" fill="currentColor" fillOpacity="0.3" className="font-mono text-[9px]">π ≈ 3.14159</text>
            <text x="350" y="210" fill="currentColor" fillOpacity="0.3" className="font-mono text-[10px] font-bold">G(x) | S(x)</text>

            {/* Vector Golden Spiral */}
            <path d="M 400 120 A 5 5 0 0 1 405 120 A 10 10 0 0 1 395 120 A 20 20 0 0 1 415 120 A 40 40 0 0 1 375 120 A 80 80 0 0 1 455 120" strokeWidth="1.2" strokeOpacity="0.45" />
          </svg>

          {/* Interactive Core Quick-Stats bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-6 px-6 py-2 rounded-full border border-white/5 bg-[#050506]/95 text-[10px] font-mono tracking-widest text-white/40 capitalize whitespace-nowrap">
            <div className="flex items-center gap-1.5"><Brain className="h-3 w-3 text-blue-400" /> Cognitive Heuristics</div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5"><Terminal className="h-3 w-3 text-indigo-400" /> Optimal Complexity</div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5"><SquareCheck className="h-3 w-3 text-cyan-400" /> Verification Invariants</div>
          </div>
        </div>

      </div>
    </section>
  );
}
