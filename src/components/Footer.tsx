import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#050506] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Pólya Quote of the Day */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="font-display italic text-base text-white/50 font-light">
            “If you cannot solve a problem, then there is an easier problem you can solve: find it.”
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-blue-400">
            — George Pólya, How to Solve It
          </p>
        </div>

        <hr className="border-white/5" />

        <div className="mt-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Brand details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-2">
              <span className="font-serif italic text-blue-400 font-bold">Φ</span>
              <span className="font-display text-sm font-semibold tracking-tight text-white">
                Math Is <span className="font-serif italic text-blue-400 ml-0.5">God</span>
              </span>
            </div>
            <p className="mt-1.5 text-xs text-white/40 max-w-xs font-light">
              Built upon the philosophy of heuristics, first principles, and rigorous cognitive exploration.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-white/40 justify-center md:justify-start">
              <span>Curated by</span>
              <a 
                href="https://www.linkedin.com/in/manishcse456/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/20 hover:decoration-blue-400/40 underline-offset-4 font-medium"
              >
                Manish Sri Sai Surya Routhu
              </a>
            </div>
          </div>

          {/* Slogan */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right font-mono text-[11px] text-white/30 space-y-1">
            <p>© {new Date().getFullYear()} Math Is God. All truths reserved.</p>
            <p className="flex items-center gap-1">
              For explorers of deep mathematical structures
              <Heart className="h-3 w-3 text-blue-500 fill-blue-500/30" />
            </p>
            <p className="text-[9px] text-blue-400/50">Inspired by &quot;How to Solve It&quot; (1945)</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
