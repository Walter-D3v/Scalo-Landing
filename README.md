# 🚀 Scalo Landing Page

Una landing page premium, ultra-rápida y orientada a la conversión para **Scalo** (Business Intelligence de Próxima Generación). Construida con las tecnologías web modernas para garantizar el mejor rendimiento, SEO y experiencia de usuario.

![Scalo Tech Stack](https://img.shields.io/badge/Astro-0C0E14?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

---

## ✨ Características Principales

*   **Arquitectura de Islas (Content Island):** Uso de Astro para renderizado estático y React para componentes interactivos (optimizando la carga).
*   **Diseño Premium (Glassmorphism):** Estética moderna, fondos difuminados, bordes elegantes y luces de neón adaptadas a la paleta de Scalo (Electric Purple, Sky Blue).
*   **Rendimiento Extremo:** Carga en milisegundos gracias a la arquitectura sin JavaScript por defecto de Astro.
*   **Blog Integrado (SSR):** Páginas dinámicas para contenido de blog generado del lado del servidor.
*   **Animaciones Avanzadas:** Lenis Smooth Scroll, contadores animados y fondos interactivos (`Grainient`).

---

## 🛠️ Requisitos Previos

Necesitarás tener instalado [Bun](https://bun.sh/) en tu sistema operativo, ya que utilizamos Bun como gestor de paquetes para mayor velocidad.

```bash
# Si no tienes bun instalado (Mac/Linux):
curl -fsSL https://bun.sh/install | bash

# Para Windows (Powershell):
powershell -c "irm bun.sh/install.ps1 | iex"
```

---

## 🚀 Instalación y Montaje Local

Sigue estos sencillos pasos para levantar el proyecto en tu entorno local:

1. **Instalar las dependencias:**
   ```bash
   bun install
   ```

2. **Levantar el servidor de desarrollo:**
   ```bash
   bun run dev
   ```

   El servidor se iniciará y podrás ver la aplicación en tu navegador abriendo [http://localhost:4321](http://localhost:4321).

---

## 📦 Construcción para Producción

Cuando estés listo para desplegar el proyecto o quieras probar la versión final optimizada:

1. **Construir el proyecto:**
   ```bash
   bun run build
   ```
   *Esto generará los archivos optimizados dentro del directorio `dist/`.*

2. **Previsualizar la construcción (opcional):**
   ```bash
   bun run preview
   ```
   *Esto levanta un servidor local simulando el entorno de producción.*

---

## 📂 Estructura del Proyecto

```text
/
├── public/                 # Assets estáticos (favicon, logos, imágenes)
├── src/
│   ├── components/         # Componentes de UI (Astro y React)
│   │   └── react/          # Componentes interactivos en React (.tsx)
│   ├── layouts/            # Plantillas base (Layout.astro)
│   ├── lib/                # Utilidades y configuración lógica
│   ├── pages/              # Rutas de la aplicación (index.astro, blog/)
│   └── styles/             # Hojas de estilo (global.css, glassmorphism.css)
├── .env                    # Variables de entorno
├── astro.config.mjs        # Configuración de Astro
├── package.json            # Dependencias del proyecto
└── bun.lock                # Archivo de bloqueo de Bun
```

---

## ⚙️ Configuración (.env) y Content Island

El proyecto utiliza **Content Island** (como Headless CMS) para manejar el contenido del blog y los testimonios de forma dinámica. Para que el sitio recupere la data correctamente, debes configurar las variables de entorno.

1. **Configurar archivo `.env`:**
   Asegúrate de tener un archivo `.env` en la raíz del proyecto con tu Access Token de Content Island:
   ```env
   # Content Island
   CONTENT_ISLAND_TOKEN=tu_token_aqui
   ```

2. **Modelos Requeridos en Content Island:**
   Asegúrate de que en tu proyecto de Content Island existan los siguientes *Content Types* (ver `src/lib/content-island.ts`):
   * **`Post`**: Para los artículos del blog. (Campos clave: `title`, `slug`, `excerpt`, `Body_content`, `CoverImage`, `PublishedAt`, `featured`).
   * **`opinion`**: Para los testimonios. (Campos clave: `name`, `avatar`, `content`, `source`, `ranking`).

---

## 🎨 Guía de Estilos y Adaptación

Si necesitas modificar colores o tipografía basándote en el Brand Book:
*   **Colores y Tipografía Globales:** Se configuran en `src/styles/global.css` (variables `@theme` de Tailwind).
*   **Estilos Glassmorphism:** Se configuran en `src/styles/glassmorphism.css`.
*   **Fuente:** Utilizamos la tipografía `Outfit` cargada directamente en `src/layouts/Layout.astro`.

---

## 🚢 Despliegue (Deployment)

El proyecto está preparado para ser desplegado fácilmente en **Vercel**, **Netlify**, **Cloudflare Pages** o cualquier servidor estático/Node.js.

### Despliegue en Vercel (Recomendado):
1. Instala el CLI de Vercel: `bun install -g vercel`
2. Ejecuta: `vercel` y sigue las instrucciones para vincular el proyecto.
3. Para desplegar en producción, ejecuta: `vercel --prod`

*Asegúrate de configurar cualquier variable de entorno requerida en tu plataforma de hosting.*
