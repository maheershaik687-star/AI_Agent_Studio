const toast = document.getElementById("toast");

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function refreshData() {

    const cpu = randomNumber(25, 80);
    const memory = randomNumber(45, 85);
    const network = randomNumber(15, 60);

    const response = randomNumber(180, 320);

    document.getElementById("cpuValue").textContent = cpu + "%";
    document.getElementById("memoryValue").textContent = memory + "%";
    document.getElementById("networkValue").textContent = network + "%";

    document.getElementById("responseTime").textContent = response;

    document.getElementById("cpuBar").style.width = cpu + "%";
    document.getElementById("memoryBar").style.width = memory + "%";
    document.getElementById("networkBar").style.width = network + "%";

    showToast("Dashboard refreshed successfully");
}


function clearEvents() {

    const events = document.getElementById("events");

    events.innerHTML = `
        <div class="event">
            <span class="event-icon success">✓</span>

            <div>
                <strong>No recent events</strong>
                <small>Activity log cleared</small>
            </div>
        </div>
    `;

    showToast("Activity log cleared");
}


/* AUTO UPDATE */

setInterval(() => {

    const cpu = randomNumber(25, 75);

    document.getElementById("cpuValue").textContent =
        cpu + "%";

    document.getElementById("cpuBar").style.width =
        cpu + "%";

}, 5000);