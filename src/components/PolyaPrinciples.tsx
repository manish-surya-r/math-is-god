import { motion } from 'motion/react';
import { Eye, Map, Sliders, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

export default function PolyaPrinciples() {
  const principles = [
    {
      number: '01',
      title: 'Understand the Problem',
      badgeStyle: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      arrowColor: 'text-blue-400',
      description: 'You cannot solve a problem unless you understand what is being asked. Map your criteria perfectly.',
      questions: [
        'What is the unknown term?',
        'What are the given input data?',
        'What are the explicit conditions?',
        'Can you draw a geometric figure?'
      ]
    },
    {
      number: '02',
      title: 'Devise a Plan',
      badgeStyle: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400',
      arrowColor: 'text-indigo-400',
      description: 'Discover the connection between the given data and the unknown. Find auxiliary steps.',
      questions: [
        'Have you seen this in another form?',
        'Can you solve a simpler analogy?',
        'Is there a helpful invariant?',
        'What if you work backwards?'
      ]
    },
    {
      number: '03',
      title: 'Carry Out the Plan',
      badgeStyle: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      arrowColor: 'text-purple-400',
      description: 'Implement your solution with rigorous precision. Verify each logical step as you proceed.',
      questions: [
        'Can you prove each step is correct?',
        'Is the type safety guaranteed?',
        'Can you verify the dynamic ranges?',
        'Does it work for edge cases?'
      ]
    },
    {
      number: '04',
      title: 'Look Back & Reflect',
      badgeStyle: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
      arrowColor: 'text-cyan-400',
      description: 'Examine the solution. Reevaluate the steps and integrate the lesson into your memory.',
      questions: [
        'Can you derive it differently?',
        'Can you see it at a single glance?',
        'Can you reuse the exact method?',
        'How does it optimize further?'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#050506] relative border-b border-white/5 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400/80 mb-2 block">Mental Workflows</span>
          <h2 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
            P&oacute;lya&apos;s Four Principles
          </h2>
          <p className="mt-4 text-sm text-white/50 font-light leading-relaxed">
            Presented in 1945 by George P&oacute;lya, these four core stages form the baseline framework 
            for decomposing any advanced mathematical formula or programming algorithm.
          </p>
        </div>

        {/* Principles Container Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, index) => {
            return (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col gap-3 group hover:border-white/20 transition-all duration-300"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold italic text-sm ${p.badgeStyle}`}>
                    {p.number}
                  </div>
                  <span className="font-mono text-[9px] font-bold text-white/30 tracking-widest uppercase">
                    Stage
                  </span>
                </div>

                {/* Body Content */}
                <h3 className="text-lg font-medium text-white tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-white/40 leading-snug font-light">
                  {p.description}
                </p>

                {/* Prompt Question list */}
                <div className="border-t border-white/5 pt-4 mt-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 flex items-center gap-1 mb-2.5">
                    <HelpCircle className="h-3 w-3 text-blue-400" /> Key Questions:
                  </span>
                  <ul className="space-y-2 text-[11px] font-mono text-white/50">
                    {p.questions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <ArrowRight className={`h-2.5 w-2.5 mt-0.5 ${p.arrowColor} shrink-0`} />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
