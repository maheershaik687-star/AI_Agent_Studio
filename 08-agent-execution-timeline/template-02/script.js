
const stages = document.querySelectorAll(".stage");
const cards = document.querySelectorAll(".step-card");

const replayBtn = document.getElementById("replayBtn");
const progressBar = document.getElementById("progressBar");
const trackFill = document.getElementById("trackFill");

const progressText = document.getElementById("progressText");
const completedSteps = document.getElementById("completedSteps");
const duration = document.getElementById("duration");

const executionSelect = document.getElementById("executionSelect");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const doneBtn = document.getElementById("doneBtn");

let currentStep = 6;
let replayTimer = null;
let replaying = false;

const stageData = [
    {
        title: "Initialize Agent",
        description: "The agent environment was initialized and configuration settings were loaded.",
        duration: "0.4 sec",
        log: "10:23:12 — Agent started.\n10:23:12 — Environment loaded.\n10:23:12 — Configuration verified."
    },
    {
        title: "Fetch Data",
        description: "The agent connected to external data sources and retrieved relevant information.",
        duration: "2.1 sec",
        log: "10:23:14 — API connection established.\n10:23:15 — 5 records received.\n10:23:16 — Data validation completed."
    },
    {
        title: "Analyze Information",
        description: "The language model analyzed the collected information and identified relevant patterns.",
        duration: "5.3 sec",
        log: "10:23:18 — AI processing started.\n10:23:20 — Context analyzed.\n10:23:23 — Analysis completed."
    },
    {
        title: "Web Search",
        description: "The agent used its web search tool to collect supporting information from multiple sources.",
        duration: "4.2 sec",
        log: "10:23:22 — Search tool activated.\n10:23:24 — 10 sources found.\n10:23:26 — Relevant pages selected."
    },
    {
        title: "Generate Output",
        description: "The agent generated the final response and validated the generated content.",
        duration: "3.8 sec",
        log: "10:23:27 — Response generation started.\n10:23:29 — Output validated.\n10:23:30 — Response prepared."
    },
    {
        title: "Task Completed",
        description: "All execution stages finished successfully and the final result became available.",
        duration: "2.7 sec",
        log: "10:23:30 — Execution completed.\n10:23:30 — Final result stored.\n10:23:30 — Status: SUCCESS."
    }
];


// UPDATE EXECUTION UI

function updateJourney(step) {

    currentStep = step;

    stages.forEach((stage, index) => {

        stage.classList.remove("completed", "pending", "active", "selected");

        if (index < step) {
            stage.classList.add("completed");
        } else if (index === step && step < stages.length) {
            stage.classList.add("active", "selected");
        } else {
            stage.classList.add("pending");
        }

        const status = stage.querySelector(".stage-status");
        const node = stage.querySelector(".stage-node");

        if (index < step) {
            status.textContent = index === 5 ? "Successful" : "Completed";
            node.querySelector(".node-check").style.display = "grid";
        } else if (index === step && step < stages.length) {
            status.textContent = "Running";
            node.querySelector(".node-check").style.display = "none";
        } else {
            status.textContent = "Pending";
            node.querySelector(".node-check").style.display = "none";
        }

    });

    cards.forEach((card, index) => {

        card.classList.remove("selected");

        if (index === Math.min(step, cards.length - 1)) {
            card.classList.add("selected");
        }

    });

    const percentage = Math.round((step / stages.length) * 100);

    progressBar.style.width = percentage + "%";

    trackFill.style.width = percentage + "%";

    progressText.textContent = percentage + "%";

    completedSteps.textContent = `${step} of ${stages.length}`;

    if (step === stages.length) {

        duration.textContent = "18.5 sec";

    } else if (step === 0) {

        duration.textContent = "0.0 sec";

    } else {

        duration.textContent = "Running...";

    }

}


// REPLAY EXECUTION

replayBtn.addEventListener("click", function() {

    if (replaying) return;

    replaying = true;

    replayBtn.disabled = true;

    replayBtn.textContent = "↻ Playing Journey...";

    updateJourney(0);

    let step = 0;

    replayTimer = setInterval(() => {

        step++;

        updateJourney(step);

        if (step >= stages.length) {

            clearInterval(replayTimer);

            replaying = false;

            replayBtn.disabled = false;

            replayBtn.textContent = "↻ Replay Journey";

        }

    }, 1100);

});


// STAGE INSPECTOR

function openInspector(index) {

    const data = stageData[index];

    document.getElementById("modalTitle").textContent = data.title;

    document.getElementById("modalDescription").textContent =
        data.description;

    document.getElementById("modalStage").textContent =
        `0${index + 1}`;

    document.getElementById("modalDuration").textContent =
        data.duration;

    document.getElementById("modalLog").innerHTML =
        data.log.replace(/\n/g, "<br>");

    modal.classList.add("show");

}


// INSPECT BUTTONS

document.querySelectorAll(".inspect-btn").forEach((button, index) => {

    button.addEventListener("click", () => {

        openInspector(index);

    });

});


// CLICK JOURNEY NODES

stages.forEach((stage, index) => {

    stage.addEventListener("click", () => {

        openInspector(index);

    });

    stage.style.cursor = "pointer";

});


// CLOSE MODAL

closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});

doneBtn.addEventListener("click", () => {

    modal.classList.remove("show");

});

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// ESCAPE KEY

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("show");
    }

});


// EXECUTION SELECTOR

executionSelect.addEventListener("change", function() {

    const selectedId = this.value;

    document.getElementById("executionId").textContent = selectedId;

    const agents = {
        "EXE-2024-001": "Research Agent",
        "EXE-2024-002": "Content Generator",
        "EXE-2024-003": "Data Analyst"
    };

    document.getElementById("agentName").textContent =
        agents[selectedId];

    if (replaying) {
        clearInterval(replayTimer);
        replaying = false;
        replayBtn.disabled = false;
        replayBtn.textContent = "↻ Replay Journey";
    }

    updateJourney(6);

});


// DOCUMENTATION BUTTON

document.getElementById("docsBtn").addEventListener("click", () => {

    alert("AgentHub Documentation\n\nExecution Journey helps you inspect agent stages, execution duration, and generated results.");

});


// NOTIFICATIONS

document.getElementById("notificationBtn").addEventListener("click", () => {

    alert("You are all caught up! No new notifications.");

});


// INITIALIZE

updateJourney(6);
