# 🚀 ScaloAI - Quick Start Guide

## ⚡ Comandos Esenciales

```bash
# Instalar dependencias
npm install

# Desarrollo local (localhost:3000)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## 📁 Estructura de Archivos

```
src/
├── components/           # Componentes reutilizables
│   ├── Header.astro      ← Menú navegación
│   ├── Hero.astro        ← Sección principal
│   ├── Features.astro    ← Grid de 6 features
│   ├── HowWorks.astro    ← 3 pasos paso-a-paso
│   ├── Testimonials.astro← 3 testimonios
│   ├── Pricing.astro     ← 3 planes de precio
│   ├── CTA.astro         ← Call-to-action
│   └── Footer.astro      ← Pie de página
├── layouts/
│   └── Layout.astro      ← HTML base + imports
├── pages/
│   └── index.astro       ← Landing page (compone todo)
└── styles/
    └── glassmorphism.css ← CSS base + variables + animaciones
```

---

## 🎨 Customizar Colores

Edita `src/styles/glassmorphism.css` en la sección `:root`:

```css
:root {
  /* Cambiar estos valores */
  --dark-bg: #0a0e27;         /* Fondo oscuro */
  --primary: #6366f1;         /* Color principal (botones) */
  --accent-cyan: #06b6d4;     /* Color acento secundario */
  --accent-purple: #a855f7;   /* Color acento terciario */
  --accent-pink: #ec4899;     /* Color acento cuaternario */
  --text-primary: #f8fafc;    /* Texto principal */
}
```

**Colores predefinidos Tailwind que funcionan bien:**
```
Purples: #8b5cf6, #a855f7, #c084fc
Cyans: #06b6d4, #14b8a6, #0ea5e9
Pinks: #ec4899, #f43f5e, #db2777
Blues: #3b82f6, #0284c7, #006fee
```

---

## ✍️ Editar Contenido

### Hero Section
Edita `src/pages/index.astro`:
```astro
<Hero
  title="Nuevo título aquí"
  subtitle="Nuevo subtítulo"
  description="Nueva descripción..."
  ctaText="Nuevo botón"
/>
```

### Features
Modifica el array `features`:
```javascript
features={[
  {
    icon: '📊',
    title: 'Dashboard Inteligente',
    description: 'Tu descripción aquí...',
    badge: 'Core Feature'
  },
  // Agregar más...
]}
```

### Testimonios
Edita el array `testimonials`:
```javascript
testimonials={[
  {
    text: "Tu testimonio aquí...",
    author: "Nombre",
    role: "Rol",
    company: "Empresa",
    avatar: "XX",  // 2 letras
    rating: 5
  },
  // Agregar más...
]}
```

### Pricing Plans
Personaliza los 3 planes:
```javascript
plans={[
  {
    name: 'Plan Name',
    price: 99,
    description: 'Descripción...',
    features: [
      'Feature 1',
      'Feature 2',
      // ...
    ]
  },
  // ...
]}
```

---

## 🎭 Agregar Nueva Sección

### 1. Crear componente
`src/components/MySectiont.astro`:
```astro
---
export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<section id="my-section" class="my-section">
  <div class="container">
    <h2 class="section-title reveal">{title}</h2>
    <!-- Content aquí -->
  </div>
</section>

<style>
  .my-section {
    padding: 6rem 2rem;
    position: relative;
  }
  
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
  }
</style>
```

### 2. Importar en index.astro
```astro
import MySection from '../components/MySection.astro';

<!-- dentro del <Layout> -->
<MySection title="Título" />
```

---

## 🎬 Animaciones Disponibles

Usa estas clases en cualquier elemento:

```html
<!-- Fade in + slide up on scroll -->
<div class="reveal">Content</div>

<!-- Flotante infinito -->
<div class="float">Floating element</div>

<!-- Glow pulsante -->
<div class="glow">Glowing element</div>

<!-- 3D hover card -->
<div class="card-3d">3D content</div>
```

### Crear animación custom
1. Define en `glassmorphism.css`:
```css
@keyframes myAnimation {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.my-animation {
  animation: myAnimation 0.6s ease-out forwards;
}
```

2. Usa en componente:
```astro
<div class="my-animation" style="animation-delay: 0.2s">Content</div>
```

---

## 🔘 Modificar Botones

### Tipos disponibles:
```html
<!-- Primary - Glow violeta -->
<button class="btn btn-primary">Comenzar</button>

<!-- Secondary - Glass efecto -->
<button class="btn btn-secondary">Ver demo</button>

<!-- Glass Dark -->
<button class="btn btn-glass-dark">Más info</button>
```

### Personalizar botón
```css
.btn-custom {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
  box-shadow: 0 0 20px rgba(your-r, your-g, your-b, 0.3);
  border: 1px solid rgba(your-r, your-g, your-b, 0.5);
}

.btn-custom:hover {
  box-shadow: 0 0 40px rgba(your-r, your-g, your-b, 0.6);
  transform: translateY(-2px);
}
```

---

## 📱 Testing Responsive

```bash
# Breakpoints principales
768px  - Tablets
1024px - Desktops pequeños  
1200px - Full desktops
```

Edita en `glassmorphism.css`:
```css
@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  .section-grid { gap: 2rem; }
}

@media (max-width: 480px) {
  body { font-size: 15px; }
  .btn { padding: 10px 16px; }
}
```

---

## 🔍 SEO & Meta Tags

Edita `src/layouts/Layout.astro`:
```astro
<title>ScaloAI - Transforma tus datos en decisiones...</title>
<meta name="description" content="Tu descripción..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta name="twitter:title" content="..." />
```

---

## 🚢 Deploy

### Netlify
```bash
npm run build
# Drop `dist/` folder en Netlify
```

### Vercel
```bash
npm run build
# Deploy automático desde GitHub
```

### GitHub Actions
```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 💡 Tips & Trucos

### Acelerar dev
```bash
# Limpia caché Astro
rm -rf .astro

# Build rápido sin optimización
npm run build -- --no-minify
```

### Debug CSS
```css
/* Ver grid */
* { border: 1px solid red !important; }

/* Ver espaciado */
* { outline: 1px solid blue !important; }
```

### JavaScript útil
```javascript
// Smooth scroll automático
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Observador para reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| **Build falla** | `npm install` nuevamente, limpia `.astro` |
| **Animaciones lentas** | Reduce duración en `@keyframes` o mejora GPU |
| **Layout roto mobile** | Revisa `@media` breakpoints, usa `clamp()` |
| **Colores no cambian** | Limpian caché browser `Ctrl+Shift+Del` |
| **Fuentes no cargan** | Verifica Google Fonts en `<head>` |

---

## 📚 Recursos

- [Astro Docs](https://docs.astro.build)
- [CSS Animation Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [Glassmorphism Design](https://uxdesign.cc/glassmorphism-the-future-design-trend-of-the-next-generation-ux-4c5e6cdc38d)
- [Web Performance Tips](https://web.dev/performance/)

---

**¡Listo para customizar!** 🎉
