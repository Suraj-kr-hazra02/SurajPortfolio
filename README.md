<div align="center">

# 👨‍💻 Suraj Kr. Hazra — Premium Portfolio

**A high-end, responsive, and interactive personal portfolio built with Vanilla JS, HTML, CSS, Three.js, and Lenis.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=white)](#)
[![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)](#)

[View Live Demo](#) (Insert your live URL here)

---

</div>

## ✨ Key Features

This portfolio is packed with 15+ premium features designed to deliver a modern, deeply interactive user experience without relying on heavy frontend frameworks like React or Vue.

*   **🎬 Cinematic Loading Screen**: Smooth progress bar that fades into the primary experience.
*   **🔮 3D WebGL Hero**: Custom Three.js background with floating, rotating wireframe geometries and mouse-reactive parallax.
*   **🌊 Canvas Particle System**: Interactive background particles that respond dynamically to mouse movement via physics.
*   **🌙☀️ Theme Toggle**: One-click smooth transition between Dark and Light modes (persisted in `localStorage`).
*   **🪟 Liquid Glassmorphism UI**: High-end Apple-style frosted glass cards with specular highlights.
*   **📊 Live GitHub Activity**: Automatically fetches live data via the GitHub API (Stars, forks, followers).
*   **🃏 Dynamic Repo Cards**: Top repositories automatically sorted by stars and displayed with language-specific color dots.
*   **🥧 Language Donut Chart**: A custom-drawn JavaScript SVG chart mapping repository language utilization.
*   **📜 3D Certificates Tilt**: `perspective` CSS transforms driven by JS mouse coordinates to showcase achievements.
*   **🖱️ Magnetic Custom Cursor**: Outer ring and inner dot replacing the standard pointer, pulling magnetically to interactive elements.
*   **🎞️ Directional Scroll Animations**: Staggered `fade-up`, `fade-left`, and `fade-right` visual reveals.
*   **🌀 Physics Smooth Scroll**: Buttery scrolling physics powered by **Lenis**.

---

## 🛠️ Tech Stack

*   **Markup structure**: Semantic HTML5
*   **Styling**: Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Advanced Keyframe Animations)
*   **Logic / DOM Interaction**: Vanilla JavaScript (ESM)
*   **3D Rendering**: [Three.js](https://threejs.org/)
*   **Smooth Scrolling**: [Lenis](https://github.com/studio-freight/lenis)
*   **Tooling/Bundler**: [Vite](https://vitejs.dev/)

---

## 🚀 Local Development Setup

To run this project locally, ensure you have **Node.js** installed.

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Suraj-kr-hazra02/your-repo-name.git
   cd your-repo-name
   \`\`\`

2. **Install dependencies**
   We use Vite alongside Three.js and Lenis.
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Navigate to `http://localhost:5173` (or the port specified in your terminal).

4. **Build for Production**
   \`\`\`bash
   npm run build
   \`\`\`
   This will output the optimized static assets to the `dist/` folder, ready for deployment to Vercel, Netlify, or GitHub Pages.

---

## 📂 Project Structure

\`\`\`text
.
├── index.html        # Main markup, structured logically by section
├── package.json      # Dependencies and dev scripts (Vite, Three.js, Lenis)
├── public/           # Static uncompiled assets
└── src/
    ├── main.js       # Core logic, GitHub fetching, 3D Canvas, Particles
    └── style.css     # Premium design system, variables, glassmorphism UI
\`\`\`

---

## ⚙️ Updating Content

Updating the portfolio data is incredibly straightforward. All data is isolated at the very top of `src/main.js`. Simply modify the arrays to dynamically populate the site:

*   **`SKILLS`**: Array of objects (`name`, `icon`, `level`)
*   **`PROJECTS`**: Array of objects (`title`, `description`, `tags`, `image`, `github`, `live`)
*   **`EXPERIENCE` / `CERTIFICATES`**: Arrays defining timeline nodes and tilt-cards respectively.
*   **`GITHUB_USERNAME`**: Change this text variable to automatically point the Live Stats section to your own repositories!

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <i>Designed and Built by <b>Suraj Kr. Hazra</b></i> 🚀
</div>
