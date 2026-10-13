/* =========================================================
   AHMED SOROUR PORTFOLIO
   Theme, mobile menu, typing roles, active navigation,
   smooth anchors, back to top, copy email and analytics events.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const root = document.documentElement;
    const body = document.body;
    const header = document.getElementById("header");
    const navbar = document.getElementById("navbar");
    const navOverlay = document.getElementById("navOverlay");
    const menuBtn = document.getElementById("menuBtn");
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const typingText = document.getElementById("typingText");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ---------- Analytics ---------- */

    function trackEvent(name, params) {
        if (typeof window.gtag === "function") {
            window.gtag("event", name, params || {});
        }
    }

    document.querySelectorAll("[data-analytics]").forEach(el => {
        el.addEventListener("click", () => {
            trackEvent(el.dataset.analytics, {
                event_category: "engagement",
                event_label: el.getAttribute("href") || el.textContent.trim()
            });
        });
    });


    /* ---------- Theme (saved as "portfolio-theme": light or dark) ---------- */

    function currentTheme() {
        const set = root.getAttribute("data-theme");
        if (set) return set;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function updateThemeButton() {
        if (!themeToggle) return;
        const next = currentTheme() === "dark" ? "light" : "dark";
        themeToggle.textContent = next === "light" ? "Light" : "Dark";
        themeToggle.setAttribute("aria-label", "Switch to " + next + " mode");
    }

    try {
        const saved = localStorage.getItem("portfolio-theme");
        if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
    } catch (error) { /* storage unavailable */ }

    updateThemeButton();

    themeToggle?.addEventListener("click", () => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("portfolio-theme", next); } catch (error) { /* ignore */ }
        updateThemeButton();
        trackEvent("theme_change", { theme: next });
    });


    /* ---------- Mobile menu ---------- */

    function setMenu(open) {
        navbar?.classList.toggle("show", open);
        navOverlay?.classList.toggle("show", open);
        body.classList.toggle("no-scroll", open);
        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", String(open));
            menuBtn.textContent = open ? "Close" : "Menu";
        }
    }

    menuBtn?.addEventListener("click", () => setMenu(!navbar.classList.contains("show")));
    navOverlay?.addEventListener("click", () => setMenu(false));
    navbar?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && navbar?.classList.contains("show")) setMenu(false);
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900 && navbar?.classList.contains("show")) setMenu(false);
    }, { passive: true });


    /* ---------- Typing roles ---------- */

    const words = [
        "Agentic AI Engineer",
        "AI Engineer",
        "Data Scientist",
        "Machine Learning Enthusiast",
        "AI Student"
    ];
    let wordIndex = 0, charIndex = 0, deleting = false;

    function typeEffect() {
        if (!typingText) return;
        const word = words[wordIndex];

        if (!deleting) {
            charIndex++;
            typingText.textContent = word.substring(0, charIndex);
            if (charIndex === word.length) {
                deleting = true;
                window.setTimeout(typeEffect, 1600);
                return;
            }
        } else {
            charIndex--;
            typingText.textContent = word.substring(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        window.setTimeout(typeEffect, deleting ? 55 : 95);
    }

    if (typingText && !reducedMotion) {
        typingText.textContent = "";
        typeEffect();
    }


    /* ---------- Active navigation and back to top ---------- */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    let ticking = false;

    function updateScrollUI() {
        backToTop?.classList.toggle("show", window.scrollY > 500);

        let current = "home";
        const position = window.scrollY + 160;
        sections.forEach(section => {
            if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    }

    window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            updateScrollUI();
            ticking = false;
        });
    }, { passive: true });

    updateScrollUI();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        trackEvent("back_to_top");
    });


    /* ---------- Smooth internal links ---------- */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            const offset = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset + (id === "#home" ? 0 : 1);
            window.scrollTo({ top: id === "#home" ? 0 : top, behavior: reducedMotion ? "auto" : "smooth" });
        });
    });


    /* ---------- Copy email ---------- */

    const copyBtn = document.getElementById("copy");
    const mail = document.getElementById("mail");

    copyBtn?.addEventListener("click", () => {
        function done(text) {
            copyBtn.textContent = text;
            window.setTimeout(() => { copyBtn.textContent = "Copy email"; }, 1800);
        }
        function select() {
            const range = document.createRange();
            range.selectNodeContents(mail);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            done("Press Ctrl+C");
        }
        try {
            navigator.clipboard.writeText(mail.textContent).then(() => done("Copied"), select);
        } catch (error) {
            select();
        }
        trackEvent("email_copy");
    });


    /* ---------- Project screenshots (images/projects/*.png) ---------- */

    document.querySelectorAll(".stage[data-shot]").forEach(stage => {
        const img = stage.querySelector(".shot");
        if (!img) return;
        const probe = new Image();
        probe.onload = () => {
            img.src = probe.src;
            img.hidden = false;
            stage.classList.add("has-shot");
        };
        probe.src = stage.dataset.shot;
    });


    /* ---------- Photo fallback and current year ---------- */

    const photo = document.querySelector(".photo img");
    photo?.addEventListener("error", () => { photo.style.display = "none"; }, { once: true });

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
});
