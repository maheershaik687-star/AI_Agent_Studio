let liveMode = true;

const toast =
    document.getElementById("toast");


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


/* LIVE MODE */

function toggleLive() {

    liveMode = !liveMode;

    const button =
        document.getElementById("pauseBtn");


    if (liveMode) {

        button.textContent = "⏸ Live";

        button.classList.add(
            "live-active"
        );

        showToast(
            "Live logging enabled"
        );

    } else {

        button.textContent = "▶ Paused";

        button.classList.remove(
            "live-active"
        );

        showToast(
            "Live logging paused"
        );
    }

}


/* REFRESH */

function refreshLogs() {

    showToast(
        "Logs refreshed successfully"
    );

}


/* SEARCH */

function searchLogs() {

    const value =
        document
            .getElementById("logSearch")
            .value
            .toLowerCase();


    document
        .querySelectorAll(".log-row")
        .forEach(row => {

            const text =
                row.textContent.toLowerCase();

            row.style.display =
                text.includes(value)
                    ? "grid"
                    : "none";

        });

}


/* FILTER LEVEL */

function filterLevel() {

    const filter =
        document
            .getElementById("levelFilter")
            .value;


    document
        .querySelectorAll(".log-row")
        .forEach(row => {

            if (
                filter === "all" ||
                row.dataset.level === filter
            ) {

                row.style.display =
                    "grid";

            } else {

                row.style.display =
                    "none";

            }

        });

}


/* CLEAR */

function clearConsole() {

    const container =
        document.getElementById(
            "logContainer"
        );


    container.innerHTML = `

        <div class="log-row"
             data-level="info">

            <span class="time">
                --:--:--.---
            </span>

            <span class="level info">
                INFO
            </span>

            <span class="agent-name">
                System
            </span>

            <span class="message">
                Log console cleared
            </span>

        </div>

    `;


    showToast(
        "Console cleared"
    );

}


/* LIVE LOG GENERATOR */

setInterval(() => {

    if (!liveMode) {
        return;
    }


    const container =
        document.getElementById(
            "logContainer"
        );


    const row =
        document.createElement("div");

    row.className =
        "log-row";

    row.dataset.level =
        "success";


    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            "en-US",
            {
                hour12: false
            }
        );


    row.innerHTML = `

        <span class="time">
            ${time}.421
        </span>

        <span class="level success">
            SUCCESS
        </span>

        <span class="agent-name">
            SystemMonitor
        </span>

        <span class="message">
            Agent heartbeat received
        </span>

    `;


    container.prepend(row);


    const rows =
        container.querySelectorAll(
            ".log-row"
        );


    if (rows.length > 15) {

        rows[rows.length - 1].remove();

    }

}, 5000);