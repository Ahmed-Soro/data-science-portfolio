/* =====================================================
AHMED SOROUR PORTFOLIO
JAVASCRIPT
===================================================== */

"use strict";

/* ================= PRELOADER ================= */

window.addEventListener("load", function () {

```
const preloader =
    document.getElementById("preloader");

if (!preloader) return;

setTimeout(function () {

    preloader.classList.add("hide");

}, 500);
```

});

/* ================= ELEMENTS ================= */

const body =
document.body;

const menuBtn =
document.getElementById("menuBtn");

const navbar =
document.getElementById("navbar");

const themeToggle =
document.getElementById("themeToggle");

const typingText =
document.getElementById("typingText");

const backToTop =
document.getElementById("backToTop");

const header =
document.querySelector(".header");

/* ================= MOBILE MENU ================= */

function closeMenu() {

```
if (!navbar || !menuBtn) return;

navbar.classList.remove("show");

body.classList.remove("no-scroll");

menuBtn.setAttribute(
    "aria-expanded",
    "false"
);

const icon =
    menuBtn.querySelector("i");

if (icon) {

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

}
```

}

if (menuBtn && navbar) {

```
menuBtn.addEventListener(
    "click",
    function () {

        const isOpen =
            navbar.classList.toggle("show");

        body.classList.toggle(
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

    }
);


navbar
    .querySelectorAll("a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            closeMenu
        );

    });
```

}

/* ================= THEME ================= */

function updateThemeIcon() {

```
if (!themeToggle) return;

const icon =
    themeToggle.querySelector("i");

if (!icon) return;

const light =
    body.classList.contains("light");

icon.classList.toggle(
    "fa-moon",
    !light
);

icon.classList.toggle(
    "fa-sun",
    light
);
```

}

const savedTheme =
localStorage.getItem(
"portfolio-theme"
);

if (savedTheme === "light") {

```
body.classList.add("light");
```

}

updateThemeIcon();

if (themeToggle) {

```
themeToggle.addEventListener(
    "click",
    function () {

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

    }
);
```

}

/* ================= TYPING EFFECT ================= */

if (typingText) {

```
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

    const word =
        words[wordIndex];


    if (!deleting) {

        typingText.textContent =
            word.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            word.length
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
            word.substring(
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
        deleting ? 50 : 90
    );

}


typeEffect();
```

}

/* ================= SMOOTH SCROLL ================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(function (link) {

```
    link.addEventListener(
        "click",
        function (event) {

            const id =
                link.getAttribute("href");

            if (
                !id ||
                id === "#"
            ) return;

            const target =
                document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});
```

/* ================= ACTIVE NAV ================= */

const sections =
document.querySelectorAll(
"section[id]"
);

const navLinks =
document.querySelectorAll(
".nav-link"
);

function updateActiveNav() {

```
let current = "";

const position =
    window.scrollY + 200;


sections.forEach(
    function (section) {

        const top =
            section.offsetTop;

        const bottom =
            top + section.offsetHeight;


        if (
            position >= top &&
            position < bottom
        ) {

            current =
                section.id;

        }

    }
);


navLinks.forEach(
    function (link) {

        link.classList.remove(
            "active"
        );


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add(
                "active"
            );

        }

    }
);
```

}

window.addEventListener(
"scroll",
updateActiveNav,
{
passive: true
}
);

updateActiveNav();

/* ================= SCROLL REVEAL ================= */

const revealElements =
document.querySelectorAll(
".reveal"
);

if (
"IntersectionObserver" in window
) {

```
const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

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
            threshold: 0.12
        }
    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);
```

} else {

```
revealElements.forEach(
    function (element) {

        element.classList.add(
            "visible"
        );

    }
);
```

}

/* ================= HEADER ================= */

function updateHeader() {

```
if (!header) return;

header.classList.toggle(
    "scrolled",
    window.scrollY > 50
);
```

}

window.addEventListener(
"scroll",
updateHeader,
{
passive: true
}
);

updateHeader();

/* ================= BACK TO TOP ================= */

function updateBackToTop() {

```
if (!backToTop) return;

backToTop.classList.toggle(
    "show",
    window.scrollY > 500
);
```

}

window.addEventListener(
"scroll",
updateBackToTop,
{
passive: true
}
);

updateBackToTop();

if (backToTop) {

```
backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);
```

}

/* ================= GOOGLE ANALYTICS ================= */

document
.querySelectorAll("[data-analytics]")
.forEach(function (element) {

```
    element.addEventListener(
        "click",
        function () {

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
                            element.textContent.trim(),

                        transport_type:
                            "beacon"
                    }
                );

            }

        }
    );

});
```

/* ================= ESC KEY ================= */

document.addEventListener(
"keydown",
function (event) {

```
    if (
        event.key === "Escape"
    ) {

        closeMenu();

    }

}
```

);

/* ================= RESIZE ================= */

window.addEventListener(
"resize",
function () {

```
    if (
        window.innerWidth > 900
    ) {

        closeMenu();

    }

    updateActiveNav();

}
```

);

/* ================= PAGE READY ================= */

document.documentElement.classList.add(
"js-ready"
);

console.log(
"Ahmed Sorour Portfolio loaded successfully."
);
