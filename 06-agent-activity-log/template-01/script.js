const toast =
    document.getElementById("toast");


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


/* FILTER */

function filterLogs(type, button) {

    document
        .querySelectorAll(".filter")
        .forEach(btn => {

            btn.classList.remove("active");

        });

    button.classList.add("active");


    document
        .querySelectorAll(".event")
        .forEach(event => {

            if (
                type === "all" ||
                event.dataset.type === type
            ) {

                event.style.display = "grid";

            } else {

                event.style.display = "none";

            }

        });

}


/* SEARCH */

function searchLogs() {

    const value =
        document
            .getElementById("search")
            .value
            .toLowerCase();


    document
        .querySelectorAll(".event")
        .forEach(event => {

            const text =
                event.textContent.toLowerCase();

            event.style.display =
                text.includes(value)
                    ? "grid"
                    : "none";

        });

}


/* CLEAR */

function clearLogs() {

    const timeline =
        document.getElementById("timeline");

    timeline.innerHTML = `
        <div class="event">

            <div class="event-time">
                --
            </div>

            <div class="event-line">

                <span class="event-dot success">
                    ✓
                </span>

            </div>

            <div class="event-content">

                <div class="event-title">

                    <h3>
                        Activity log cleared
                    </h3>

                    <span class="badge success">
                        SYSTEM
                    </span>

                </div>

                <p>
                    No previous activity events are currently displayed.
                </p>

            </div>

        </div>
    `;

    showToast("Activity log cleared");
}


/* EXPORT */

function exportLogs() {

    const content =
        "AI Agent Activity Log\n\n" +
        "Export generated successfully.";

    const blob =
        new Blob(
            [content],
            { type: "text/plain" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "agent-activity-log.txt";

    link.click();

    URL.revokeObjectURL(url);

    showToast("Activity log exported");
}


/* LIVE EVENT */

setInterval(() => {

    const timeline =
        document.getElementById("timeline");

    const event =
        document.createElement("div");

    event.className =
        "event";

    event.dataset.type =
        "success";

    const time =
        new Date().toLocaleTimeString(
            "en-US",
            {
                hour12: false
            }
        );

    event.innerHTML = `

        <div class="event-time">
            ${time}
        </div>

        <div class="event-line">

            <span class="event-dot success">
                ✓
            </span>

        </div>

        <div class="event-content">

            <div class="event-title">

                <h3>
                    Agent heartbeat received
                </h3>

                <span class="badge success">
                    SUCCESS
                </span>

            </div>

            <p>
                AI agent reported healthy system status.
            </p>

            <div class="event-meta">

                <span>
                    🤖 System Monitor
                </span>

                <span>
                    Heartbeat
                </span>

                <span>
                    120ms
                </span>

            </div>

        </div>
    `;

    timeline.prepend(event);

    const events =
        timeline.querySelectorAll(".event");

    if (events.length > 8) {

        events[events.length - 1].remove();

    }

}, 8000);