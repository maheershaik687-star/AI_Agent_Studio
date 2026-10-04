
const executions = [
    {
        id: "EX-2048",
        agent: "Content Generator",
        task: "Generate blog post",
        status: "Success",
        time: "Oct 07, 10:23 AM",
        duration: "12.4s",
        result: "Completed successfully",
        color: "purple"
    },

    {
        id: "EX-2047",
        agent: "Data Analyst",
        task: "Analyze sales data",
        status: "Success",
        time: "Oct 07, 09:15 AM",
        duration: "8.2s",
        result: "Analysis generated",
        color: "blue"
    },

    {
        id: "EX-2046",
        agent: "Email Assistant",
        task: "Send campaign",
        status: "Failed",
        time: "Oct 07, 08:45 AM",
        duration: "15.6s",
        result: "Email service timeout",
        color: "green"
    },

    {
        id: "EX-2045",
        agent: "Code Reviewer",
        task: "Review pull request",
        status: "Success",
        time: "Oct 07, 08:12 AM",
        duration: "9.1s",
        result: "Code review completed",
        color: "orange"
    },

    {
        id: "EX-2044",
        agent: "Research Agent",
        task: "Web search & summarize",
        status: "Running",
        time: "Oct 07, 07:55 AM",
        duration: "22.3s",
        result: "Execution in progress",
        color: "purple"
    },

    {
        id: "EX-2043",
        agent: "Content Generator",
        task: "Create social media post",
        status: "Success",
        time: "Oct 06, 06:30 PM",
        duration: "7.8s",
        result: "Post generated",
        color: "purple"
    },

    {
        id: "EX-2042",
        agent: "Data Analyst",
        task: "Generate monthly report",
        status: "Failed",
        time: "Oct 06, 05:12 PM",
        duration: "18.5s",
        result: "Invalid input data",
        color: "blue"
    },

    {
        id: "EX-2041",
        agent: "Research Agent",
        task: "Analyze competitor trends",
        status: "Success",
        time: "Oct 06, 04:40 PM",
        duration: "14.2s",
        result: "Research completed",
        color: "purple"
    }
];

const tableBody = document.getElementById("tableBody");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const agentFilter = document.getElementById("agentFilter");

const emptyState = document.getElementById("emptyState");

const resultInfo = document.getElementById("resultInfo");

const pageNumber = document.getElementById("pageNumber");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const modal = document.getElementById("modal");

let currentPage = 1;

const rowsPerPage = 5;

let filteredData = [...executions];

let selectedIds = new Set();


// FILTER DATA

function filterData() {

    const search = searchInput.value.toLowerCase();

    const status = statusFilter.value;

    const agent = agentFilter.value;

    filteredData = executions.filter(item => {

        const matchesSearch =
            item.id.toLowerCase().includes(search) ||
            item.agent.toLowerCase().includes(search) ||
            item.task.toLowerCase().includes(search);

        const matchesStatus =
            status === "All" || item.status === status;

        const matchesAgent =
            agent === "All" || item.agent === agent;

        return matchesSearch && matchesStatus && matchesAgent;

    });

    currentPage = 1;

    renderTable();

}


// RENDER TABLE

