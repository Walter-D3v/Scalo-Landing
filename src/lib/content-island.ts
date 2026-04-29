import { createClient } from '@content-island/api-client';

// ─── Client singleton ─────────────────────────────────────────────────────────
const client = createClient({
  accessToken: import.meta.env.CONTENT_ISLAND_TOKEN,
});

// ─── Types ────────────────────────────────────────────────────────────────────
// Content Island retorna los campos aplanados directamente.
// Los campos Media pueden venir como string URL o como objeto { url: string }.

export interface CIMedia {
  url?: string;
  [key: string]: unknown;
}

export interface CIAuthor {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string | CIMedia;
  LinkedIn?: string;
}

export interface CICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CIPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  Body_content: string;
  CoverImage?: string | CIMedia;
  PublishedAt: string;
  Author?: CIAuthor;
  Category?: CICategory;
  featured?: boolean;
}

export interface CIOpinion {
  id: string;
  name: string;
  avatar?: string | CIMedia;
  content: string;
  source?: string;
  ranking?: number;
}

export interface CILandingSections {
  id: string;
  Hero?: boolean;
  ProblemSection?: boolean;
  Features?: boolean;
  HowItWorks?: boolean;
  Testimonials?: boolean;
  Blog?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Normaliza campos Media de Content Island.
 * Pueden llegar como string, objeto { url: string }, o undefined.
 */
export const normalizeUrl = (value?: string | CIMedia | unknown): string | undefined => {
  if (!value) return undefined;
  if (typeof value === 'string') {
    if (value.startsWith('//')) return `https:${value}`;
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    // URL sin protocolo (ej: "www.linkedin.com/in/...")
    return `https://${value}`;
  }
  if (typeof value === 'object' && value !== null) {
    const obj = value as CIMedia;
    if (typeof obj.url === 'string') return normalizeUrl(obj.url);
  }
  return undefined;
};

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Trae posts destacados (featured: true) para la landing.
 * Si no hay ninguno con featured, cae a los últimos N sin filtro.
 */
export async function getFeaturedPosts(limit = 3): Promise<CIPost[]> {
  try {
    const featured = await client.getContentList<CIPost>({
      contentType: 'Post',
      'fields.featured': true,
      includeRelatedContent: true,
      sort: { 'fields.PublishedAt': 'desc' },
      pagination: { take: limit },
    });
    if (featured.length > 0) return featured;

    // Fallback: sin filtro featured
    return await client.getContentList<CIPost>({
      contentType: 'Post',
      includeRelatedContent: true,
      sort: { 'fields.PublishedAt': 'desc' },
      pagination: { take: limit },
    });
  } catch (err: any) {
    console.warn('[content-island] getFeaturedPosts falló:', err?.message ?? err);
    return [];
  }
}

/** Trae todos los posts (para la página /blog). */
export async function getPosts(limit = 9): Promise<CIPost[]> {
  try {
    return await client.getContentList<CIPost>({
      contentType: 'Post',
      includeRelatedContent: true,
      sort: { 'fields.PublishedAt': 'desc' },
      pagination: { take: limit },
    });
  } catch (err: any) {
    console.warn('[content-island] getPosts falló:', err?.message ?? err);
    return [];
  }
}

/** Trae un post por slug. */
export async function getPostBySlug(slug: string): Promise<CIPost | null> {
  try {
    const posts = await client.getContentList<CIPost>({
      contentType: 'Post',
      'fields.slug': slug,
      includeRelatedContent: true,
      pagination: { take: 1 },
    });
    return posts[0] ?? null;
  } catch (err: any) {
    console.warn(`[content-island] getPostBySlug("${slug}") falló:`, err?.message ?? err);
    return null;
  }
}

/** Trae todos los slugs para rutas estáticas. */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const posts = await client.getContentList<CIPost>({
      contentType: 'Post',
      includeRelatedContent: true,
      pagination: { take: 1000 },
    });

    // Debug: log the first post shape to detect field names
    if (posts.length > 0) {
      console.log('[content-island] getAllPostSlugs sample post keys:', Object.keys(posts[0]));
      console.log('[content-island] getAllPostSlugs sample post:', JSON.stringify(posts[0]).substring(0, 300));
    }

    const slugs = posts
      .map((p: any) => {
        // Try common field name variants returned by Content Island
        return p.slug ?? p.Slug ?? p['fields.slug'] ?? p.fields?.slug ?? null;
      })
      .filter(Boolean) as string[];

    console.log('[content-island] getAllPostSlugs found slugs:', slugs);
    return slugs;
  } catch (err: any) {
    console.warn('[content-island] getAllPostSlugs falló:', err?.message ?? err);
    return [];
  }
}

/** Trae opiniones ordenadas por ranking. */
export async function getOpinions(limit = 6): Promise<CIOpinion[]> {
  try {
    return await client.getContentList<CIOpinion>({
      contentType: 'opinion',
      sort: { 'fields.ranking': 'desc' },
      pagination: { take: limit },
    });
  } catch (err: any) {
    console.warn('[content-island] getOpinions falló:', err?.message ?? err);
    return [];
  }
}

/** Trae la configuración de visibilidad de secciones de la landing. */
export async function getLandingSectionsConfig(): Promise<CILandingSections | null> {
  try {
    // Intentamos con 'Landing sections', si el nombre interno varía puedes cambiarlo a 'landing_sections'
    let configs = await client.getContentList<CILandingSections>({
      contentType: 'Landing sections',
      pagination: { take: 10 },
    }).catch(() => []);

    if (configs.length === 0) {
      configs = await client.getContentList<CILandingSections>({
        contentType: 'landing_sections',
        pagination: { take: 10 },
      }).catch(() => []);
    }

    if (configs.length === 0) return null;

    // Retorna la configuración con el ID específico que creaste, o la primera si no la encuentra
    const match = configs.find(c => c.id === '69f13b79a18f592ddc97e15e') || configs[0];
    return match ?? null;
  } catch (err: any) {
    console.warn('[content-island] getLandingSectionsConfig falló:', err?.message ?? err);
    return null;
  }
}
