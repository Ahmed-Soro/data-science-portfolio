/* =========================================================
   AHMED SOROUR
   PORTFOLIO JAVASCRIPT
   PERFORMANCE OPTIMIZED
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =========================================================
       DOM ELEMENTS
    ========================================================= */

    const body = document.body;

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const navOverlay = document.getElementById("navOverlay");

    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");

    const preloader = document.getElementById("preloader");
    const typingText = document.getElementById("typingText");

    const header = document.querySelector(".header");

    let scrollTicking = false;


    /* =========================================================
       ANALYTICS
    ========================================================= */

    function trackEvent(eventName, parameters = {}) {

        if (typeof window.gtag === "function") {

            window.gtag("event", eventName, {
                ...parameters
            });

        }

    }


    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    function openMenu() {

        if (!navbar) return;

        navbar.classList.add("show");

        navOverlay?.classList.add("show");

        body.classList.add("no-scroll");

        menuBtn?.setAttribute(
            "aria-expanded",
            "true"
        );

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            }

        }

    }


    function closeMenu() {

        if (!navbar) return;

        navbar.classList.remove("show");

        navOverlay?.classList.remove("show");

        body.classList.remove("no-scroll");

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }

    }


    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navbar?.classList.contains("show");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        });

    }


    navOverlay?.addEventListener(
        "click",
        closeMenu
    );


    navbar?.querySelectorAll("a").forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navbar?.classList.contains("show")
        ) {

            closeMenu();

        }

    });


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navbar?.classList.contains("show")
            ) {

                closeMenu();

            }

        },
        {
            passive: true
        }
    );


    /* =========================================================
       THEME
    ========================================================= */

    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        const isLight =
            body.classList.contains("light");


        icon.classList.toggle(
            "fa-moon",
            !isLight
        );

        icon.classList.toggle(
            "fa-sun",
            isLight
        );


        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    }


    function loadTheme() {

        let savedTheme = null;

        try {

            savedTheme =
                localStorage.getItem(
                    "portfolio-theme"
                );

        } catch (error) {

            savedTheme = null;

        }


        if (savedTheme === "light") {

            body.classList.add("light");

        }


        updateThemeIcon();

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle("light");


                const theme =
                    body.classList.contains("light")
                        ? "light"
                        : "dark";


                try {

                    localStorage.setItem(
                        "portfolio-theme",
                        theme
                    );

                } catch (error) {

                    // Ignore storage errors

                }


                updateThemeIcon();


                trackEvent(
                    "theme_change",
                    {
                        theme: theme
                    }
                );

            }
        );

    }


    loadTheme();


    /* =========================================================
       PRELOADER
    ========================================================= */

    window.addEventListener(
        "load",
        () => {

            window.setTimeout(
                () => {

                    preloader?.classList.add(
                        "hide"
                    );

                },
                300
            );

        },
        {
            once: true
        }
    );


    /* =========================================================
       TYPING EFFECT
    ========================================================= */

    const words = [

        "Data Scientist",

        "AI Engineer",

        "Machine Learning Enthusiast",

        "Data Analyst",

        "AI Student"

    ];


    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;

    let typingTimer = null;


    function typeEffect() {

        if (!typingText) return;


        const currentWord =
            words[wordIndex];


        if (!deleting) {

            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex + 1
                );


            characterIndex++;


            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;


                typingTimer =
                    window.setTimeout(
                        typeEffect,
                        1600
                    );


                return;

            }

        } else {

            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex - 1
                );


            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;


                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }


        const speed =
            deleting
                ? 55
                : 95;


        typingTimer =
            window.setTimeout(
                typeEffect,
                speed
            );

    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        typingText &&
        !reducedMotion
    ) {

        typeEffect();

    } else if (typingText) {

        typingText.textContent =
            words[0];

    }


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (reducedMotion) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    } else if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {

                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -30px 0px"

                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================================================
       BACK TO TOP
    ========================================================= */

    function handleScrollUI() {

        if (!backToTop) return;


        const shouldShow =
            window.scrollY > 500;


        backToTop.classList.toggle(
            "show",
            shouldShow
        );

    }


    /* =========================================================
       ACTIVE NAVIGATION
    ========================================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveNav() {

        if (!sections.length) return;


        let currentSection =
            "home";


        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(
            section => {

                const top =
                    section.offsetTop;


                const height =
                    section.offsetHeight;


                if (
                    scrollPosition >= top &&
                    scrollPosition <
                    top + height
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "active",
                    href ===
                    `#${currentSection}`
                );

            }
        );

    }


    /* =========================================================
       OPTIMIZED SCROLL
    ========================================================= */

    function requestScrollUpdate() {

        if (scrollTicking) return;


        scrollTicking = true;


        window.requestAnimationFrame(
            () => {

                handleScrollUI();

                updateActiveNav();


                scrollTicking = false;

            }
        );

    }


    window.addEventListener(
        "scroll",
        requestScrollUpdate,
        {
            passive: true
        }
    );


    handleScrollUI();

    updateActiveNav();


    /* =========================================================
       BACK TO TOP CLICK
    ========================================================= */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"

                });


                trackEvent(
                    "back_to_top"
                );

            }
        );

    }


    /* =========================================================
       ANALYTICS DATA ATTRIBUTES
    ========================================================= */

    document
        .querySelectorAll(
            "[data-analytics]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    const eventName =
                        element.dataset.analytics;


                    const href =
                        element.getAttribute(
                            "href"
                        );


                    trackEvent(
                        eventName,
                        {

                            event_category:
                                "engagement",

                            event_label:
                                href ||
                                element.textContent.trim()

                        }
                    );

                }
            );

        });


    /* =========================================================
       EXTERNAL LINK TRACKING
    ========================================================= */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const href =
                        link.href;


                    if (
                        href.includes(
                            "github.com"
                        )
                    ) {

                        trackEvent(
                            "github_external_click",
                            {
                                link_url: href
                            }
                        );

                    }


                    if (
                        href.includes(
                            "linkedin.com"
                        )
                    ) {

                        trackEvent(
                            "linkedin_external_click",
                            {
                                link_url: href
                            }
                        );

                    }


                    if (
                        href.includes(
                            "drive.google.com"
                        )
                    ) {

                        trackEvent(
                            "cv_external_click",
                            {
                                link_url: href
                            }
                        );

                    }

                }
            );

        });


    /* =========================================================
       EMAIL TRACKING
    ========================================================= */

    document
        .querySelectorAll(
            'a[href^="mailto:"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "email_click",
                        {
                            email:
                                "sorour802@gmail.com"
                        }
                    );

                }
            );

        });


    /* =========================================================
       WHATSAPP TRACKING
    ========================================================= */

    document
        .querySelectorAll(
            'a[href*="wa.me"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "whatsapp_click",
                        {
                            platform:
                                "whatsapp"
                        }
                    );

                }
            );

        });


    /* =========================================================
       CV TRACKING
    ========================================================= */

    const cvButton =
        document.getElementById(
            "cvButton"
        );


    if (cvButton) {

        cvButton.addEventListener(
            "click",
            () => {

                trackEvent(
                    "cv_download",
                    {

                        file_type: "pdf",

                        source: "portfolio"

                    }
                );

            }
        );

    }


    /* =========================================================
       SMOOTH INTERNAL LINKS
    ========================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        });


    /* =========================================================
       HERO IMAGE ERROR
    ========================================================= */

    const heroImage =
        document.querySelector(
            ".image-wrapper img"
        );


    if (heroImage) {

        heroImage.addEventListener(
            "error",
            () => {

                heroImage.style.display =
                    "none";


                const wrapper =
                    heroImage.closest(
                        ".image-wrapper"
                    );


                if (wrapper) {

                    wrapper.classList.add(
                        "image-error"
                    );

                }

            },
            {
                once: true
            }
        );

    }


    /* =========================================================
       CURRENT YEAR
    ========================================================= */

    const yearElements =
        document.querySelectorAll(
            ".copyright"
        );


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(
        element => {

            const paragraph =
                element.querySelector(
                    "p"
                );


            if (paragraph) {

                paragraph.textContent =
                    `© ${currentYear} Ahmed Sorour. All Rights Reserved.`;

            }

        }
    );


    /* =========================================================
       CLEANUP
    ========================================================= */

    window.addEventListener(
        "pagehide",
        () => {

            if (typingTimer) {

                window.clearTimeout(
                    typingTimer
                );

            }

        },
        {
            once: true
        }
    );

});
