import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Calendar, User, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { CIPost } from '../../lib/content-island';
import { normalizeUrl } from '../../lib/content-island';

// ─── Animations ──────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Rough reading time from excerpt length
function readingTime(text?: string | null): string {
  if (!text) return '1 min';
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: CIPost; index: number }) {
  const accents = [
    { glow: 'group-hover:shadow-scalo-primary/20', badge: 'text-scalo-primary border-scalo-primary/30 bg-scalo-primary/10', arrow: 'text-scalo-primary' },
    { glow: 'group-hover:shadow-scalo-accent-violet/20', badge: 'text-scalo-accent-violet border-scalo-accent-violet/30 bg-scalo-accent-violet/10', arrow: 'text-scalo-accent-violet' },
    { glow: 'group-hover:shadow-scalo-accent-cyan/20', badge: 'text-scalo-accent-cyan border-scalo-accent-cyan/30 bg-scalo-accent-cyan/10', arrow: 'text-scalo-accent-cyan' },
  ];
  const accent = accents[index % accents.length];

  const imageUrl = normalizeUrl(post.CoverImage);
  const date = post.PublishedAt
    ? new Date(post.PublishedAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <motion.div variants={cardVariants} className="h-full">
      <a
        href={`/blog/${post.slug}`}
        className={cn(
          'block h-full group rounded-3xl transition-shadow duration-500 shadow-xl',
          accent.glow
        )}
      >
        <div className="glass rounded-3xl p-2 h-full border border-white/5 hover:border-white/15 transition-all duration-500 flex flex-col overflow-hidden relative bg-white/[0.02]">

          {/* Cover */}
          <div className="h-52 w-full rounded-2xl relative overflow-hidden mb-0 bg-navy-blue border border-white/5">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-scalo-primary/20 to-transparent" />
            )}
            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent" />

            {/* Category badge */}
            {post.Category && (
              <div className="absolute top-4 left-4">
                <span className={cn('px-3 py-1 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border', accent.badge)}>
                  {post.Category.name}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-5 pt-5 pb-6 flex-1 flex flex-col gap-3">
            {/* Meta row */}
            <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
              {date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {readingTime(post.excerpt)} lectura
              </span>
              {post.Author && (
                <span className="flex items-center gap-1.5 ml-auto">
                  <User className="w-3 h-3" />
                  {post.Author.name}
                </span>
              )}
            </div>

            {/* Title — good letter-spacing, natural line-height */}
            <h3 className="text-[1.15rem] font-bold text-white leading-snug tracking-[-0.01em] group-hover:text-white transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">
              {post.excerpt}
            </p>

            {/* CTA */}
            <div className={cn('mt-auto pt-2 flex items-center gap-1 text-sm font-semibold transition-colors duration-300 text-slate-400 group-hover:text-white')}>
              Leer artículo
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass rounded-3xl p-2 border border-white/5 flex flex-col overflow-hidden animate-pulse">
      <div className="h-52 w-full rounded-2xl bg-white/5 mb-0" />
      <div className="px-5 pt-5 pb-6 flex flex-col gap-3">
        <div className="h-3 w-28 bg-white/5 rounded-full" />
        <div className="h-5 w-full bg-white/5 rounded-full" />
        <div className="h-5 w-3/4 bg-white/5 rounded-full" />
        <div className="h-3 w-full bg-white/5 rounded-full mt-2" />
        <div className="h-3 w-5/6 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
interface AnimatedBlogProps {
  posts: CIPost[];
  /** If false the "Últimas Publicaciones" heading is hidden (useful on /blog page) */
  showHeader?: boolean;
}

export default function AnimatedBlog({ posts, showHeader = true }: AnimatedBlogProps) {
  const hasPosts = posts && posts.length > 0;

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-deep-navy border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {showHeader && (
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold font-space uppercase tracking-tighter text-white mb-4">
                Últimas <span className="text-scalo-primary">Publicaciones</span>
              </h2>
              <p className="text-slate-400 font-light text-lg">
                Insights del mercado, casos de estudio y guías técnicas para dominar tus datos.
              </p>
            </div>
            <a href="/blog" className="flex items-center gap-2 text-white font-semibold group border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 transition-colors">
              Ver todo el Blog <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        )}

        {hasPosts ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        )}
      </div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-scalo-primary/10 blur-[150px] -z-10 rounded-full pointer-events-none translate-x-1/2" />
    </section>
  );
}
