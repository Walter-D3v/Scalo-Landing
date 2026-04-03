# 🎨 ScaloAI - Landing Page Premium SaaS
## Documentación de Diseño Modern Glassmorphism

---

## 📋 Tabla de Contenidos
1. [Overview del Proyecto](#overview)
2. [Arquitectura Técnica](#arquitectura)
3. [Estructura de Componentes](#componentes)
4. [Paleta de Colores](#colores)
5. [Tipografía](#tipografia)
6. [Efectos Visuales & Animaciones](#animaciones)
7. [Secciones de la Landing](#secciones)
8. [Librerías & Dependencias](#librerias)
9. [Optimizaciones & Performance](#performance)
10. [Guía de Extensión](#extension)

---

## Overview del Proyecto {#overview}

**ScaloAI** es una landing page premium para una plataforma SaaS de **inteligencia de datos** basada en IA. 

### **Objetivos Visuales:**
- ✨ **Premium & Moderno**: Glassmorphism, efectos 3D, gradientes animados
- 🚀 **Tech-Forward**: Estética startup de alto nivel (similar a jobbi.me)
- ⚡ **Alto Performance**: Astro static + Islands architecture
- 📱 **Mobile-First**: Responsive desde 320px
- ♿ **Accesible**: WCAG 2.1 AA compliant

### **Características Clave:**
- Dark mode por defecto con fondo gradiente animado
- Componentes glassmorphic con backdrop-filter blur
- Hover 3D effects con perspective y transform
- Scroll reveal animations automáticas
- CTA buttons con glow efects
- Iconografía emoji para vivacidad

---

## Arquitectura Técnica {#arquitectura}

### **Stack Tecnológico:**
```
Frontend: Astro 6.x (Static Site Generator)
Styling: CSS3 (Custom Properties + modern features)
Runtime: Node.js
Package Manager: npm
Deployment Ready: Static HTML output
```

### **Estructura de Carpetas:**
```
src/
├── components/          # Componentes Astro reutilizables
│   ├── Header.astro     # Navegación sticky con logo animado
│   ├── Hero.astro       # Hero section con elementos 3D animados
│   ├── Features.astro   # Grid de features con cards glassmorphic
│   ├── HowWorks.astro   # Pasos de onboarding numerados
│   ├── Testimonials.astro # Testimonios con avatares gradient
│   ├── Pricing.astro    # 3 planes con tabla comparativa
│   ├── CTA.astro        # Call-to-action prominente
│   └── Footer.astro     # Footer con enlaces y sociales
├── layouts/
│   └── Layout.astro     # Layout base con imports de estilos
├── pages/
│   └── index.astro      # Landing page principal (compone todos los componentes)
└── styles/
    ├── glassmorphism.css # Constantes CSS, utilidades, animaciones
    └── (opcional) componentes.css adicionales
```

### **Islands Architecture:**
La landing utiliza **Astro islands** para:
- Header: Interactividad de navegación
- CTA buttons: Event listeners para conversiones
- Smooth scroll: Navegación entre secciones
- Mobile menu: Toggle interactivo

Todo pre-renderizado a **HTML estático** - no hay JavaScript innecesario.

---

## Estructura de Componentes {#componentes}

### **1. Header.astro**
```astro
Título: Navegación sticky con logo animado
Props: { title, navItems }
Features:
  - Logo con rotación infinita (icon ◆)
  - Links de navegación con underline animado
  - Tema toggle button
  - CTA "Comenzar ahora"
  - Mobile hamburger menu (responsive <768px)
Animaciones:
  - Logo icon: rotación continua (20s linear)
  - Nav links: underline slide on hover
```

### **2. Hero.astro**
```astro
Título: Hero section con 3D glass elements
Props: { title, subtitle, description, ctaText, ctaSecondary, badge }
Features:
  - Título con gradiente animado
  - Subtitle con efecto gradient-text
  - 2 CTAs: Primary (violeta) + Secondary (glass)
  - Avatar stack social proof (+200 empresas)
  - 3 elementos glassmorphic flotantes (left side)
Animaciones:
  - revealIn: fade + translateY (0.6s)
  - float: elementos 3D flotando infinitamente (6s)
  - Staggered animations con delays
```

### **3. Features.astro**
```astro
Título: 6 feature cards en grid
Props: { title, subtitle, description, features[] }
Features:
  - Grid responsivo (auto-fit minmax)
  - Cada card: icon, title, description, badge
  - 3D hover effect (translateY + scale)
  - Fondo gradiente animado on hover
Animaciones:
  - Card 3D: translateY(-8px) + brightness
  - Glow effect: box-shadow incrementa on hover
  - Delayed stagger: cada card +0.1s
```

### **4. HowWorks.astro**
```astro
Título: 3 pasos de onboarding
Props: { title, subtitle, description, steps[] }
Features:
  - Step cards numeradas con glassmorphic background
  - Descripción clara debajo del número
  - Arrows entre pasos (responsive)
  - Hover: transform + cyan glow
Estructura:
  01 → Conecta datos
  02 → Scalo analiza  
  03 → Tú accionas
```

### **5. Testimonials.astro**
```astro
Título: Testimonios de clientes
Props: { title, subtitle, testimonials[] }
Features:
  - 3 cards con rating ⭐⭐⭐⭐⭐
  - Avatar circular con gradiente único
  - Nombre, rol, empresa
  - glassmorphic background
Animaciones:
  - Hover: translateY(-8px) + pink glow
  - Border color change cyan to pink
```

###  **6. Pricing.astro**
```astro
Título: 3 planes de precios
Props: { title, subtitle, plans[] }
Features:
  - Starter: $99
  - Pro: $299 (HIGHLIGHTED - scale 1.05, border primary)
  - Enterprise: Contactar
  - Cada plan: features list de 5+ items
  - Check marks verdes en features
Animaciones:
  - Pro plan: scale 1.05 + glow
  - Hover pro: scale 1.08
  - Price amount: gradient text cyan->purple
```

### **7. CTA.astro**
```astro
Título: Call-to-Action potente
Props: { title, description, ctaText }
Features:
  - Fondo con blur radial gradients (fx izq/der)
  - Título xl gradient
  - Descripción empática
  - Botón primario large con icon 🚀
Animaciones:
  - Background blurs: opacity fluctuante
  - Button: scale + brightness on hover
```

### **8. Footer.astro**
```astro
Título: Footer moderno
Props: { brandName, brandDescription, columns[], socialLinks[], legal[] }
Features:
  - Brand section con description
  - 3 columnas de links (Producto, Empresa, Recursos)
  - Social links (Twitter, LinkedIn, GitHub)
  - Legal links (Privacidad, Términos, Cookies)
  - Copyright
Animaciones:
  - Social links: hover -> scale + color change
  - Links: translateX(4px) on hover
```

---

## Paleta de Colores {#colores}

### **Colores Base:**
```css
--dark-bg: #0a0e27;           /* Background oscuro principal */
--dark-bg-secondary: #1a1f3a; /* Fondo secundario */
--dark-bg-tertiary: #232d4d;  /* Fondo terciario */
```

### **Colores Primarios:**
```css
--primary: #6366f1;           /* Indigo/Purple - color principal */
--primary-light: #818cf8;     /* Indigo claro para highlights */
--primary-bright: #a5b4fc;    /* Indigo muy claro */
```

### **Colores de Acento:**
```css
--accent-cyan: #06b6d4;       /* Cyan/Turquesa - tech */
--accent-purple: #a855f7;     /* Púrpura vibrante */
--accent-pink: #ec4899;       /* Rosa/Magenta - call attention */
--accent-blue: #3b82f6;       /* Azul sky */
```

### **Escala de Grises (texto):**
```css
--text-primary: #f8fafc;      /* Texto principal blanco frío */
--text-secondary: #cbd5e1;    /* Texto secundario */
--text-tertiary: #94a3b8;     /* Texto muted */
```

### **Efectos Glass:**
```css
--glass-light: rgba(255, 255, 255, 0.08);
--glass-medium: rgba(255, 255, 255, 0.12);
--glass-dark: rgba(255, 255, 255, 0.06);
```

### **Gradientes Principales:**
```css
/* Hero Title */
background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);

/* Gradient Text (Cyan->Purple->Pink) */
background: linear-gradient(135deg, #06b6d4 0%, #818cf8 50%, #ec4899 100%);

/* Primary Button Glow */
box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);

/* Feature Card Hover */
background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%);
```

---

## Tipografía {#tipografia}

### **Font Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Por qué Inter:**
- Font geométrica moderna (ideal para tech)
- Excelente legibilidad en pantalla
- 8 weights disponibles (400-800)
- Optimizado para web

### **Escala Tipográfica:**
```css
/* Headings */
h1: clamp(2.5rem, 6vw, 4.5rem);  /* Fluido entre 2.5rem y 4.5rem */
h2: clamp(1.75rem, 4vw, 3rem);
h3: clamp(1.25rem, 2.5vw, 1.75rem);

/* Body */
body: 16px base
p: 1rem (16px) con line-height: 1.7

/* Small */
small: 0.875rem
labels: 0.9rem
meta: 0.85rem
```

### **Pesos Utilizados:**
- **400 (Regular)**: Body text, descriptions
- **500 (Medium)**: Nav links, secondary headings
- **600 (SemiBold)**: Feature titles, badges
- **700 (Bold)**: Section titles, CTAs
- **800 (ExtraBold)**: Hero title

### **Letter Spacing:**
```css
h1, h2: letter-spacing: -0.02em (tight)
h3: letter-spacing: -0.01em
nav: normal (0)
tabs: letter-spacing: 0.05em (uppercase)
```

---

## Efectos Visuales & Animaciones {#animaciones}

### **1. Glassmorphism**
```css
.glass {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```
✨ Efecto de vidrio esmerilado con blur de fondo

### **2. Gradient Text Animado**
```css
@keyframes gradientFlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gradient-text {
  background: linear-gradient(135deg, #06b6d4, #818cf8, #ec4899);
  background-size: 200% 200%;
  animation: gradientFlow 6s ease-in-out infinite;
}
```
🌈 Gradiente multicolor que flota/brilla

### **3. Reveal on Scroll**
```css
@keyframes revealIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal { animation: revealIn 0.6s ease-out forwards; opacity: 0; }
.reveal.visible { animation-play-state: running; }
```
⬆️ Elements fade in + slide up cuando entran viewport

### **4. Floating Elements**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(2deg); }
}

.float { animation: float 6s ease-in-out infinite; }
```
☁️ Elementos 3D flotantes en hero section

### **5. Glow Effect**
```css
@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3)); }
  50% { filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.6)); }
}

.glow { animation: glow 4s ease-in-out infinite; }
```
⚡ Efecto de brillo pulsante alrededor de elementos

### **6. Card 3D Hover**
```css
.card-3d:hover {
  transform: translateY(-8px) rotateX(5deg) rotateY(2deg);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}
```
🎯 Cards se elevan y rotan ligeramente al hover

### **7. Button Shine Effect**
```css
.btn::before {
  content: '';
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}

.btn:hover::before { transform: translateX(100%); }
```
✨ Destello de luz que cruza el botón

### **8. Pulse Dot**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.dot { animation: pulse 2s ease-in-out infinite; }
```
🔴 Puntito rojo pulsante en badges

### **Timing Functions Utilizadas:**
- `ease-out`: Default para reveals (natural)
- `ease-in-out`: Loops (smooth)
- `linear`: Rotaciones (consistente)
- `cubic-bezier`: Custom (juego de valores)

---

## Secciones de la Landing {#secciones}

### **1. Header (Sticky)**
- Logo animado con ◆ rotativo
- Nav links: Producto, Features, Pricing, Testimonios
- CTA primario "Comenzar ahora"
- Mobile hamburger menu
- **Height**: 80px

### **2. Hero (100vh)**
- Título: "Transforma datos en decisiones inteligentes"
- Subtitle: "Automatiza el análisis..."
- Descripción empática
- 2 CTAs + avatar stack social proof
- 3 elementos glassmorphic 3D flotante (derecha)
- **Background**: Gradientes radiales animados

### **3. Features (6 cards)**
- Grid responsive
- Iconos emoji + titulo + descripción
- Badges de feature type
- Hover 3D con glow
- **Background**: Blur radial púrpura (top-right)

### **4. How It Works (3 pasos)**
- Números in glass containers
- Descripción clara de cada paso
- Arrows conectando pasos
- Hover: transform + cyan glow
- **Background**: Blur radial cyan (bottom-left)

### **5. Testimonials (3 cards)**
- Quotes con 5⭐ rating
- Avatar + autor + rol + empresa
- glassmorphic background
- **Background**: Blur radial pink (top-right)

### **6. Pricing (3 planes)**
- Starter $99
- Pro $299 (highlighted, scale 1.05)
- Enterprise (contactar)
- Feature comparativa
- **Spacing**: 2rem gap

### **7. CTA Zone**
- Background con blur radials
- Título + descripción
- Button primario large
- **Height**: 500px aprox

### **8. Footer**
- Brand section
- 3 columnas de links
- Social icons
- Legal links
- Copyright

---

## Librerías & Dependencias {#librerias}

### **Dependencias Principales:**
```json
{
  "astro": "^6.1.3",
  "typescript": "latest"
}
```

### **Sin dependencias externas de UI!**
Todo está construido con:
- ✅ CSS3 vanilla (custom properties, grid, flexbox)
- ✅ HTML semántico
- ✅ JavaScript vanilla (scroll observer, smooth scroll)
- ✅ Google Fonts (Inter) - solo 1 request

### **Herramientas Recomendadas (Opcionales):**

#### Para Mejoras Futuras:
```json
"framer-motion": "^10.x",     // Animaciones avanzadas
"react": "^18.x",              // Para islands complejas
"astro-icon": "^1.x",          // Icons SVG optimizados
"@astrojs/sitemap": "^3.x",   // SEO sitemap auto
"@astrojs/image": "^1.x"      // Image optimization
```

#### Dev Dependencies:
```json
"prettier": "^3.x",           // Code formatter
"astro-eslint-parser": "^0.x" // Linting para Astro
```

---

## Optimizaciones & Performance {#performance}

### **Core Web Vitals:**
- ✅ **LCP**: < 2.5s (Hero elements preload)
- ✅ **FID**: < 100ms (minimal JS)
- ✅ **CLS**: 0 (no layout shift)

### **Performance Strategies:**

#### 1. Static Generation
```text
Astro: Static HTML genera en build time
Output: 1 HTML file pre-rendered
Delivery: Direct HTML (no SSR overhead)
```

#### 2. CSS Optimization
```css
/* Inline critical CSS in <head> */
/* Split no-critical CSS para async load */
/* Use CSS custom properties para theme switching */
```

#### 3. Image Optimization
```
- No images (solo emoji + gradientes)
- Fondo: solo CSS (no PNG/JPEG)
- Iconos: emoji/unicode (ultraligero)
```

#### 4. JavaScript Minimization
```text
Total JS: ~2-3KB (sin dependencies!)
Functions:
  - Intersection Observer (scroll reveal)
  - Smooth scroll anchor links
  - Mobile menu toggle
```

#### 5. Resource Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdn.example.com">
```

### **Métricas Esperadas:**
- Lighthouse: **95+/100**
- Time to Interactive: **< 1.5s**
- Total Bundle Size: **< 50KB**
- First Contentful Paint: **< 0.8s**

---

## Guía de Extensión {#extension}

### **Agregar Nuevo Componente:**

1. **Crear archivo en `/src/components/`:**
```astro
---
// NewComponent.astro
export interface Props {
  title: string;
  // adiciona props...
}

const { title } = Astro.props as Props;
---

<section class="new-component">
  <h2>{title}</h2>
  <!-- content -->
</section>

<style>
  .new-component {
    padding: 4rem 2rem;
    /* styles */
  }
</style>
```

2. **Importar en `index.astro`:**
```astro
import NewComponent from '../components/NewComponent.astro';

<NewComponent title="Título" />
```

3. **Usar utilidades de `glassmorphism.css`:**
```astro
<div class="glass card-3d reveal">
  <!-- card content -->
</div>
```

### **Agregar Animación Custom:**

1. **Definir en `glassmorphism.css`:**
```css
@keyframes slideLeftIn {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-left { animation: slideLeftIn 0.6s ease-out forwards; }
```

2. **Usar en componente:**
```astro
<div class="slide-left" style="animation-delay: 0.2s">Content</div>
```

### **Temas & Paletas Alternativas:**

La landing soporta themes personalizados editando CSS variables:
```css
:root {
  --dark-bg: #0f0e1e;  /* Más oscuro */
  --primary: #7c3aed;  /* Purple vibrante */
  --accent-cyan: #0891b2;  /* Darker cyan */
}
```

### **Integración con CMS:**

Preparado para **Astro Content Collections**:
```astro
---
import { getCollection } from 'astro:content';

const features = await getCollection('features');
---

<Features features={features} />
```

### **Deploy & CI/CD:**

**Netlify/Vercel:**
```bash
# Build command
npm run build

# Output directory
dist/
```

**GitHub Actions Example:**
```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci && npm run build
      - uses: netlify/actions/deploy@master
```

---

## 🎯 Conclusión

**ScaloAI Landing Page** es una landing page **ultra-moderna, performante y escalable** que combina:

✨ **Diseño**: Glassmorphism + 3D effects + Gradientes animados  
⚡ **Performance**: Static HTML + 0 dependencias de UI  
🔧 **Código**: Componentes limpios reutilizables en Astro  
📱 **Responsive**: Mobile-first desde 320px  
🎨 **Customizable**: CSS variables para temas personalizados  

**Estado**: ✅ Build Success | 🚀 Ready to Deploy

---

**Última actualización**: Abril 2025  
**Versión**: 1.0.0  
**Autor**: ScaloAI Design Team
