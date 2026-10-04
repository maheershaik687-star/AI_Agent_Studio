
const executions = [
    {
        agent: "Research Agent",
        id: "EX-2048",
        status: "Success",
        duration: "12.4s",
        started: "Oct 07, 10:23 AM"
    },
    {
        agent: "Support Copilot",
        id: "EX-2047",
        status: "Success",
        duration: "8.2s",
        started: "Oct 07, 09:15 AM"
    },
    {
        agent: "Data Analyst",
        id: "EX-2046",
        status: "Failed",
        duration: "15.6s",
        started: "Oct 07, 08:45 AM"
    },
    {
        agent: "Content Agent",
        id: "EX-2045",
        status: "Success",
        duration: "9.1s",
        started: "Oct 07, 08:12 AM"
    },
    {
        agent: "Email Assistant",
        id: "EX-2044",
        status: "Success",
        duration: "22.3s",
        started: "Oct 07, 07:55 AM"
    }
];

const table = document.getElementById("executionTable");

function displayExecutions() {

    table.innerHTML = executions.map((item, index) => {

        return `
            <tr>
                <td>${item.agent}</td>

                <td>${item.id}</td>

                <td>
                    <span class="status ${item.status.toLowerCase()}">
                        ● ${item.status}
                    </span>
                </td>

                <td>${item.duration}</td>

                <td>${item.started}</td>

                <td>
                    <button class="view-btn"
                        onclick="viewExecution(${index})">
                        View
                    </button>
                </td>
            </tr>
        `;

    }).join("");

}

function viewExecution(index) {

    const item = executions[index];

    alert(
        "Execution Details\n\n" +
        "Agent: " + item.agent + "\n" +
        "Execution ID: " + item.id + "\n" +
        "Status: " + item.status + "\n" +
        "Duration: " + item.duration
    );

}

document.getElementById("period").addEventListener("change", function() {

    const days = Number(this.value);

    const total = days === 7 ? "1,248" :
                  days === 30 ? "5,420" : "15,860";

    document.getElementById("total").textContent = total;

});

document.getElementById("exportBtn").addEventListener("click", function() {

    const header = ["Agent", "Execution ID", "Status", "Duration", "Started"];

    const rows = executions.map(item => [
        item.agent,
        item.id,
        item.status,
        item.duration,
        item.started
    ]);

    const csv = [header, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "agent-execution-history.csv";

    link.click();

    URL.revokeObjectURL(url);

});

document.getElementById("viewAll").addEventListener("click", function() {

    alert("Showing all available execution records in this demo.");

});

displayExecutions();
