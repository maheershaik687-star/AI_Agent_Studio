/* =========================================================
   AI AGENT STUDIO
   ADVANCED INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("searchInput");

    const sortSelect =
        document.getElementById("sortSelect");

    const templateGrid =
        document.getElementById("templateGrid");

    const templateCards =
        Array.from(
            document.querySelectorAll(".template-card")
        );

    const filterButtons =
        Array.from(
            document.querySelectorAll(".filter-btn")
        );

    const resultCount =
        document.getElementById("resultCount");

    const noResults =
        document.getElementById("noResults");

    const navLinks =
        document.getElementById("navLinks");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const openCommand =
        document.getElementById("openCommand");

    const commandOverlay =
        document.getElementById("commandOverlay");

    const commandInput =
        document.getElementById("commandInput");

    const commandItems =
        Array.from(
            document.querySelectorAll(".command-item")
        );

    const scrollProgress =
        document.getElementById("scrollProgress");

    const cursorGlow =
        document.getElementById("cursorGlow");

    const backToTop =
        document.getElementById("backToTop");

    const toast =
        document.getElementById("toast");

    const liveClock =
        document.getElementById("liveClock");

    const terminalTyping =
        document.getElementById("terminalTyping");

    const year =
        document.getElementById("year");


    /* =====================================================
       STATE
    ====================================================== */

    let activeFilter = "all";

    let activeSort = "featured";

    let commandSelection = 0;

    let toastTimer;


    /* =====================================================
       YEAR
    ====================================================== */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       LIVE CLOCK
    ====================================================== */

    function updateClock() {

        if (!liveClock) {
            return;
        }

        const now =
            new Date();

        liveClock.textContent =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );
    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       TEMPLATE FILTER + SEARCH
    ====================================================== */

    function applyFilters() {

        const query =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        let visibleCards = [];

        templateCards.forEach(card => {

            const category =
                card.dataset.category || "";

            const name =
                card.dataset.name || "";

            const description =
                card
                    .querySelector(".card-content p")
                    ?.textContent
                    .toLowerCase() || "";

            const meta =
                card
                    .querySelector(".card-meta")
                    ?.textContent
                    .toLowerCase() || "";

            const matchesFilter =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                !query ||
                name
                    .toLowerCase()
                    .includes(query) ||
                description.includes(query) ||
                meta.includes(query);

            const visible =
                matchesFilter &&
                matchesSearch;

            card.classList.toggle(
                "hidden",
                !visible
            );

            if (visible) {
                visibleCards.push(card);
            }
        });


        /* SORT */

        if (activeSort === "az") {

            visibleCards.sort(
                (a, b) =>
                    a.dataset.name.localeCompare(
                        b.dataset.name
                    )
            );

        } else if (activeSort === "za") {

            visibleCards.sort(
                (a, b) =>
                    b.dataset.name.localeCompare(
                        a.dataset.name
                    )
            );

        } else if (activeSort === "category") {

            visibleCards.sort(
                (a, b) =>
                    a.dataset.category.localeCompare(
                        b.dataset.category
                    )
            );

        } else {

            visibleCards.sort(
                (a, b) =>
                    Number(a.dataset.order) -
                    Number(b.dataset.order)
            );
        }


        visibleCards.forEach(card => {
            templateGrid.appendChild(card);
        });


        /* RESULT COUNT */

        if (resultCount) {
            resultCount.textContent =
                visibleCards.length;
        }


        /* NO RESULTS */

        if (noResults) {
            noResults.hidden =
                visibleCards.length !== 0;
        }


        /* CARD ANIMATION */

        visibleCards.forEach(
            (card, index) => {

                card.style.animationDelay =
                    `${index * 40}ms`;
            }
        );
    }


    /* =====================================================
       FILTER BUTTONS
    ====================================================== */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );

                activeFilter =
                    button.dataset.filter;

                applyFilters();

                showToast(
                    activeFilter === "all"
                        ? "Showing all AI systems"
                        : `${capitalize(activeFilter)} systems activated`
                );
            }
        );
    });


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );
    }


    /* =====================================================
       SORT
    ====================================================== */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            () => {

                activeSort =
                    sortSelect.value;

                applyFilters();
            }
        );
    }


    /* =====================================================
       CAPITALIZE
    ====================================================== */

    function capitalize(value) {

        return value.charAt(0)
            .toUpperCase() +
            value.slice(1);
    }


    /* =====================================================
       COMMAND PALETTE
    ====================================================== */

    function openCommandPalette() {

        if (!commandOverlay) {
            return;
        }

        commandOverlay.classList.add(
            "open"
        );

        commandOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        commandSelection = 0;

        updateCommandSelection();

        setTimeout(
            () => {
                commandInput?.focus();
            },
            100
        );
    }


    function closeCommandPalette() {

        if (!commandOverlay) {
            return;
        }

        commandOverlay.classList.remove(
            "open"
        );

        commandOverlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    if (openCommand) {

        openCommand.addEventListener(
            "click",
            openCommandPalette
        );
    }


    if (commandOverlay) {

        commandOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    commandOverlay
                ) {
                    closeCommandPalette();
                }
            }
        );
    }


    /* =====================================================
       COMMAND SEARCH
    ====================================================== */

    if (commandInput) {

        commandInput.addEventListener(
            "input",
            () => {

                const query =
                    commandInput.value
                        .trim()
                        .toLowerCase();

                commandItems.forEach(item => {

                    const text =
                        item.textContent
                            .toLowerCase();

                    item.style.display =
                        text.includes(query)
                            ? "grid"
                            : "none";
                });

                commandSelection = 0;

                updateCommandSelection();
            }
        );
    }


    /* =====================================================
       COMMAND SELECTION
    ====================================================== */

    function getVisibleCommands() {

        return commandItems.filter(
            item =>
                item.style.display !==
                "none"
        );
    }


    function updateCommandSelection() {

        const visibleCommands =
            getVisibleCommands();

        commandItems.forEach(
            item =>
                item.classList.remove(
                    "selected"
                )
        );

        if (
            visibleCommands.length &&
            visibleCommands[commandSelection]
        ) {

            visibleCommands[
                commandSelection
            ].classList.add(
                "selected"
            );
        }
    }


    function executeCommand(
        action
    ) {

        closeCommandPalette();

        switch (action) {

            case "search":

                searchInput?.focus();

                showToast(
                    "Template search focused"
                );

                break;


            case "all":

                setFilter("all");

                scrollToTemplates();

                break;


            case "dashboard":

                setFilter("dashboard");

                scrollToTemplates();

                break;


            case "workflow":

                setFilter("workflow");

                scrollToTemplates();

                break;


            case "monitoring":

                setFilter("monitoring");

                scrollToTemplates();

                break;


            case "builder":

                setFilter("builder");

                scrollToTemplates();

                break;


            case "specialized":

                document
                    .getElementById(
                        "specialized"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

                showToast(
                    "Specialized systems opened"
                );

                break;


            case "collection":

                document
                    .getElementById(
                        "ai-agents"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

                showToast(
                    "AI-AGENTS collection opened"
                );

                break;
        }
    }


    function setFilter(
        filter
    ) {

        activeFilter =
            filter;

        filterButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter ===
                    filter
                );
            }
        );

        applyFilters();
    }


    function scrollToTemplates() {

        document
            .getElementById("templates")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    }


    commandItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    executeCommand(
                        item.dataset.action
                    );
                }
            );
        }
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const modifier =
                event.ctrlKey ||
                event.metaKey;


            /* CTRL + K */

            if (
                modifier &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                if (
                    commandOverlay?.classList.contains(
                        "open"
                    )
                ) {
                    closeCommandPalette();
                } else {
                    openCommandPalette();
                }

                return;
            }


            /* "/" SEARCH */

            if (
                event.key === "/" &&
                document.activeElement !==
                    searchInput &&
                document.activeElement !==
                    commandInput
            ) {

                event.preventDefault();

                searchInput?.focus();

                return;
            }


            /* ESC */

            if (
                event.key === "Escape"
            ) {

                closeCommandPalette();

                closeMobileMenu();

                searchInput?.blur();

                return;
            }


            /* COMMAND PALETTE NAVIGATION */

            if (
                commandOverlay?.classList.contains(
                    "open"
                )
            ) {

                const visibleCommands =
                    getVisibleCommands();

                if (
                    event.key === "ArrowDown"
                ) {

                    event.preventDefault();

                    commandSelection =
                        Math.min(
                            commandSelection + 1,
                            visibleCommands.length - 1
                        );

                    updateCommandSelection();

                } else if (
                    event.key === "ArrowUp"
                ) {

                    event.preventDefault();

                    commandSelection =
                        Math.max(
                            commandSelection - 1,
                            0
                        );

                    updateCommandSelection();

                } else if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    const selected =
                        visibleCommands[
                            commandSelection
                        ];

                    if (selected) {

                        executeCommand(
                            selected.dataset.action
                        );
                    }
                }
            }
        }
    );


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    function closeMobileMenu() {

        navLinks?.classList.remove(
            "mobile-open"
        );

        mobileMenu?.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            () => {

                const open =
                    navLinks.classList.toggle(
                        "mobile-open"
                    );

                mobileMenu.setAttribute(
                    "aria-expanded",
                    String(open)
                );
            }
        );
    }


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) *
                  100
                : 0;

        if (scrollProgress) {

            scrollProgress.style.width =
                `${percentage}%`;
        }


        if (backToTop) {

            backToTop.classList.toggle(
                "visible",
                scrollTop > 600
            );
        }
    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );

    updateScrollProgress();


    /* =====================================================
       BACK TO TOP
    ====================================================== */

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


    /* =====================================================
       INTERSECTION OBSERVER
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if (
        "IntersectionObserver" in
        window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.1
                }
            );

        revealElements.forEach(
            element =>
                observer.observe(element)
        );

    } else {

        revealElements.forEach(
            element =>
                element.classList.add(
                    "is-visible"
                )
        );
    }


    /* =====================================================
       COUNTER ANIMATION
    ====================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) {
            return;
        }

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.count
                );

            const duration =
                1200;

            const startTime =
                performance.now();

            function updateCounter(
                currentTime
            ) {

                const progress =
                    Math.min(
                        (currentTime - startTime) /
                        duration,
                        1
                    );

                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );

                counter.textContent =
                    Math.floor(
                        eased * target
                    );

                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target +
                        (target === 10 ||
                         target === 20 ||
                         target === 4
                            ? "+"
                            : "");
                }
            }

            requestAnimationFrame(
                updateCounter
            );
        });
    }


    const hero =
        document.querySelector(
            ".hero"
        );

    if (
        hero &&
        "IntersectionObserver" in
        window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        animateCounters();

                        counterObserver.disconnect();
                    }
                },
                {
                    threshold: 0.3
                }
            );

        counterObserver.observe(hero);

    } else {

        animateCounters();
    }


    /* =====================================================
       MOUSE GLOW
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !reducedMotion &&
        window.innerWidth > 700
    ) {

        document.addEventListener(
            "pointermove",
            event => {

                const x =
                    event.clientX;

                const y =
                    event.clientY;

                document.documentElement
                    .style
                    .setProperty(
                        "--mx",
                        `${x}px`
                    );

                document.documentElement
                    .style
                    .setProperty(
                        "--my",
                        `${y}px`
                    );

                if (cursorGlow) {

                    cursorGlow.style.left =
                        `${x}px`;

                    cursorGlow.style.top =
                        `${y}px`;
                }
            }
        );
    }


    /* =====================================================
       3D CARD TILT
    ====================================================== */

    if (
        !reducedMotion &&
        window.innerWidth > 900
    ) {

        document
            .querySelectorAll(
                ".tilt-card"
            )
            .forEach(card => {

                card.addEventListener(
                    "pointermove",
                    event => {

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

                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            3;

                        const rotateX =
                            ((centerY - y) /
                                centerY) *
                            3;

                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-4px)`;
                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {

                        card.style.transform =
                            "";
                    }
                );
            });
    }


    /* =====================================================
       RIPPLE EFFECT
    ====================================================== */

    document
        .querySelectorAll(
            "[data-ripple]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.className =
                        "ripple";

                    ripple.style.left =
                        `${event.clientX - rect.left}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top}px`;

                    button.appendChild(
                        ripple
                    );

                    setTimeout(
                        () => {
                            ripple.remove();
                        },
                        600
                    );
                }
            );
        });


    /* =====================================================
       TERMINAL TYPING
    ====================================================== */

    const terminalMessages = [
        "awaiting command...",
        "agent system ready...",
        "workflow engine online...",
        "monitoring agents...",
        "building intelligent systems...",
        "AI command center active..."
    ];

    let terminalIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function terminalType() {

        if (!terminalTyping) {
            return;
        }

        const message =
            terminalMessages[
                terminalIndex
            ];

        if (!deleting) {

            terminalTyping.textContent =
                message.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;

            if (
                characterIndex ===
                message.length
            ) {

                deleting = true;

                setTimeout(
                    terminalType,
                    1300
                );

                return;
            }

        } else {

            terminalTyping.textContent =
                message.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;

            if (
                characterIndex === 0
            ) {

                deleting = false;

                terminalIndex =
                    (terminalIndex + 1) %
                    terminalMessages.length;
            }
        }

        setTimeout(
            terminalType,
            deleting ? 35 : 65
        );
    }


    terminalType();


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(
        message
    ) {

        if (!toast) {
            return;
        }

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );

        clearTimeout(
            toastTimer
        );

        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2200
            );
    }


    /* =====================================================
       INITIALIZE
    ====================================================== */

    applyFilters();

    console.log(
        "%c AI AGENT STUDIO ",
        "background:#7c5cff;color:white;padding:8px 12px;border-radius:8px;font-weight:bold;"
    );

    console.log(
        "%c Command Center initialized successfully.",
        "color:#00d9ff;font-weight:bold;"
    );

});
