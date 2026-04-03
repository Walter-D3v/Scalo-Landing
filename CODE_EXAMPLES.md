# 💻 ScaloAI - Code Customization Examples

## 🎨 Cambiar Paleta de Colores

### Ejemplo 1: Tema Moderno Cálido (Naranja/Rosa)

Edita `src/styles/glassmorphism.css`:

```css
:root {
  /* Primary - Naranja vibrante */
  --primary: #f97316;
  --primary-light: #fb923c;
  --primary-bright: #fdba74;
  
  /* Accents */
  --accent-cyan: #ff6b6b;      /* Rojo coral */
  --accent-purple: #ff8787;    /* Rosa claro */
  --accent-pink: #fa5252;      /* Rojo fuerte */
  --accent-blue: #ffa94d;      /* Naranja claro */
}
```

### Ejemplo 2: Tema Frío Moderno (Azul/Verde)

```css
:root {
  --primary: #0284c7;          /* Azul cielo */
  --primary-light: #38bdf8;
  --primary-bright: #7dd3fc;
  
  --accent-cyan: #06b6d4;      /* Turquesa (keep) */
  --accent-purple: #10b981;    /* Verde esmeralda */
  --accent-pink: #14b8a6;      /* Verde menta */
  --accent-blue: #0ea5e9;      /* Azul brillante */
}
```

### Ejemplo 3: Tema Oscuro Ultra (Negro + Púrpura)

```css
:root {
  --dark-bg: #000000;
  --dark-bg-secondary: #0d001a;
  --dark-bg-tertiary: #1a0033;
  
  --primary: #8b5cf6;
  --accent-purple: #d946ef;
  --accent-pink: #f472b6;
}
```

---

## 🔤 Cambiar Tipografía

### Usar otra Google Font

`src/layouts/Layout.astro`:

```astro
<!-- Reemplaza el import actual -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

<!-- Y en CSS -->
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Fonts recomendadas para tech:**
- `Poppins` - moderna, amigable
- `Sora` - geométrica, premium
- `Outfit` - futurista
- `ABC Favorit` - corporativa (premium)
- `JetBrains Mono` - coding look

### Aumentar tamaño base

```css
/* En :root */
h1 { font-size: clamp(3rem, 7vw, 5.5rem); }  /* Más grande */
h2 { font-size: clamp(2rem, 5vw, 4rem); }
p { font-size: 1.125rem; }  /* Más legible */
```

---

## 🖼️ Agregar Logo Custom

### En Header

`src/components/Header.astro`:

```astro
<a href="#hero" class="logo">
  <!-- Opción 1: Emoji -->
  <span class="logo-icon">🚀</span>
  
  <!-- Opción 2: SVG inline -->
  <svg class="logo-icon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="currentColor" />
  </svg>
  
  <!-- Opción 3: Imagen -->
  <img src="/logo.png" alt="Logo" class="logo-icon" />
  
  <span class="logo-text">Tu Brand</span>
</a>

<style>
  .logo-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
</style>
```

---

## 🎭 Crear Nuevo Componente (Feature Card Alternativa)

`src/components/FeatureCardAlt.astro`:

```astro
---
export interface Props {
  number: number;
  icon: string;
  title: string;
  description: string;
  link?: string;
}

const { number, icon, title, description, link } = Astro.props;
---

<article class="feature-card-alt glass reveal">
  <div class="card-header">
    <span class="number">{number}</span>
    <span class="icon">{icon}</span>
  </div>
  
  <div class="card-content">
    <h3 class="card-title">{title}</h3>
    <p class="card-description">{description}</p>
    {link && (
      <a href={link} class="card-link">
        Aprende más →
      </a>
    )}
  </div>
</article>

<style>
  .feature-card-alt {
    padding: 2rem;
    display: grid;
    gap: 1.5rem;
    border: 2px solid var(--glass-light);
    transition: all var(--transition-medium);
    cursor: pointer;
  }
  
  .feature-card-alt:hover {
    border-color: var(--primary);
    transform: translateX(10px);
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
  }
  
  .card-header {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .number {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary-light);
    min-width: 40px;
  }
  
  .icon {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .card-description {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .card-link {
    color: var(--primary-light);
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-fast);
  }
  
  .card-link:hover {
    transform: translateX(4px);
    color: var(--primary);
  }
</style>
```

### Usarlo en index.astro:

```astro
import FeatureCardAlt from '../components/FeatureCardAlt.astro';

<!-- En la sección de features -->
<div class="features-alt-grid">
  <FeatureCardAlt
    number={1}
    icon="📊"
    title="Dashboard Inteligente"
    description="Visualiza todos tus datos..."
    link="/docs/dashboard"
  />
  <!-- más cards -->
</div>

<style>
  .features-alt-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
</style>
```

---

## ✨ Agregar Nueva Animación (Slide + Bounce)

`src/styles/glassmorphism.css`:

```css
@keyframes slideInBounce {
  0% {
    opacity: 0;
    transform: translateX(-60px);
  }
  60% {
    opacity: 1;
    transform: translateX(10px);
  }
  80% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-bounce {
  animation: slideInBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
}

.slide-bounce.visible {
  animation-play-state: running;
}
```

### Usar en componente:

```astro
<div class="slide-bounce" style="animation-delay: 0.2s">
  Contenido con bounce
</div>
```

---

## 🔘 Crear Botón Personalizado

### Botón con efecto Glow + Icon

`src/styles/glass morphism.css`:

```css
.btn-glow-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--primary), var(--accent-purple));
  color: white;
  border: 2px solid var(--primary-light);
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;
}

