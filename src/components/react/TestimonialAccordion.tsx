import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, X } from 'lucide-react';

export interface Testimonial {
  author: string;
  role: string;
  feedback: string;
  rating: number;
  accent: string;
  initials: string;
  avatar?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const defaultTestimonials: Testimonial[] = [
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

// ─── Avatar helper ────────────────────────────────────────────────────────────
function Avatar({ item, size = 'sm' }: { item: Testimonial; size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'w-12 h-12 text-sm' : 'w-8 h-8 text-xs';
  return item.avatar ? (
    <img
      src={item.avatar}
      alt={item.author}
      className={`${dim} rounded-full object-cover flex-shrink-0`}
      style={{ border: `1px solid ${item.accent}40` }}
    />
  ) : (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${item.accent}60, ${item.accent}20)`,
        border: `1px solid ${item.accent}40`,
      }}
    >
      {item.initials}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function TestimonialModal({
  item,
  onClose,
}: {
  item: Testimonial;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#0f0f14] p-8 shadow-2xl"
        style={{
          boxShadow: `0 0 60px ${item.accent}20, 0 0 0 1px ${item.accent}20`,
          animation: 'slideUp 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Accent glow */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top left, ${item.accent}10, transparent 60%)` }}
        />

        {/* Quote icon */}
        <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: item.accent }} />

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Full feedback */}
        <p className="text-slate-200 text-base leading-relaxed mb-6">
          "{item.feedback}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/8">
          <Avatar item={item} size="lg" />
          <div>
            <p className="text-white font-semibold text-sm">{item.author}</p>
            {item.role && <p className="text-slate-400 text-xs mt-0.5">{item.role}</p>}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}

// ─── Single Card ─────────────────────────────────────────────────────────────
function TestimonialCard({
  item,
  onOpen,
}: {
  item: Testimonial;
  onOpen: (item: Testimonial) => void;
}) {
  return (
    <div
      className="relative flex-shrink-0 w-80 p-5 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-xl mx-3 group cursor-pointer select-none"
      style={{ boxShadow: `0 0 0 1px ${item.accent}18` }}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(item)}
      aria-label={`Ver opinión completa de ${item.author}`}
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

      {/* Feedback — truncated with "Read more" hint */}
      <p className="text-slate-300 text-sm leading-relaxed mb-1 line-clamp-3">
        "{item.feedback}"
      </p>
      <p
        className="text-[11px] font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: item.accent }}
      >
        Ver completo →
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <Avatar item={item} size="sm" />
        <div>
          <p className="text-white font-semibold text-xs leading-tight">{item.author}</p>
          <p className="text-slate-500 text-[11px]">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────
function CSSMarqueeRow({
  items,
  reverse = false,
  onOpen,
}: {
  items: Testimonial[];
  reverse?: boolean;
  onOpen: (item: Testimonial) => void;
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
          <TestimonialCard key={i} item={item} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TestimonialCarousel({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const validTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const row1 = [...validTestimonials, ...validTestimonials];
  const row2 = [
    ...validTestimonials.slice(3),
    ...validTestimonials.slice(0, 3),
    ...validTestimonials.slice(3),
    ...validTestimonials.slice(0, 3),
  ];

  const handleOpen = useCallback((item: Testimonial) => setSelected(item), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <div className="flex flex-col gap-5 py-4 overflow-hidden">
        <CSSMarqueeRow items={row1} reverse={false} onOpen={handleOpen} />
        <CSSMarqueeRow items={row2} reverse={true} onOpen={handleOpen} />
      </div>

      {selected && (
        <TestimonialModal item={selected} onClose={handleClose} />
      )}
    </>
  );
}
