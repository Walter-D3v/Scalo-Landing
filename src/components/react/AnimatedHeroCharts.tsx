import React, { useRef, useState} from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { LineChart, BarChart3, Activity, TrendingUp } from 'lucide-react';

const mockBarData = [12, 35, 23, 56, 40, 78, 62, 85, 45, 95];

export default function AnimatedHeroCharts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full max-w-5xl mx-auto mt-20 group"
    >
      {/* Background Glow that tracks mouse */}
      {isHovering && (
        <div 
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)`
          }}
        />
      )}

      <div className="relative z-10 glass-card p-4 md:p-8 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.15)] border border-white/5 bg-deep-navy/40 backdrop-blur-3xl min-h-[400px] flex flex-col gap-6">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-scalo-primary/20 flex items-center justify-center border border-scalo-primary/30">
                <Activity className="text-scalo-accent-cyan w-5 h-5" />
             </div>
             <div>
               <h3 className="text-white font-bold tracking-tight">Análisis en Tiempo Real</h3>
               <p className="text-xs text-slate-400">Procesando +10M eventos/s</p>
             </div>
          </div>
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
             <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
             <div className="w-3 h-3 rounded-full bg-scalo-accent-cyan animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
          </div>
        </div>

        {/* Content Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          
          {/* Main Chart Area */}
          <div className="md:col-span-2 glass p-6 rounded-2xl border border-white/5 flex flex-col justify-end relative overflow-hidden group/chart cursor-crosshair">
            <div className="absolute top-6 left-6">
              <p className="text-sm text-slate-400 font-medium mb-1">Crecimiento Mensual</p>
              <h4 className="text-3xl font-bold text-white font-outfit uppercase tracking-tighter flex items-center gap-2">
                $124,500 <TrendingUp className="text-emerald-400 w-6 h-6" />
              </h4>
            </div>

            <div className="h-48 w-full flex items-end justify-between gap-1 mt-16 pb-2">
               {mockBarData.map((val, i) => (
                 <motion.div
                   key={i}
                   initial={{ height: 0, opacity: 0 }}
                   whileInView={{ height: `${val}%`, opacity: 1 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ 
                     duration: 0.8, 
                     delay: i * 0.05, 
                     type: "spring",
                     stiffness: 100,
                     damping: 15
                   }}
                   className={cn(
                     "w-full rounded-t-md relative overflow-hidden",
                     i === mockBarData.length - 1 ? "bg-scalo-accent-cyan" : "bg-scalo-primary/40 group-hover/chart:bg-scalo-primary/60 transition-colors"
                   )}
                 >
                   {/* Shimmer effect inside bar */}
                   <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Side Cards Area */}
          <div className="flex flex-col gap-6">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="glass p-5 rounded-2xl flex-1 border border-white/5 flex flex-col justify-between relative overflow-hidden"
            >
               <div className="absolute -right-6 -top-6 w-24 h-24 bg-scalo-accent-violet/20 blur-xl rounded-full"></div>
               <LineChart className="text-scalo-accent-violet w-6 h-6 mb-4" />
               <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Churn Rate</p>
                  <p className="text-2xl font-bold text-white tracking-tighter">1.2%</p>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="glass p-5 rounded-2xl flex-1 border border-white/5 flex flex-col justify-between relative overflow-hidden"
            >
               <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-scalo-accent-cyan/20 blur-xl rounded-full"></div>
               <BarChart3 className="text-scalo-accent-cyan w-6 h-6 mb-4" />
               <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Nuevos Leads</p>
                  <p className="text-2xl font-bold text-white tracking-tighter">+845</p>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Decorative Glow Behind Dashboard */}
      <div className="absolute inset-0 bg-scalo-accent-violet/10 blur-[120px] -z-20 rounded-full animate-pulse-slow pointer-events-none"></div>
    </div>
  );
}
