/* =====================================================
   AHMED SOROUR PORTFOLIO
   PROFESSIONAL JAVASCRIPT
===================================================== */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 500);

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("show");

        document.body.classList.toggle(
            "no-scroll",
            navbar.classList.contains("show")
        );

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu */

    document.querySelectorAll(".navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("show");

            document.body.classList.remove("no-scroll");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });

}


/* ================= DARK / LIGHT MODE ================= */

const themeBtn = document.getElementById("themeBtn");

function updateThemeIcon() {

    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

}


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const currentTheme =
            document.body.classList.contains("light")
                ? "light"
                : "dark";

        localStorage.setItem(
            "portfolio-theme",
            currentTheme
        );

        updateThemeIcon();

    });

}


/* Remember theme */

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

}

updateThemeIcon();


/* ================= TYPING ANIMATION ================= */

const words = [
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Enthusiast",
    "Data Analyst"
];

const typingElement =
    document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement) return;

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(
                typeEffect,
                1700
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 45 : 90
    );

}

typeEffect();


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar a");


function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
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


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

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


/* ================= STAGGER ANIMATIONS ================= */

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


const contactCards =
    document.querySelectorAll(".contact-card");

contactCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 80}ms`;

});


/* ================= HEADER ON SCROLL ================= */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.15)";

        } else {

            header.style.boxShadow =
                "none";

        }

    },
    { passive: true }
);


/* ================= BACK TO TOP ================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    },
    { passive: true }
);


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


/* ================= PROJECT LINK FEEDBACK ================= */

document.querySelectorAll(".project-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add("clicked");

                setTimeout(() => {

                    link.classList.remove("clicked");

                }, 500);

            }
        );

    });


/* ================= ESC KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navbar.classList.contains("show")
        ) {

            navbar.classList.remove("show");

            document.body.classList.remove(
                "no-scroll"
            );

            const icon =
                menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    }
);