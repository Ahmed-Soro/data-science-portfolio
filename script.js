```javascript
/* =====================================================
   AHMED SOROUR PORTFOLIO
   PROFESSIONAL JAVASCRIPT
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const preloader = document.getElementById("preloader");

    const menuBtn = document.getElementById("menuBtn");

    const navbar = document.getElementById("navbar");

    const themeToggle =
        document.getElementById("themeToggle");

    const backToTop =
        document.getElementById("backToTop");

    const typingText =
        document.getElementById("typingText");

    const header =
        document.querySelector(".header");


    /* =================================================
       PRELOADER
    ================================================= */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {

                preloader.classList.add("hide");

            }

        }, 500);

    });


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navbar.classList.toggle("show");

            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon =
                menuBtn.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        });


        navbar
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navbar.classList.remove("show");

                    document.body.classList.remove(
                        "no-scroll"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuBtn.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                });

            });

    }


    /* =================================================
       DARK / LIGHT MODE
    ================================================= */

    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        const isLight =
            document.body.classList.contains("light");

        icon.classList.toggle(
            "fa-moon",
            !isLight
        );

        icon.classList.toggle(
            "fa-sun",
            isLight
        );

    }


    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light");

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light"
                );

                const currentTheme =
                    document.body.classList.contains("light")
                        ? "light"
                        : "dark";

                localStorage.setItem(
                    "portfolio-theme",
                    currentTheme
                );

                updateThemeIcon();

            }
        );

    }


    /* =================================================
       TYPING ANIMATION
    ================================================= */

    if (typingText) {

        const words = [
            "AI Student",
            "Data Science Learner",
            "Machine Learning Enthusiast",
            "AI Enthusiast",
            "Python Developer"
        ];

        let wordIndex = 0;

        let charIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;


                if (
                    charIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1800
                    );

                    return;

                }

            } else {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;


                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 55 : 90
            );

        }


        typeEffect();

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveNav() {

        let current = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =================================================
       STAGGER ANIMATIONS
    ================================================= */

    const skillCards =
        document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 60}ms`;

    });


    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

    });


    /* =================================================
       HEADER SHADOW
    ================================================= */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.15)";

        } else {

            header.style.boxShadow =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =================================================
       BACK TO TOP
    ================================================= */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =================================================
       GOOGLE ANALYTICS EVENTS
    ================================================= */

    document
        .querySelectorAll("[data-analytics]")
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    const eventName =
                        element.dataset.analytics;


                    if (
                        typeof window.gtag ===
                        "function"
                    ) {

                        window.gtag(
                            "event",
                            eventName,
                            {

                                event_category:
                                    "engagement",

                                event_label:
                                    element.getAttribute(
                                        "href"
                                    ) ||
                                    element.textContent
                                        .trim(),

                                transport_type:
                                    "beacon"

                            }
                        );

                    }

                }
            );

        });


    /* =================================================
       PROJECT LINK FEEDBACK
    ================================================= */

    document
        .querySelectorAll(".project-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    link.classList.add(
                        "clicked"
                    );

                    setTimeout(() => {

                        link.classList.remove(
                            "clicked"
                        );

                    }, 500);

                }
            );

        });


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navbar &&
                navbar.classList.contains("show")
            ) {

                navbar.classList.remove(
                    "show"
                );

                document.body.classList.remove(
                    "no-scroll"
                );


                if (menuBtn) {

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuBtn.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =================================================
       INTERNAL SMOOTH LINKS
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


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


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });

});
```
