import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { cn } from '../../lib/utils';
import { BarChart2, BrainCircuit, BellRing, Link as LinkIcon, CandlestickChart, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <BarChart2 className="w-8 h-8 text-scalo-primary" />,
    title: 'Dashboard de negocio unificado',
    description: 'Una vista completa y en tiempo real de tu empresa. Ventas, rentabilidad, operaciones y clientes en una sola pantalla.',
    badge: 'Core Feature',
    colSpan: 'md:col-span-2',
    gradient: 'from-scalo-primary/20 to-transparent'
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-scalo-accent-violet" />,
    title: 'Recomendaciones Inteligentes',
    description: 'Scalo no solo muestra números. Te dice qué hacer, con qué prioridad y cuál es el impacto esperado en tus resultados.',
    badge: 'AI-Powered',
    colSpan: 'col-span-1',
    gradient: 'from-scalo-accent-violet/20 to-transparent'
  },
  {
    icon: <BellRing className="w-8 h-8 text-amber-400" />,
    title: 'Recomendaciones automáticas',
    description: 'La plataforma te avisa cuando algo importante cambia: una caída en ventas, una oportunidad emergente o un proceso que está fallando.',
    colSpan: 'col-span-1',
    gradient: 'from-amber-400/20 to-transparent'
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-emerald-400" />,
    title: 'Integración con tus herramientas',
    description: 'Conecta Excel, Google Sheets, tu CRM o ERP. Scalo trabaja con lo que ya tienes, sin reemplazar nada.',
    colSpan: 'md:col-span-2',
    gradient: 'from-emerald-400/20 to-transparent'
  },
  {
    icon: <CandlestickChart className="w-8 h-8 text-scalo-accent-cyan" />,
    title: 'Reportes accionables',
    description: 'Olvídate de reportes que nadie lee. Cada informe de Scalo termina con una lista de acciones concretas y medibles.',
    colSpan: 'md:col-span-2',
    gradient: 'from-scalo-accent-cyan/20 to-transparent'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-rose-400" />,
    title: 'Score de salud del negocio',
    description: 'Un número que resume el estado de tu empresa en 5 dimensiones clave. Fácil de entender, fácil de mejorar.',
    colSpan: 'col-span-1',
    gradient: 'from-rose-400/20 to-transparent'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } }
};

export default function BentoGrid() {
  return (
    <div className="container mx-auto px-6 relative z-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className={cn("h-full", feature.colSpan)}
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              transitionSpeed={1000}
              scale={1.02}
              gyroscope={true}
              className="h-full"
            >
              <div className="glass h-full p-6 md:p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group flex flex-col justify-between">
                
                {/* Dynamic Background Glow on Hover */}
                <div className={cn(
                  "absolute -inset-24 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl z-0 pointer-events-none",
                  feature.gradient
                )}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-deep-navy/50 border border-white/10 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    {feature.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-outfit tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
