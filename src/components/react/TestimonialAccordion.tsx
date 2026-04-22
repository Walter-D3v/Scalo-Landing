import React from 'react';
import { Star, Quote } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    author: 'Carlos Méndez',
    role: 'CTO, TechVenture',
    feedback: 'Movernos a Scalo fue la decisión más rentable del trimestre. El análisis predictivo nos salvó de una caída de retención del 15%.',
    rating: 5,
    accent: '#6366f1',
    initials: 'CM',
  },
  {
    author: 'Sofía Laurent',
    role: 'VP de Growth, Horizon',
    feedback: 'Antes tardábamos días en cruzar datos de 5 plataformas distintas. Ahora tenemos un único panel que nuestro equipo entiende a la primera.',
    rating: 5,
    accent: '#06b6d4',
    initials: 'SL',
  },
  {
    author: 'David Ruiz',
    role: 'Founder, DataFlow',
    feedback: 'He probado todas las herramientas del mercado. Ninguna se siente tan viva como Scalo. Las alertas nos mantienen un paso adelante siempre.',
    rating: 5,
    accent: '#8b5cf6',
    initials: 'DR',
  },
  {
    author: 'Ana Torres',
    role: 'Head of Finance, Nexus',
    feedback: 'El dashboard de liquidez nos dio visibilidad que antes simplemente no teníamos. Identificamos un riesgo crítico en menos de 48 horas.',
    rating: 5,
    accent: '#06b6d4',
    initials: 'AT',
  },
  {
    author: 'Miguel Ángel Fuentes',
    role: 'CEO, Escala Labs',
    feedback: 'Scalo reemplazó tres herramientas distintas que usábamos. El ROI fue inmediato. No puedo imaginar operar sin él ahora.',
    rating: 5,
    accent: '#6366f1',
    initials: 'MF',
  },
  {
    author: 'Laura Vásquez',
    role: 'COO, PivotHub',
    feedback: 'La integración con nuestro ERP fue sorprendentemente fluida. En dos días ya teníamos insights accionables corriendo automáticamente.',
    rating: 5,
    accent: '#8b5cf6',
    initials: 'LV',
  },
];

// Duplicate for seamless loop
const row1 = [...testimonials, ...testimonials];
const row2 = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

// ─── Single Card ─────────────────────────────────────────────────────────────
function TestimonialCard({ item }: { item: typeof testimonials[number] }) {
  return (
    <div
      className="relative flex-shrink-0 w-80 p-5 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-xl mx-3 group cursor-default"
      style={{ boxShadow: `0 0 0 1px ${item.accent}18` }}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${item.accent}14, transparent 65%)` }}
      />

      {/* Quote icon */}
      <Quote
        className="absolute top-4 right-4 w-6 h-6 opacity-10"
        style={{ color: item.accent }}
      />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Feedback */}
      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
        "{item.feedback}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${item.accent}60, ${item.accent}20)`, border: `1px solid ${item.accent}40` }}
        >
          {item.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-xs leading-tight">{item.author}</p>
          <p className="text-slate-500 text-[11px]">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Pausable marquee using CSS animation ────────────────────────────────────
function CSSMarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden relative group/row">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B0B0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B0B0F] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex py-3 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover/row:[animation-play-state:paused]`}
        style={{ width: 'max-content' }}
      >
        {items.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TestimonialCarousel() {
  return (
    <div className="flex flex-col gap-5 py-4 overflow-hidden">
      <CSSMarqueeRow items={row1} reverse={false} />
      <CSSMarqueeRow items={row2} reverse={true} />
    </div>
  );
}
