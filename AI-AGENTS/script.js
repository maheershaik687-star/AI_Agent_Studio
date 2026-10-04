javascript
/* =========================================================
   AI-AGENTS
   INTERACTION ENGINE
========================================================= */


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".agent-card, .about, .cta"
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
    (element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    }
);


/* =========================================================
   MOUSE GLOW EFFECT
========================================================= */

const cards =
    document.querySelectorAll(
        ".agent-card"
    );


cards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.background =
                    `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(124,92,255,.13),
                        rgba(6,9,17,.8) 42%
                    )
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    }
);


/* =========================================================
   HERO PARALLAX
========================================================= */

const visual =
    document.querySelector(
        ".ai-visual"
    );


if (visual) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;


            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            visual.style.transform =
                `
                translate(
                    ${x * 10}px,
                    ${y * 10}px
                )
                `;

        }
    );

}


/* =========================================================
   BUTTON CLICK EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(
        ".primary-btn, .secondary-btn, .open-btn"
    );


buttons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                button.style.transform =
                    "scale(.97)";


                setTimeout(
                    () => {

                        button.style.transform = "";

                    },
                    120
                );

            }
        );

    }
);


/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const navLinks =
    document.querySelectorAll(
        "nav a[href^='#']"
    );


const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop -
                    180;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            (link) => {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
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
   SMOOTH SCROLL
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

                    const id =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            id
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
   RANDOM PARTICLE SYSTEM
========================================================= */

const particleLayer =
    document.createElement(
        "div"
    );


particleLayer.className =
    "particles";


document.body.appendChild(
    particleLayer
);


const particleCount = 45;


for (
    let i = 0;
    i < particleCount;
    i++
) {

    const particle =
        document.createElement(
            "span"
        );


    particle.style.position =
        "fixed";


    particle.style.left =
        Math.random() * 100 +
        "%";


    particle.style.top =
        Math.random() * 100 +
        "%";


    particle.style.width =
        Math.random() * 2 + 1 +
        "px";


    particle.style.height =
        particle.style.width;


    particle.style.borderRadius =
        "50%";


    particle.style.background =
        Math.random() > .5
            ? "#7c5cff"
            : "#00d9ff";


    particle.style.opacity =
        Math.random() * .45;


    particle.style.pointerEvents =
        "none";


    particle.style.zIndex =
        "-3";


    particle.style.boxShadow =
        "0 0 8px currentColor";


    particle.style.animation =
        `
        particleFloat
        ${8 + Math.random() * 15}s
        linear
        ${Math.random() * 10}s
        infinite
        `;


    particleLayer.appendChild(
        particle
    );

}


/* =========================================================
   DYNAMIC PARTICLE ANIMATION
========================================================= */

const particleStyle =
    document.createElement(
        "style"
    );


particleStyle.textContent = `

    @keyframes particleFloat {

        0% {

            transform:
                translateY(30px)
                translateX(0);

            opacity: 0;

        }

        20% {

            opacity: .45;

        }

        50% {

            transform:
                translateY(-100px)
                translateX(25px);

        }

        80% {

            opacity: .25;

        }

        100% {

            transform:
                translateY(-220px)
                translateX(-20px);

            opacity: 0;

        }

    }

`;


document.head.appendChild(
    particleStyle
);


/* =========================================================
   CARD TILT EFFECT
========================================================= */

cards.forEach(
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


                const centerX =
                    rect.left +
                    rect.width / 2;


                const centerY =
                    rect.top +
                    rect.height / 2;


                const rotateX =
                    (event.clientY -
                        centerY) /
                    25;


                const rotateY =
                    (event.clientX -
                        centerX) /
                    -25;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
            Press "A" to jump
            to the collection.
        */

        if (
            event.key.toLowerCase() ===
            "a" &&
            event.target.tagName !==
            "INPUT"
        ) {

            document
                .getElementById(
                    "collection"
                )
                ?.scrollIntoView({
                    behavior: "smooth"
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
            "%c AI-AGENTS ",
            `
            background:#7c5cff;
            color:white;
            padding:8px 15px;
            border-radius:8px;
            font-weight:bold;
            `
        );


        console.log(
            "AI Agent Collection loaded successfully."
        );


        console.log(
            "Systems available: 04"
        );


        console.log(
            "Abhiram collection available."
        );

    }
);