.btn-glow-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3));
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-glow-icon:hover::before {
  width: 300px;
  height: 300px;
}

.btn-glow-icon:hover {
  box-shadow: 
    0 0 30px rgba(99, 102, 241, 0.5),
    0 0 60px rgba(168, 85, 247, 0.3),
    inset 0 0 20px rgba(255,255,255,0.1);
  transform: scale(1.05) translateY(-2px);
}

.btn-glow-icon:active {
  transform: scale(0.98);
}

.btn-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  animation: iconBounce 0.8s ease-in-out infinite;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

### HTML:

```html
<button class="btn-glow-icon">
  <span class="btn-icon">🚀</span>
  Comenzar ahora
</button>
```

---

## 📱 Agregar Sección Mobile-Only

### Componente de notificación mobile

`src/components/MobileNotif.astro`:

```astro
---
export interface Props {
  title: string;
  message: string;
  cta: string;
}

const { title, message, cta } = Astro.props;
---

<div class="mobile-notif glass">
  <div class="notif-icon">📌</div>
  <div class="notif-content">
    <h3 class="notif-title">{title}</h3>
    <p class="notif-message">{message}</p>
    <button class="notif-cta">{cta}</button>
  </div>
</div>

<style>
  .mobile-notif {
    display: none;  /* Hidden por defecto */
    padding: 1rem;
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 300px;
    z-index: 999;
  }
  
  /* Mostrar solo en mobile */
  @media (max-width: 768px) {
    .mobile-notif {
      display: flex;
      gap: 1rem;
      animation: slideUp 0.4s ease-out;
    }
  }
  
  .notif-icon {
    font-size: 1.5rem;
  }
  
  .notif-title {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  .notif-message {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
  }
  
  .notif-cta {
    width: 100%;
    padding: 0.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

---

## 🌙 Agregar Dark/Light Mode Toggle

`src/components/Header.astro` (modificar):

```astro
<div class="nav-actions">
  <button id="theme-toggle" class="btn btn-secondary" aria-label="Toggle theme">
    <span id="theme-icon">🌙</span>
  </button>
  <a href="#pricing" class="btn btn-primary">Comenzar ahora</a>
</div>

<script>
  const themeToggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;
  
  // Load saved theme
  const theme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', theme);
  icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    icon.textContent = next === 'dark' ? '🌙' : '☀️';
  });
</script>
```

`src/styles/glassmorphism.css` (agregar):

```css
/* Light mode colors */
[data-theme="light"] {
  --dark-bg: #ffffff;
  --dark-bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #475569;
}

/* Transición suave */
:root {
  transition: background-color 0.3s, color 0.3s;
}
```

---

## 📧 Agregar Formulario de Contacto

`src/components/ContactForm.astro`:

```astro
---
export interface Props {
  title?: string;
}

const { title = "Cuéntanos sobre tu proyecto" } = Astro.props;
---

<section class="contact-form-section glass">
  <h2>{title}</h2>
  
  <form id="contact-form" class="contact-form">
    <div class="form-group">
      <label for="name">Nombre</label>
      <input type="text" id="name" name="name" required />
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />
    </div>
    
    <div class="form-group">
      <label for="message">Mensaje</label>
      <textarea id="message" name="message" rows="4" required></textarea>
    </div>
    
    <button type="submit" class="btn btn-primary">Enviar</button>
  </form>
  
  <div id="form-message" class="form-message" style="display: none;"></div>
</section>

<style>
  .contact-form-section {
    padding: 3rem;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group label {
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .form-group input,
  .form-group textarea {
    padding: 0.75rem;
    background: var(--dark-bg-secondary);
    border: 1px solid var(--glass-light);
    border-radius: 8px;
    color: var(--text-primary);
    font-family: inherit;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
  }
  
  .form-message {
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
  
  .form-message.success {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }
  
  .form-message.error {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }
</style>

<script>
  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('form-message');
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      // Reemplaza con tu endpoint o servicio
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        messageDiv.textContent = '✅ Mensaje enviado correctamente!';
        messageDiv.className = 'form-message success';
        form.reset();
      } else {
        messageDiv.textContent = 'Error al enviar. Intenta de nuevo.';
        messageDiv.className = 'form-message error';
      }
    } catch (error) {
      messageDiv.textContent = 'Error de conexión.';
      messageDiv.className = 'form-message error';
    }
    
    messageDiv.style.display = 'block';
  });
</script>
```

---

## 🔗 Agregar Links de Redes Sociales

`src/components/Footer.astro` (modificar):

```astro
const socialLinks = [
  { icon: '𝕏', href: "https://twitter.com/yourbrand", label: "Twitter" },
  { icon: 'ʟɪ', href: "https://linkedin.com/company/yourbrand", label: "LinkedIn" },
  { icon: 'ᴳʰ', href: "https://github.com/yourbrand", label: "GitHub" },
  { icon: 'ɪɢ', href: "https://instagram.com/yourbrand", label: "Instagram" },
];
```

---

## 🎯 Performance Tips

### Lazy load sections

```astro
---
export interface Props {
  lazy?: boolean;
}

const { lazy = true } = Astro.props;
---

<section 
  class={lazy ? "lazy-load reveal" : "reveal"}
  data-lazy={lazy}
>
  <!-- Content -->
</section>

<script>
  document.querySelectorAll('[data-lazy]').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    
    observer.observe(el);
  });
</script>
```

---

**¡Usa estos ejemplos como base para tus propias customizaciones!** 🎨
