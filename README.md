# 🍎 Librería UI — Apple Inspired Components

<div align="center">

**Una colección de componentes UI modernos, reactivos y altamente animados, inspirados en la estética de Apple.**

[🚀 Ver Demo](https://libreria-ui.vercel.app/) · [🐛 Reportar Bug](../../issues) · [✨ Solicitar Feature](../../issues)

</div>

---

## ✨ Vista rápida

* **Diseño premium** con **Tailwind CSS**
* **Animaciones avanzadas** con **GSAP + ScrollTrigger** (parallax, timelines, fade-ins, control por scroll)
* **Video UX**: barra de progreso sincronizada, play/pause/replay, transiciones suaves
* **Totalmente responsivo** (mobile / tablet / desktop)
* **Clean Code**: separación de lógica, datos y vista

---

## 📖 Sobre el proyecto

**Librería UI** busca recrear una experiencia de usuario **fluida, premium y “product-page style”** como la de las landing pages de productos de alta gama.

Este repositorio está pensado para:

* Practicar y demostrar dominio de **animaciones complejas**
* Implementar **scroll-triggered storytelling**
* Optimizar el **manejo y reproducción de video** en React
* Mantener una base de código **modular y escalable**

---

## 🧩 Componentes incluidos

> Cada módulo es **independiente** y está listo para integrarse.

### 1) Hero & Highlights (`Highlights.jsx`)

* Animaciones de texto escalonadas
* Enlaces y microinteracciones

### 2) Carrusel de video (`VideoCarousel.jsx`)

Un slider con enfoque “Apple-like” que incluye:

* Estado de reproducción: **Play / Pause / Replay / End**
* **Barra de progreso dinámica** sincronizada con el tiempo real del video
* Transiciones suaves entre clips

### 3) Galería interactiva (`ApplePhotoGallery.jsx`)

* Carrusel horizontal con efecto **snap** para centrar elementos
* Animaciones de entrada en cascada
* Botones de navegación programáticos

### 4) Sección de arquitectura (`HowItWorks.jsx`)

* Zoom-in del chip **A17 Pro**
* Video dentro de un frame estilo dispositivo
* Fade-in de textos explicativos al hacer scroll

### 5) Historia y Features (`Features.jsx`)

* Sección narrativa con videos de fondo
* Textos que reaccionan al scroll

---

## 🛠️ Tecnologías

* **React 18**
* **GSAP** + **ScrollTrigger**
* **Tailwind CSS**
* **Vite**

---

## 🚀 Demo

👉 [https://libreria-ui.vercel.app/](https://libreria-ui.vercel.app/)

---

## ⚡ Instalación y uso

### Prerrequisitos

* **Node.js**: 16+ (recomendado 18+)
* **npm** o **yarn**

### Pasos

1. **Clona el repositorio**

```bash
git clone https://github.com/jscamposx/Libreria-UI.git
```

2. **Entra al proyecto**

```bash
cd Libreria-UI
```

3. **Instala dependencias**

```bash
npm install
# o
yarn
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
```

5. **Abre en tu navegador**

Normalmente: `http://localhost:5173`

---

## 📂 Estructura del proyecto

```txt
src/
├── assets/          # Imágenes y videos
├── components/      # Componentes reutilizables (VideoCarousel, etc.)
├── utils/           # Utilidades y constantes de animación
├── App.jsx          # Componente raíz
└── main.jsx         # Punto de entrada
```

---

## ✅ Buenas prácticas incluidas

* Componentes **reutilizables** y **componibles**
* Animaciones encapsuladas (helpers/constantes en `utils/`)
* Enfoque en **rendimiento** (animaciones fluidas, scroll controlado)
* UI pensada para **interacción real** (estado + feedback visual)

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas!

1. Haz un **Fork** del proyecto
2. Crea tu rama:

```bash
git checkout -b feature/NuevaAnimacion
```

3. Haz commit:

```bash
git commit -m "Agrega nueva sección"
```

4. Haz push:

```bash
git push origin feature/NuevaAnimacion
```

5. Abre un **Pull Request**

---

<div align="center">

Hecho con ❤️ por **[jscamposx](https://github.com/jscamposx)**

</div>
