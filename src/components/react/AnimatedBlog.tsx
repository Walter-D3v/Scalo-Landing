import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { CIPost } from '../../lib/content-island';
import { normalizeUrl } from '../../lib/content-island';

// ─── Animations ──────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: 'spring' } },
};

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: CIPost; index: number }) {
  // Cycle through accent colors per card
  const accents = [
    { gradient: 'from-scalo-primary/30 to-transparent', hover: 'group-hover:text-scalo-primary', badge: 'text-scalo-primary border-scalo-primary/30' },
    { gradient: 'from-scalo-accent-violet/30 to-transparent', hover: 'group-hover:text-scalo-accent-violet', badge: 'text-scalo-accent-violet border-scalo-accent-violet/30' },
    { gradient: 'from-scalo-accent-cyan/30 to-transparent', hover: 'group-hover:text-scalo-accent-cyan', badge: 'text-scalo-accent-cyan border-scalo-accent-cyan/30' },
  ];
  const accent = accents[index % accents.length];

  const imageUrl = normalizeUrl(post.CoverImage);
  const date = post.PublishedAt
    ? new Date(post.PublishedAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <motion.div variants={cardVariants} className="h-full">
      <a href={`/blog/${post.slug}`} className="block h-full group">
        <div className="glass rounded-3xl p-2 h-full border border-white/5 hover:border-white/10 transition-colors flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none" />

          {/* Cover */}
          <div className="h-48 w-full rounded-2xl relative overflow-hidden mb-6 bg-navy-blue border border-white/5 z-10">
            {imageUrl ? (
              <img src={imageUrl} alt={post.title} loading="lazy" decoding="async"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            ) : (
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-80 transition-opacity duration-500', accent.gradient)} />
            )}
            {post.Category && (
              <div className="absolute top-4 left-4">
                <span className={cn('px-3 py-1 bg-deep-navy/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border', accent.badge)}>
                  {post.Category.name}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-5 pb-6 flex-1 flex flex-col z-10">
            <div className="flex items-center gap-3 text-slate-500 text-xs mb-3 font-medium">
              {date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{date}</span>}
              {post.Author && <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.Author.name}</span>}
            </div>

            <h3 className={cn('text-xl font-bold text-white mb-3 tracking-tight transition-colors duration-300 leading-snug', accent.hover)}>
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
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass rounded-3xl p-2 border border-white/5 flex flex-col overflow-hidden animate-pulse">
      <div className="h-48 w-full rounded-2xl bg-white/5 mb-6" />
      <div className="px-5 pb-6 flex flex-col gap-3">
        <div className="h-3 w-24 bg-white/5 rounded-full" />
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
}

export default function AnimatedBlog({ posts }: AnimatedBlogProps) {
  const hasPosts = posts && posts.length > 0;

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
          <a href="/blog" className="flex items-center gap-2 text-white font-semibold group border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 transition-colors">
            Ver todo el Blog <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {hasPosts ? (
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        )}
      </div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-scalo-primary/10 blur-[150px] -z-10 rounded-full pointer-events-none translate-x-1/2" />
    </section>
  );
}
