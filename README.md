# Glen Aviv — Portfolio Website

A **dark futuristic** developer & educator portfolio with Three.js 3D backgrounds,
GSAP animations, typing effects, neon glassmorphism UI, and full responsiveness.

---

## 📁 File Structure

```
glen-aviv-portfolio/
├── index.html        ← Main HTML (all sections)
├── style.css         ← All styles, animations, responsive design
├── script.js         ← Three.js, GSAP, typing, interactivity
├── assets/
│   └── (place your profile photo here as photo.jpg)
└── README.md
```

---

## 🚀 Quick Start

1. **Unzip** the folder anywhere on your computer.
2. **Open** `index.html` in a modern browser (Chrome, Firefox, Edge).
3. No server required — it runs entirely in the browser.

> For best results, use Chrome or Edge for WebGL/Three.js performance.

---

## 📸 Adding Your Photo

**Option A — Upload button (easiest):**
- Click the camera icon on the profile circle in the hero section
- Select your photo — it appears instantly (session only)

**Option B — Permanent (recommended):**
1. Save your photo as `assets/photo.jpg`
2. In `index.html`, find `<img id="profilePhoto" src="" ...>`
3. Change `src=""` to `src="assets/photo.jpg"`

---

## ✏️ Customisation Guide

### Update contact info
In `index.html`, search for `avivglen1@gmail.com` and `0792268971` — replace everywhere.

### Update social media links
Search for `class="social-btn"` — replace `href="#"` with your actual URLs.

### Add real projects
Find `<!-- ========== PROJECTS SECTION ========== -->` in `index.html`.
Replace placeholder images by adding `<img>` tags inside `.project-img` divs,
or set a CSS `background-image` on `.project-img`.

### Add downloadable CV
1. Place your CV file as `assets/glen-aviv-cv.pdf`
2. Search `href="#"` on the `.btn-cv` and `.btn-outline` download buttons
3. Change to `href="assets/glen-aviv-cv.pdf"`

### Update statistics
Search for `data-target="50"`, `data-target="500"`, etc. in `index.html` and
change numbers to match your real stats.

---

## 🎨 Design Tokens (easy theming)

Open `style.css` and edit the `:root` block at the top:

```css
:root {
  --cyan:   #00d2ff;   /* Primary accent — change to any color */
  --purple: #9b59f5;   /* Secondary accent */
  --bg-primary: #050a14;  /* Main background */
}
```

---

## 🔧 Features

| Feature | Detail |
|---|---|
| **3D Background** | Three.js particle field + floating geometries |
| **Typing Effect** | Rotates through all your roles automatically |
| **Skill Bars** | Animate on scroll-into-view |
| **Project Filter** | Filter by Web / AI / Education / Data |
| **Stats Counter** | Counts up when scrolled into view |
| **AI Dashboard** | Live activity log, bar chart, donut chart |
| **Contact Form** | Validated, with simulated send (hook up EmailJS/Formspree) |
| **Music Toggle** | Web Audio API ambient synth drone |
| **Theme Toggle** | Dark ↔ Light, saved to localStorage |
| **Mouse Trail** | Coloured particle trail follows cursor |
| **Photo Upload** | Click camera icon to preview your photo |
| **Responsive** | Desktop → Tablet → Mobile fully adapted |
| **Back to Top** | Appears after scrolling 400px |

---

## 📧 Hooking up the Contact Form

Replace the `setTimeout` simulation in `script.js` (section 11) with EmailJS:

```js
emailjs.send('YOUR_SERVICE', 'YOUR_TEMPLATE', {
  from_name:  form.name.value,
  from_email: form.email.value,
  message:    form.message.value,
}).then(() => { /* success */ });
```

Or use **Formspree**: set `action="https://formspree.io/f/YOUR_ID"` on `<form>`.

---

## 📄 License
Free to use and customise for Glen Aviv's personal portfolio.
