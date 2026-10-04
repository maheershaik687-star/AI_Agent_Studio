let autoRefresh = false;
let refreshInterval = null;

const toast = document.getElementById("toast");


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* REFRESH */

function refreshAgents() {

    const latency =
        Math.floor(Math.random() * 100) + 100;

    document.getElementById("latency").textContent =
        latency + "ms";


    const requests =
        (24 + Math.random() * 3).toFixed(1);

    document.getElementById("requests").textContent =
        requests + "K";


    showToast("System data updated");
}


/* AUTO REFRESH */

function toggleAutoRefresh() {

    const button =
        document.getElementById("autoRefresh");

    autoRefresh = !autoRefresh;

    button.classList.toggle(
        "active",
        autoRefresh
    );


    if (autoRefresh) {

        refreshAgents();

        refreshInterval = setInterval(
            refreshAgents,
            4000
        );

        showToast("Auto refresh enabled");

    } else {

        clearInterval(refreshInterval);

        showToast("Auto refresh disabled");
    }
}


/* FILTER */

function filterAgents(status, button) {

    document
        .querySelectorAll(".filter")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    button.classList.add("active");


    document
        .querySelectorAll(".agent-card")
        .forEach(card => {

            if (
                status === "all" ||
                card.dataset.status === status
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }

        });
}


/* SIMULATE ACTIVITY */

setInterval(() => {

    const activities =
        document.getElementById("activityList");

    const activity =
        document.createElement("div");

    activity.className = "activity";

    activity.innerHTML = `
        <span class="activity-dot green"></span>

        <div>
            <strong>
                AI agent heartbeat received
            </strong>

            <small>
                Just now
            </small>
        </div>

        <span class="activity-time">
            ${Math.floor(Math.random() * 200) + 100}ms
        </span>
    `;

    activities.prepend(activity);

    if (activities.children.length > 5) {
        activities.removeChild(
            activities.lastElementChild
        );
    }

}, 7000);