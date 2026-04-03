import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const blogPosts = [
  {
    id: 1,
    title: "El futuro del Business Intelligence en 2026",
    category: "Insights",
    date: "12 Oct 2025",
    excerpt: "Por qué las herramientas estáticas están muriendo y cómo la IA transformativa dominará las decisiones corporativas.",
    gradient: "from-scalo-primary/30 to-transparent",
    hoverColor: "group-hover:text-scalo-primary"
  },
  {
    id: 2,
    title: "Cómo reducir el Customer Churn usando análisis predictivo",
    category: "Casos de Uso",
    date: "05 Oct 2025",
    excerpt: "Un análisis paso a paso de cómo los modelos de machine learning identifican patrones de fuga antes de que ocurran.",
    gradient: "from-scalo-accent-violet/30 to-transparent",
    hoverColor: "group-hover:text-scalo-accent-violet"
  },
  {
    id: 3,
    title: "Integración de silos de datos: La guía definitiva",
    category: "Ingeniería",
    date: "28 Sep 2025",
    excerpt: "Técnicas modernas para unificar SQL, Excel y CRMs en un solo Data Lake dinámico sin escribir scripts.",
    gradient: "from-scalo-accent-cyan/30 to-transparent",
    hoverColor: "group-hover:text-scalo-accent-cyan"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
};

export default function AnimatedBlog() {
  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-deep-navy border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-space uppercase tracking-tighter text-white mb-4">
              Últimas <span className="text-scalo-primary">Publicaciones</span>
            </h2>
            <p className="text-slate-400 font-light text-lg">
              Insights del mercado, casos de estudio y guías técnicas para dominar tus datos.
            </p>
          </div>
          <button className="flex items-center gap-2 text-white font-semibold group border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 transition-colors">
            Ver todo el Blog <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={cardVariants} className="h-full">
              <a href="#" className="block h-full group">
                <div className="glass rounded-3xl p-2 h-full border border-white/5 hover:border-white/10 transition-colors flex flex-col overflow-hidden relative">
                  
                  {/* Subtle Background Hover Glow */}
                  <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>

                  {/* Image/Gradient Cover Placeholder */}
                  <div className="h-48 w-full rounded-2xl relative overflow-hidden mb-6 bg-navy-blue border border-white/5 z-10">
                     <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-80 transition-opacity duration-500", post.gradient)}></div>
                     <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-deep-navy/80 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest border border-white/10">
                            {post.category}
                         </span>
                     </div>
                  </div>

                  <div className="px-5 pb-6 flex-1 flex flex-col z-10">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-3 font-space">
                      <span>{post.date}</span>
                    </div>
                    
                    <h3 className={cn("text-xl font-bold text-white mb-3 font-space tracking-tight transition-colors duration-300", post.hoverColor)}>
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-400 font-light text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                      Leer artículo 
                      <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-scalo-primary/10 blur-[150px] -z-10 rounded-full pointer-events-none translate-x-1/2"></div>
    </section>
  );
}
