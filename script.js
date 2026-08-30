/* =========================================================
   AHMED SOROUR
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body =
        document.body;

    const menuBtn =
        document.getElementById("menuBtn");

    const navbar =
        document.getElementById("navbar");

    const navOverlay =
        document.getElementById("navOverlay");

    const themeToggle =
        document.getElementById("themeToggle");

    const backToTop =
        document.getElementById("backToTop");

    const preloader =
        document.getElementById("preloader");

    const typingText =
        document.getElementById("typingText");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function openMenu() {

        if (!navbar) return;

        navbar.classList.add("show");

        if (navOverlay) {
            navOverlay.classList.add("show");
        }

        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );

            const icon =
                menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

        }

        body.classList.add(
            "no-scroll"
        );

    }


    function closeMenu() {

        if (!navbar) return;

        navbar.classList.remove("show");

        if (navOverlay) {
            navOverlay.classList.remove("show");
        }

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

        body.classList.remove(
            "no-scroll"
        );

    }


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    navbar &&
                    navbar.classList.contains("show");

                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    if (navOverlay) {

        navOverlay.addEventListener(
            "click",
            closeMenu
        );

    }


    if (navbar) {

        navbar
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       CLOSE MENU ON DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       THEME
    ===================================================== */

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

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );

        if (savedTheme === "light") {

            body.classList.add(
                "light"
            );

        }

        updateThemeIcon();

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "light"
                );

                const theme =
                    body.classList.contains("light")
                        ? "light"
                        : "dark";

                localStorage.setItem(
                    "portfolio-theme",
                    theme
                );

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


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            window.setTimeout(
                () => {

                    if (preloader) {

                        preloader.classList.add(
                            "hide"
                        );

                    }

                },
                450
            );

        }
    );


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

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

                setTimeout(
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

            if (
                characterIndex === 0
            ) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1)
                    % words.length;

            }

        }


        const speed =
            deleting
                ? 55
                : 95;

        setTimeout(
            typeEffect,
            speed
        );

    }


    typeEffect();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
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
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
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


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleScroll() {

        if (!backToTop) return;

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    handleScroll();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

                trackEvent(
                    "back_to_top"
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveNav() {

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
                    link.getAttribute("href");


                link.classList.toggle(
                    "active",
                    href ===
                    `#${currentSection}`
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );


    updateActiveNav();


    /* =====================================================
       GOOGLE ANALYTICS
    ===================================================== */

    function trackEvent(
        eventName,
        parameters = {}
    ) {

        if (
            typeof window.gtag ===
            "function"
        ) {

            window.gtag(
                "event",
                eventName,
                {
                    ...parameters
                }
            );

        }

    }


    document
        .querySelectorAll(
            "[data-analytics]"
        )
        .forEach(
            element => {

                element.addEventListener(
                    "click",
                    () => {

                        const eventName =
                            element.dataset.analytics;


                        const href =
                            element.getAttribute("href");


                        trackEvent(
                            eventName,
                            {

                                event_category:
                                    "engagement",

                                event_label:
                                    href ||
                                    element.textContent
                                        .trim()

                            }
                        );

                    }
                );

            }
        );


    /* =====================================================
       EXTERNAL LINK TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(
            link => {

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

            }
        );


    /* =====================================================
       EMAIL TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="mailto:"]'
        )
        .forEach(
            link => {

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

            }
        );


    /* =====================================================
       WHATSAPP TRACKING
    ===================================================== */

    document
        .querySelectorAll(
            'a[href*="wa.me"]'
        )
        .forEach(
            link => {

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

            }
        );


    /* =====================================================
       CV TRACKING
    ===================================================== */

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


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link
                                .getAttribute("href");


                        if (
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {

                            return;

                        }


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
                            target.offsetTop -
                            headerHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

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

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".copyright"
        );


    yearElements.forEach(
        element => {

            const paragraph =
                element.querySelector("p");


            if (paragraph) {

                paragraph.textContent =
                    `© ${new Date().getFullYear()} Ahmed Sorour. All Rights Reserved.`;

            }

        }
    );


});
