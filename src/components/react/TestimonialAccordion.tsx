import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, MessageSquareQuote } from 'lucide-react';
import { cn } from '../../lib/utils';

const testimonials = [
  {
    author: "Carlos Méndez",
    role: "CTO, TechVenture",
    feedback: "Movernos a Scalo fue la decisión más rentable del trimestre. El análisis predictivo nos salvó de una caída de retención del 15%. La forma en que dibuja los insights en tiempo real parece mágica.",
    rating: 5,
    gradient: "from-scalo-primary/20"
  },
  {
    author: "Sofía Laurent",
    role: "VP de Growth, Horizon",
    feedback: "Antes tardábamos días en cruzar datos de 5 plataformas distintas. Ahora con las Integraciones Fluidas tenemos un único panel de control que nuestro equipo comercial entiende a la primera.",
    rating: 5,
    gradient: "from-scalo-accent-cyan/20"
  },
  {
    author: "David Ruiz",
    role: "Founder, DataFlow",
    feedback: "He probado todas las herramientas del mercado. Ninguna se siente tan 'viva' como Scalo. Las alertas nos mantienen a la vanguardia antes de que los problemas escalen.",
    rating: 5,
    gradient: "from-scalo-accent-violet/20"
  }
];

export default function TestimonialAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {testimonials.map((item, index) => {
        const isExpanded = expandedIndex === index;
        
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "glass rounded-2xl border border-white/5 overflow-hidden transition-colors duration-300",
              isExpanded ? "border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.1)]" : "hover:border-white/10"
            )}
          >
            {/* Header (Always Visible) */}
            <button 
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full bg-gradient-to-br to-transparent flex items-center justify-center border border-white/10",
                  item.gradient
                )}>
                  <MessageSquareQuote className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-outfit">{item.author}</h4>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                    <p className="text-slate-300 leading-relaxed text-[15px] italic">
                      "{item.feedback}"
                    </p>
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
