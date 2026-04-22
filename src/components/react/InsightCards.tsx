import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
type Severity = 'critical' | 'alert' | 'info';

interface InsightCard {
  id: string;
  severity: Severity;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  metric: string;
  metricLabel: string;
  visual: React.ReactNode;
}

// ─── Severity Config ──────────────────────────────────────────────────────────
const severityConfig: Record<Severity, { label: string; dot: string; text: string; glow: string; border: string }> = {
  critical: {
    label: 'CRÍTICO',
    dot: 'bg-red-500',
    text: 'text-red-400',
    glow: 'shadow-[0_0_30px_rgba(239,68,68,0.12)]',
    border: 'border-red-500/20 hover:border-red-500/40',
  },
  alert: {
    label: 'ALERTA',
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.10)]',
    border: 'border-amber-400/20 hover:border-amber-400/40',
  },
  info: {
    label: 'INFO',
    dot: 'bg-cyan-400',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.10)]',
    border: 'border-cyan-400/20 hover:border-cyan-400/40',
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Animated progress bar */
function ProgressBar({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <div ref={ref} className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </div>
  );
}

/** Burn-rate bar chart */
function BurnRateChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const bars = [0.35, 0.45, 0.55, 0.7, 0.9, 1.0];
  const colors = ['bg-amber-600/60', 'bg-amber-600/70', 'bg-amber-500/80', 'bg-amber-400/90', 'bg-amber-400', 'bg-amber-300'];
  return (
    <div ref={ref} className="flex items-end gap-1.5 h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className={`flex-1 rounded-sm ${colors[i]}`}
          initial={{ scaleY: 0, originY: 1 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: `${h * 100}%`, transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
}

// ─── Cards Data ───────────────────────────────────────────────────────────────
const cards: InsightCard[] = [
  {
    id: 'concentracion',
    severity: 'critical',
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
    title: 'Riesgo de Concentración',
    description: (
      <>
        Un cliente representa el{' '}
        <span className="text-red-400 font-bold">67%</span> de los ingresos.
        Se requiere diversificación.
      </>
    ),
    metric: '67%',
    metricLabel: 'Revenue share',
    visual: (
      <ProgressBar value={67} color="bg-gradient-to-r from-red-600 to-red-400" />
    ),
  },
  {
    id: 'burn-rate',
    severity: 'alert',
    icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
    title: 'Alerta de Burn Rate',
    description: (
      <>
        Los costos crecen{' '}
        <span className="text-amber-400 font-bold">2.3×</span> más rápido
        que los ingresos este trimestre.
      </>
    ),
    metric: '2.3×',
    metricLabel: 'Costo vs. ingreso',
    visual: <BurnRateChart />,
  },
  {
    id: 'liquidez',
    severity: 'info',
    icon: <Clock className="w-5 h-5 text-cyan-400" />,
    title: 'Monitoreo de Liquidez',
    description: (
      <>
        Cobro promedio:{' '}
        <span className="text-cyan-400 font-bold">52 días</span>. Presión
        creciente en el flujo de caja.
      </>
    ),
    metric: '52d',
    metricLabel: 'Avg. collection',
    visual: (
      <ProgressBar value={52} color="bg-gradient-to-r from-cyan-700 to-cyan-400" />
    ),
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────
function InsightCardItem({ card, index }: { card: InsightCard; index: number }) {
  const cfg = severityConfig[card.severity];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative flex flex-col gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-default
        bg-white/[0.04] backdrop-blur-xl
        ${cfg.border} ${cfg.glow}
        ${hovered ? 'translate-y-[-3px]' : ''}
      `}
    >
      {/* Subtle gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            card.severity === 'critical'
              ? 'radial-gradient(ellipse at top left, rgba(239,68,68,0.07), transparent 60%)'
              : card.severity === 'alert'
              ? 'radial-gradient(ellipse at top left, rgba(251,191,36,0.07), transparent 60%)'
              : 'radial-gradient(ellipse at top left, rgba(34,211,238,0.07), transparent 60%)',
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        {/* Icon box */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
            card.severity === 'critical'
              ? 'bg-red-500/10 border-red-500/20'
              : card.severity === 'alert'
              ? 'bg-amber-400/10 border-amber-400/20'
              : 'bg-cyan-400/10 border-cyan-400/20'
          }`}
        >
          {card.icon}
        </div>

        {/* Severity badge */}
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
          <span className={`text-[10px] font-bold tracking-widest ${cfg.text}`}>
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Title + Description */}
      <div className="relative z-10">
        <h3 className="text-white font-bold text-sm mb-1.5 leading-snug">{card.title}</h3>
        <p className="text-slate-400 text-xs leading-relaxed">{card.description}</p>
      </div>

      {/* Visual + Metric */}
      <div className="relative z-10 mt-auto pt-3 border-t border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-slate-500 tracking-wider uppercase">{card.metricLabel}</span>
          <span className={`text-xs font-bold tabular-nums ${cfg.text}`}>{card.metric}</span>
        </div>
        {card.visual}
      </div>

      {/* Arrow icon on hover */}
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 pointer-events-none"
        animate={{ opacity: hovered ? 0.5 : 0, x: hovered ? 0 : -4 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InsightCards() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-16 flex flex-col gap-4">
      {/* Tag line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-500"
      >
        Lo que Scalo detecta por ti
      </motion.p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <InsightCardItem key={card.id} card={card} index={i} />
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center text-[10px] text-slate-600 tracking-wide"
      >
        Insights de muestra — Scalo los genera automáticamente desde tu sistema contable
      </motion.p>
    </div>
  );
}
