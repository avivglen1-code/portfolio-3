/* ============================================
   GLEN AVIV PORTFOLIO - script.js
   Three.js + GSAP Animations
   ============================================ */

"use strict";

// ===== LOADING SCREEN =====
const loaderBar = document.getElementById("loader-bar");
const loaderPct = document.getElementById("loader-pct");
const loadingScreen = document.getElementById("loading-screen");

let progress = 0;
const loadInterval = setInterval(() => {
  progress += Math.random() * 8 + 2;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    loaderBar.style.width = "100%";
    loaderPct.textContent = "100%";
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => { loadingScreen.style.display = "none"; initAnimations(); }, 600);
    }, 300);
  }
  loaderBar.style.width = Math.min(progress, 100) + "%";
  loaderPct.textContent = Math.min(Math.round(progress), 100) + "%";
}, 80);

// ===== THREE.JS PARTICLES =====
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas || !window.THREE) return;
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color(0x00d4ff), c2 = new THREE.Color(0x7c3aed), c3 = new THREE.Color(0x00ff88);

    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random()-.5)*200;
      positions[i*3+1] = (Math.random()-.5)*200;
      positions[i*3+2] = (Math.random()-.5)*200;
      const r = Math.random(), c = r<.4?c1:r<.7?c2:c3;
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions,3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,3));
    const mat = new THREE.PointsMaterial({ size:.6, vertexColors:true, transparent:true, opacity:.8, blending:THREE.AdditiveBlending, depthWrite:false });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    let mx=0, my=0;
    window.addEventListener("mousemove", e => {
      mx = (e.clientX/window.innerWidth-.5)*.3;
      my = (e.clientY/window.innerHeight-.5)*.3;
    });
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    (function tick() {
      requestAnimationFrame(tick);
      const t = Date.now()*.0001;
      pts.rotation.y = t*.5+mx;
      pts.rotation.x = t*.2+my;
      renderer.render(scene, camera);
    })();
  } catch(e) { console.warn("WebGL unavailable, skipping particle canvas.", e); }
}

// ===== MAIN ANIMATIONS =====
function initAnimations() {
  initParticles();

  // GSAP ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Navbar
    ScrollTrigger.create({
      start: "top -50",
      onUpdate(self) { document.getElementById("navbar").classList.toggle("scrolled", self.scroll() > 50); }
    });
  }

  // Reveal elements on scroll
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || "0");
        setTimeout(() => e.target.classList.add("revealed"), delay);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  // Stat counters
  const statNums = document.querySelectorAll(".stat-num");
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target);
        let val = 0;
        const step = target / 50;
        const iv = setInterval(() => {
          val += step;
          if (val >= target) { val = target; clearInterval(iv); }
          e.target.textContent = Math.floor(val);
        }, 30);
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObs.observe(el));

  // Skill bars
  const skillBars = document.querySelectorAll(".skill-bar");
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const level = e.target.dataset.level;
        setTimeout(() => e.target.style.width = level + "%", 200);
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(el => barObs.observe(el));
}

// ===== TYPING EFFECT =====
const roles = ["Full Stack Web Developer","AI Specialist","Data Analyst","Digital Marketing Expert","Computer & Geography Teacher"];
let ri = 0, ci = 0, deleting = false;
const typingEl = document.getElementById("typing-text");

function type() {
  const cur = roles[ri];
  if (!deleting) {
    typingEl.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    typingEl.textContent = cur.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri+1) % roles.length; }
  }
  setTimeout(type, deleting ? 40 : 80);
}
setTimeout(type, 2000);

// ===== NAVBAR =====
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  document.getElementById("back-top").classList.toggle("visible", window.scrollY > 400);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

document.querySelectorAll("#nav-links a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

// ===== THEME TOGGLE =====
let isDark = true;
document.getElementById("theme-btn").addEventListener("click", () => {
  isDark = !isDark;
  document.body.classList.toggle("light", !isDark);
  document.getElementById("theme-btn").innerHTML = isDark ? "&#9728;" : "&#9711;";
});

// ===== MOUSE GLOW =====
const glow = document.getElementById("mouse-glow");
window.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ===== BACK TO TOP =====
document.getElementById("back-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== SMOOTH SCROLL for hero buttons =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== CONTACT FORM =====
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const success = document.getElementById("form-success");
  success.classList.add("visible");
  e.target.reset();
  setTimeout(() => success.classList.remove("visible"), 4000);
});

// ===== MUSIC TOGGLE (visual only) =====
let musicPlaying = false;
document.getElementById("music-btn").addEventListener("click", () => {
  musicPlaying = !musicPlaying;
  const btn = document.getElementById("music-btn");
  const icon = document.getElementById("music-icon");
  btn.classList.toggle("playing", musicPlaying);
  icon.className = musicPlaying ? "fas fa-pause" : "fas fa-music";
});

// ===== FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();
