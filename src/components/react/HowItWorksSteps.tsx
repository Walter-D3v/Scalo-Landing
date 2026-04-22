import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Zap, PieChart } from 'lucide-react';
import { cn } from '../../lib/utils';

const steps = [
  {
    icon: <Database className="w-6 h-6 text-scalo-primary" />,
    title: "1. Conecta tus datos",
    description: "Scalo se integra con lo que ya usas: Excel, tu CRM, tu sistema de ventas o ERP. En minutos, no semanas."
  },
  {
    icon: <Zap className="w-6 h-6 text-scalo-accent-violet" />,
    title: "2. Scalo lo analiza",
    description: "La plataforma procesa, ordena y cruza tu información automáticamente. Detecta patrones y oportunidades que nadie ve a mano."
  },
  {
    icon: <PieChart className="w-6 h-6 text-scalo-accent-cyan" />,
    title: "3. Tú accionas",
    description: 'Recibes recomendaciones claras con impacto estimado. Sin interpretación. Solo: "haz esto para crecer más".'
  }
];

export default function HowItWorksSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-24 relative z-10">
      
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold font-space uppercase tracking-tighter text-white">
          Cómo <span className="text-scalo-primary">Funciona</span>
        </h2>
        <p className="mt-4 text-slate-400 font-light">De los datos sin procesar a la toma de decisiones en 3 simples pasos.</p>
      </div>

      <div className="relative">
        {/* Animated Connecting Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 block">
           <motion.div 
             className="absolute top-0 w-full bg-gradient-to-b from-scalo-primary via-scalo-accent-violet to-scalo-accent-cyan" 
             style={{ height: lineHeight }}
           />
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">
                
                {/* Left Side (Empty or Content) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className={cn(
                    "w-full md:w-5/12 pl-16 md:pl-0",
                    isEven ? "md:text-right md:pr-12" : "md:order-3 md:text-left md:pl-12"
                  )}
                >
                  <h3 className="text-2xl font-bold font-space text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{step.description}</p>
                </motion.div>

                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 md:order-2">
                  <motion.div 
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                     className="w-16 h-16 rounded-full bg-navy-blue border-2 border-white/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-scalo-primary/50 transition-colors"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/5 rounded-full blur group-hover:bg-scalo-primary/20 transition-all"></div>
                    {step.icon}
                  </motion.div>
                </div>

                {/* Right Side (Visual or Empty) */}
                <div className={cn(
                  "hidden md:block w-5/12",
                  isEven ? "order-3" : "order-1"
                )}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
