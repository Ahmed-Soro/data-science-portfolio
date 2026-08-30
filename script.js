```javascript
/* =========================================================
   AHMED SOROUR — DATA SCIENCE & AI PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const preloader = document.getElementById("preloader");
    const backToTop = document.getElementById("backToTop");
    const typingText = document.getElementById("typingText");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    /* =====================================================
       GOOGLE ANALYTICS HELPER
    ===================================================== */

    function trackEvent(eventName, parameters = {}) {

        if (typeof window.gtag === "function") {

            window.gtag("event", eventName, {
                ...parameters
            });

        }

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!navbar || !menuBtn) return;

        navbar.classList.remove("show");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

        body.classList.remove("no-scroll");

    }


    function openMobileMenu() {

        if (!navbar || !menuBtn) return;

        navbar.classList.add("show");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        }

        body.classList.add("no-scroll");

    }


    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navbar.classList.contains("show");

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* =====================================================
       THEME SYSTEM
    ===================================================== */

    function updateThemeIcon(isLight) {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        if (isLight) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    }


    function applyTheme(theme) {

        const isLight = theme === "light";

        body.classList.toggle(
            "light",
            isLight
        );

        updateThemeIcon(isLight);

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isCurrentlyLight =
                body.classList.contains("light");

            const newTheme =
                isCurrentlyLight
                    ? "dark"
                    : "light";

            applyTheme(newTheme);

            trackEvent(
                "theme_toggle",
                {
                    event_category: "engagement",
                    event_label: newTheme
                }
            );

        });

    }


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (savedTheme === "light") {

        applyTheme("light");

    } else {

        applyTheme("dark");

    }


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {

                preloader.classList.add("hide");

            }

        }, 500);

    });


    /* =====================================================
       TYPING ANIMATION
    ===================================================== */

    if (typingText) {

        const typingWords = [
            "Data Scientist",
            "AI Engineer",
            "Machine Learning Student",
            "Data Analyst",
            "Python Developer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;

        let isDeleting = false;

        const typingSpeed = 100;
        const deletingSpeed = 60;
        const pauseAfterWord = 1500;


        function typeEffect() {

            const currentWord =
                typingWords[wordIndex];


            if (!isDeleting) {

                characterIndex++;

            } else {

                characterIndex--;

            }


            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            let speed =
                isDeleting
                    ? deletingSpeed
                    : typingSpeed;


            if (
                !isDeleting &&
                characterIndex === currentWord.length
            ) {

                speed = pauseAfterWord;

                isDeleting = true;

            }


            else if (
                isDeleting &&
                characterIndex === 0
            ) {

                isDeleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    typingWords.length;

                speed = 400;

            }


            setTimeout(
                typeEffect,
                speed
            );

        }


        typeEffect();

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            trackEvent(
                "back_to_top",
                {
                    event_category: "navigation"
                }
            );

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

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


                if (!target) return;


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });


                trackEvent(
                    "navigation_click",
                    {
                        event_category: "navigation",
                        event_label: targetId
                    }
                );

            });

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

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

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       SKILL ANIMATION
    ===================================================== */

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );


    if (
        "IntersectionObserver" in window &&
        skillCards.length > 0
    ) {

        const skillObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            skillObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );


        skillCards.forEach(card => {

            skillObserver.observe(card);

        });

    } else {

        skillCards.forEach(card => {

            card.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const linkTarget =
                link.getAttribute(
                    "href"
                );


            if (
                linkTarget ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       ANALYTICS TRACKING
    ===================================================== */

    const analyticsElements =
        document.querySelectorAll(
            "[data-analytics]"
        );


    analyticsElements.forEach(element => {

        element.addEventListener(
            "click",
            () => {

                const eventName =
                    element.dataset.analytics;


                const href =
                    element.getAttribute(
                        "href"
                    );


                const label =
                    element.textContent
                        .trim()
                        .replace(/\s+/g, " ");


                trackEvent(
                    eventName,
                    {

                        event_category:
                            "engagement",

                        event_label:
                            href || label,

                        link_url:
                            href || "",

                        transport_type:
                            "beacon"

                    }
                );

            }
        );

    });


    /* =====================================================
       SPECIFIC TRACKING
    ===================================================== */


    /* CV */

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

                        event_category:
                            "conversion",

                        event_label:
                            "CV Download",

                        link_url:
                            cvButton.href

                    }
                );

            }
        );

    }


    /* =====================================================
       GITHUB TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            '[data-analytics="github_click"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "github_click",
                        {

                            event_category:
                                "social",

                            event_label:
                                "GitHub Profile",

                            link_url:
                                link.href

                        }
                    );

                }
            );

        });


    /* =====================================================
       LINKEDIN TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            '[data-analytics="linkedin_click"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "linkedin_click",
                        {

                            event_category:
                                "social",

                            event_label:
                                "LinkedIn Profile",

                            link_url:
                                link.href

                        }
                    );

                }
            );

        });


    /* =====================================================
       WHATSAPP TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            '[data-analytics="whatsapp_click"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "whatsapp_click",
                        {

                            event_category:
                                "contact",

                            event_label:
                                "WhatsApp Contact",

                            link_url:
                                link.href

                        }
                    );

                }
            );

        });


    /* =====================================================
       EMAIL TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            '[data-analytics="email_click"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    trackEvent(
                        "email_click",
                        {

                            event_category:
                                "contact",

                            event_label:
                                "Email Contact",

                            link_url:
                                link.href

                        }
                    );

                }
            );

        });


    /* =====================================================
       PROJECT TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            ".project-link"
        )
        .forEach(projectLink => {

            projectLink.addEventListener(
                "click",
                () => {

                    const projectCard =
                        projectLink.closest(
                            ".project-card"
                        );


                    const projectTitle =
                        projectCard
                            ? projectCard
                                .querySelector("h3")
                                ?.textContent
                                .trim()
                            : "Unknown Project";


                    trackEvent(
                        "project_click",
                        {

                            event_category:
                                "projects",

                            event_label:
                                projectTitle,

                            link_url:
                                projectLink.href

                        }
                    );

                }
            );

        });


    /* =====================================================
       EXTERNAL LINK TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (!href) return;


                    let destination =
                        "external_link";


                    if (
                        href.includes(
                            "github.com"
                        )
                    ) {

                        destination =
                            "github";

                    }

                    else if (
                        href.includes(
                            "linkedin.com"
                        )
                    ) {

                        destination =
                            "linkedin";

                    }

                    else if (
                        href.includes(
                            "wa.me"
                        )
                    ) {

                        destination =
                            "whatsapp";

                    }

                    else if (
                        href.includes(
                            "drive.google.com"
                        )
                    ) {

                        destination =
                            "google_drive";

                    }


                    trackEvent(
                        "external_link_click",
                        {

                            event_category:
                                "external",

                            event_label:
                                destination,

                            link_url:
                                href

                        }
                    );

                }
            );

        });


    /* =====================================================
       PAGE VIEW / PORTFOLIO VISIT
    ===================================================== */

    trackEvent(
        "portfolio_visit",
        {

            event_category:
                "engagement",

            event_label:
                "Ahmed Sorour Portfolio"

        }
    );


    /* =====================================================
       CONSOLE INFORMATION
    ===================================================== */

    console.log(
        "%cAhmed Sorour Portfolio",
        "font-size: 20px; font-weight: bold;"
    );

    console.log(
        "Data Science & Artificial Intelligence"
    );

    console.log(
        "Capital University — Faculty of Computer Science"
    );

    console.log(
        "Major: Artificial Intelligence"
    );


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    handleBackToTop();
    updateActiveNavigation();

});
```
