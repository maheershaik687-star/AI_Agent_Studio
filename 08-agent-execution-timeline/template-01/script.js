
const replayBtn = document.getElementById("replayBtn");

const timelineItems = document.querySelectorAll(".timeline-item");

const mainStatus = document.getElementById("mainStatus");

const duration = document.getElementById("duration");

const stepCount = document.getElementById("stepCount");

const agentSelect = document.getElementById("agentSelect");

let replaying = false;
let replayTimer = null;


// EXPAND EVENT DETAILS

document.querySelectorAll(".expand-btn").forEach(button => {

    button.addEventListener("click", function() {

        const card = this.closest(".event-card");

        card.classList.toggle("expanded");

        this.textContent = card.classList.contains("expanded")
            ? "Details −"
            : "Details +";

    });

});


// REPLAY EXECUTION

replayBtn.addEventListener("click", function() {

    if (replaying) return;

    replaying = true;

    replayBtn.disabled = true;

    replayBtn.textContent = "↻ Replaying...";

    mainStatus.textContent = "● Running";

    mainStatus.style.color = "#ffcc67";

    mainStatus.style.background = "#514324";

    duration.textContent = "Running...";

    stepCount.textContent = "0 / 6";

    timelineItems.forEach(item => {

        item.classList.remove("completed", "active");

        item.style.opacity = "0.35";

    });

    let currentStep = 0;

    replayTimer = setInterval(() => {

        if (currentStep < timelineItems.length) {

            const item = timelineItems[currentStep];

            item.style.opacity = "1";

            item.classList.add("completed");

            item.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

            stepCount.textContent =
                `${currentStep + 1} / ${timelineItems.length}`;

            currentStep++;

        } else {

            clearInterval(replayTimer);

            replaying = false;

            replayBtn.disabled = false;

            replayBtn.textContent = "↻ Replay";

            mainStatus.textContent = "● Completed";

            mainStatus.style.color = "#3ee0a0";

            mainStatus.style.background = "#1a4d43";

            duration.textContent = "18.5 sec";

        }

    }, 900);

});


// AGENT SELECTION

agentSelect.addEventListener("change", function() {

    const selectedAgent = this.value;

    document.getElementById("agentName").textContent =
        selectedAgent;

    document.getElementById("detailAgent").textContent =
        selectedAgent;

});


// NOTIFICATION BUTTON

document.querySelector(".notification").addEventListener("click", function() {

    alert("You are all caught up! No new notifications.");

});


// INITIAL STATE

stepCount.textContent = "6 / 6";

duration.textContent = "18.5 sec";
