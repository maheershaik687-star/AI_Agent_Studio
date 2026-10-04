javascript
/* =========================================================
   ABHIRAM AI AGENT COLLECTION
   INTERACTION ENGINE
========================================================= */


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".system-card, .workflow, .about, .final-cta"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (entry.isIntersecting) {

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
    (element, index) => {

        element.classList.add("reveal");

        element.style.transitionDelay =
            `${index * 80}ms`;

        revealObserver.observe(element);

    }
);


/* =========================================================
   MOUSE GLOW + 3D TILT
========================================================= */

const systemCards =
    document.querySelectorAll(
        ".system-card"
    );


systemCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 30;


                const rotateY =
                    (centerX - x) / 30;


                card.style.transform =
                    `
                    perspective(1100px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                    `;


                card.style.background =
                    `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(128,92,255,.14),
                        rgba(5,8,15,.84) 45%
                    )
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

                card.style.background = "";

            }
        );

    }
);


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (heroVisual) {

    window.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 900
            ) {
                return;
            }


            const x =
                event.clientX /
                window.innerWidth -
                0.5;


            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            heroVisual.style.transform =
                `
                translate(
                    ${x * 12}px,
                    ${y * 12}px
                )
                `;

        }
    );

}


/* =========================================================
   BUTTON PRESS EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(
        ".primary-button, .secondary-button, .system-button"
    );


buttons.forEach(
    (button) => {

        button.addEventListener(
            "mousedown",
            () => {

                button.style.transform =
                    "scale(.97)";

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                button.style.transform = "";

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    }
);


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const particleContainer =
    document.createElement(
        "div"
    );


particleContainer.className =
    "particle-container";


particleContainer.style.position =
    "fixed";


particleContainer.style.inset =
    "0";


particleContainer.style.pointerEvents =
    "none";


particleContainer.style.zIndex =
    "-4";


document.body.appendChild(
    particleContainer
);


const PARTICLE_COUNT = 55;


for (
    let i = 0;
    i < PARTICLE_COUNT;
    i++
) {

    const particle =
        document.createElement(
            "span"
        );


    particle.className =
        "particle";


    const size =
        Math.random() * 2.5 + 1;


    particle.style.position =
        "absolute";


    particle.style.width =
        `${size}px`;


    particle.style.height =
        `${size}px`;


    particle.style.left =
        `${Math.random() * 100}%`;


    particle.style.top =
        `${Math.random() * 100}%`;


    particle.style.borderRadius =
        "50%";


    particle.style.background =
        Math.random() > .5
            ? "#805cff"
            : "#00e5ff";


    particle.style.opacity =
        `${Math.random() * .5 + .1}`;


    particle.style.boxShadow =
        "0 0 10px currentColor";


    particle.style.animation =
        `
        particleMove
        ${8 + Math.random() * 14}s
        linear
        ${Math.random() * 10}s
        infinite
        `;


    particleContainer.appendChild(
        particle
    );

}


/* =========================================================
   PARTICLE ANIMATION
========================================================= */

const particleAnimation =
    document.createElement(
        "style"
    );


particleAnimation.textContent = `

    @keyframes particleMove {

        0% {

            transform:
                translate3d(0, 30px, 0)
                scale(.4);

            opacity: 0;

        }

        20% {

            opacity: .6;

        }

        50% {

            transform:
                translate3d(
                    25px,
                    -100px,
                    0
                )
                scale(1);

        }

        80% {

            opacity: .3;

        }

        100% {

            transform:
                translate3d(
                    -25px,
                    -220px,
                    0
                )
                scale(.3);

            opacity: 0;

        }

    }

`;


document.head.appendChild(
    particleAnimation
);


/* =========================================================
   MAGNETIC BUTTON EFFECT
========================================================= */

buttons.forEach(
    (button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    (
                        rect.left +
                        rect.width / 2
                    );


                const y =
                    event.clientY -
                    (
                        rect.top +
                        rect.height / 2
                    );


                button.style.transform =
                    `
                    translate(
                        ${x * .08}px,
                        ${y * .08}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    }
);


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progress =
    document.createElement(
        "div"
    );


progress.style.position =
    "fixed";


progress.style.top =
    "0";


progress.style.left =
    "0";


progress.style.height =
    "2px";


progress.style.width =
    "0%";


progress.style.zIndex =
    "9999";


progress.style.background =
    `
    linear-gradient(
        90deg,
        #805cff,
        #00e5ff
    )
    `;


progress.style.boxShadow =
    "0 0 15px #00e5ff";


document.body.appendChild(
    progress
);


window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;


        progress.style.width =
            `${percentage}%`;

    },
    {
        passive: true
    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        'nav a[href^="#"]'
    );


const pageSections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let current =
            "";


        pageSections.forEach(
            (section) => {

                const top =
                    section.offsetTop -
                    250;


                if (
                    window.scrollY >=
                    top
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            (link) => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (anchor) => {

            anchor.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        anchor.getAttribute(
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


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   AI CORE INTERACTION
========================================================= */

const core =
    document.querySelector(
        ".ai-core"
    );


if (core) {

    core.addEventListener(
        "mouseenter",
        () => {

            core.style.boxShadow =
                `
                0 0 140px
                rgba(0,229,255,.5)
                `;

        }
    );


    core.addEventListener(
        "mouseleave",
        () => {

            core.style.boxShadow =
                `
                0 0 100px
                rgba(128,92,255,.35)
                `;

        }
    );

}


/* =========================================================
   RANDOM SYSTEM STATUS
========================================================= */

const statuses =
    document.querySelectorAll(
        ".system-status"
    );


const statusValues = [
    "ONLINE",
    "ACTIVE",
    "READY",
    "CONNECTED"
];


function updateStatus() {

    statuses.forEach(
        (status, index) => {

            status.style.opacity =
                "0";


            setTimeout(
                () => {

                    status.textContent =
                        statusValues[
                            (
                                index +
                                Math.floor(
                                    Math.random() *
                                    statusValues.length
                                )
                            ) %
                            statusValues.length
                        ];


                    status.style.opacity =
                        "1";

                },
                250
            );

        }
    );

}


setInterval(
    updateStatus,
    7000
);


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() ===
            "s" &&
            event.target.tagName !==
            "INPUT"
        ) {

            document
                .getElementById("systems")
                ?.scrollIntoView({
                    behavior:
                        "smooth"
                });

        }

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );


        console.log(
            "%c ABHIRAM AI LAB ",
            `
            background:
                linear-gradient(
                    135deg,
                    #805cff,
                    #00e5ff
                );
            color: white;
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 900;
            `
        );


        console.log(
            "AI Agent Collection initialized."
        );


        console.log(
            "Systems: 04"
        );


        console.log(
            "Templates: 08+"
        );


        console.log(
            "Status: ONLINE"
        );

    }
);