function renderTable() {

    const start = (currentPage - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    const pageData = filteredData.slice(start, end);

    if (filteredData.length === 0) {

        tableBody.innerHTML = "";

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

        tableBody.innerHTML = pageData.map(item => {

            const index = executions.indexOf(item);

            return `

                <tr>

                    <td>
                        <input
                            type="checkbox"
                            class="row-checkbox"
                            value="${item.id}"
                            ${selectedIds.has(item.id) ? "checked" : ""}
                        >
                    </td>

                    <td>
                        <span class="execution-id">${item.id}</span>
                    </td>

                    <td>

                        <div class="agent-cell">

                            <div class="agent-avatar agent-${item.color}">
                                ${item.agent.charAt(0)}
                            </div>

                            <strong>${item.agent}</strong>

                        </div>

                    </td>

                    <td>${item.task}</td>

                    <td>

                        <span class="status ${item.status.toLowerCase()}">
                            ● ${item.status}
                        </span>

                    </td>

                    <td>${item.time}</td>

                    <td><strong>${item.duration}</strong></td>

                    <td>

                        <button
                            class="result-btn"
                            onclick="viewDetails(${index})">
                            View
                        </button>

                    </td>

                    <td>

                        <button
                            class="action-btn"
                            onclick="viewDetails(${index})">
                            ⋯
                        </button>

                    </td>

                </tr>

            `;

        }).join("");

        document.querySelectorAll(".row-checkbox").forEach(box => {

            box.addEventListener("change", function() {

                if (this.checked) {
                    selectedIds.add(this.value);
                } else {
                    selectedIds.delete(this.value);
                }

            });

        });

    }

    const totalPages = Math.max(
        1,
        Math.ceil(filteredData.length / rowsPerPage)
    );

    resultInfo.textContent =
        `Showing ${filteredData.length ? start + 1 : 0}–${Math.min(end, filteredData.length)} of ${filteredData.length} results`;

    pageNumber.textContent = currentPage;

    prevBtn.disabled = currentPage === 1;

    nextBtn.disabled = currentPage === totalPages;

}


// VIEW DETAILS

function viewDetails(index) {

    const item = executions[index];

    document.getElementById("modalTitle").textContent = item.id;

    document.getElementById("modalBody").innerHTML = `

        <div class="detail-row">
            <span>Agent Name</span>
            <strong>${item.agent}</strong>
        </div>

        <div class="detail-row">
            <span>Execution ID</span>
            <strong>${item.id}</strong>
        </div>

        <div class="detail-row">
            <span>Task</span>
            <strong>${item.task}</strong>
        </div>

        <div class="detail-row">
            <span>Status</span>
            <strong>${item.status}</strong>
        </div>

        <div class="detail-row">
            <span>Duration</span>
            <strong>${item.duration}</strong>
        </div>

        <div class="detail-row">
            <span>Start Time</span>
            <strong>${item.time}</strong>
        </div>

        <div class="detail-row">
            <span>Result</span>
            <strong>${item.result}</strong>
        </div>

    `;

    modal.classList.add("show");

}


// CLOSE MODAL

document.getElementById("closeModal").onclick = closeModal;

document.getElementById("closeAction").onclick = closeModal;

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeModal();
    }

});

function closeModal() {
    modal.classList.remove("show");
}


// SEARCH AND FILTER

searchInput.addEventListener("input", filterData);

statusFilter.addEventListener("change", filterData);

agentFilter.addEventListener("change", filterData);


// RESET

document.getElementById("resetBtn").addEventListener("click", function() {

    searchInput.value = "";

    statusFilter.value = "All";

    agentFilter.value = "All";

    selectedIds.clear();

    document.getElementById("selectAll").checked = false;

    filterData();

});


// PAGINATION

nextBtn.addEventListener("click", function() {

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    if (currentPage < totalPages) {

        currentPage++;

        renderTable();

    }

});

prevBtn.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        renderTable();

    }

});


// SELECT ALL

document.getElementById("selectAll").addEventListener("change", function() {

    const checked = this.checked;

    const start = (currentPage - 1) * rowsPerPage;

    const pageData = filteredData.slice(start, start + rowsPerPage);

    pageData.forEach(item => {

        if (checked) {
            selectedIds.add(item.id);
        } else {
            selectedIds.delete(item.id);
        }

    });

    renderTable();

});


// EXPORT CSV

document.getElementById("exportBtn").addEventListener("click", function() {

    const headers = [
        "Execution ID",
        "Agent",
        "Task",
        "Status",
        "Start Time",
        "Duration",
        "Result"
    ];

    const rows = filteredData.map(item => [

        item.id,
        item.agent,
        item.task,
        item.status,
        item.time,
        item.duration,
        item.result

    ]);

    const csv = [headers, ...rows]
        .map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(",")
        )
        .join("\n");

    const blob = new Blob(
        ["\uFEFF" + csv],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "agent-execution-history.csv";

    link.click();

    URL.revokeObjectURL(url);

});


// INITIALIZE

renderTable();
