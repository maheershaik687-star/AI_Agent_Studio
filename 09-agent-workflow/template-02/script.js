
const taskModal = document.getElementById("taskModal");
const detailsModal = document.getElementById("detailsModal");
const taskForm = document.getElementById("taskForm");
const toast = document.getElementById("toast");

let tasks = [
    {
        id: 1,
        title: "Improve customer response accuracy",
        description: "Optimize the support agent's responses using better context retrieval.",
        category: "AI OPTIMIZATION",
        priority: "high",
        status: "backlog",
        agent: "Support AI",
        due: "2026-10-05"
    },
    {
        id: 2,
        title: "Integrate knowledge base API",
        description: "Connect the internal documentation database with the support workflow.",
        category: "INTEGRATION",
        priority: "medium",
        status: "backlog",
        agent: "Research Bot",
        due: "2026-10-08"
    },
    {
        id: 3,
        title: "Create automated email replies",
        description: "Generate personalized email responses for common support queries.",
        category: "AUTOMATION",
        priority: "low",
        status: "backlog",
        agent: "Automation AI",
        due: "2026-10-10"
    },
    {
        id: 4,
        title: "Analyze customer sentiment",
        description: "Identify positive, negative, and neutral customer conversations.",
        category: "ANALYTICS",
        priority: "medium",
        status: "progress",
        agent: "Data Agent",
        due: "2026-10-04"
    },
    {
        id: 5,
        title: "Build intent classification model",
        description: "Classify incoming customer queries into support categories.",
        category: "MACHINE LEARNING",
        priority: "high",
        status: "progress",
        agent: "Research Bot",
        due: "2026-10-06"
    },
    {
        id: 6,
        title: "Connect WhatsApp support",
        description: "Configure incoming and outgoing WhatsApp support messages.",
        category: "INTEGRATION",
        priority: "high",
        status: "progress",
        agent: "Automation AI",
        due: "2026-10-07"
    },
    {
        id: 7,
        title: "Configure agent memory",
        description: "Enable conversation context storage for returning customers.",
        category: "AGENT CONFIG",
        priority: "low",
        status: "progress",
        agent: "Support AI",
        due: "2026-10-09"
    },
    {
        id: 8,
        title: "Review response templates",
        description: "Verify generated templates for accuracy and tone.",
        category: "QUALITY CHECK",
        priority: "medium",
        status: "review",
        agent: "Support AI",
        due: "2026-10-03"
    },
    {
        id: 9,
        title: "Test API authentication",
        description: "Validate secure API communication and error handling.",
        category: "TESTING",
        priority: "high",
        status: "review",
        agent: "Data Agent",
        due: "2026-10-04"
    },
    {
        id: 10,
        title: "Optimize prompt instructions",
        description: "Refine system instructions to improve response relevance.",
        category: "AI OPTIMIZATION",
        priority: "medium",
        status: "review",
        agent: "Research Bot",
        due: "2026-10-05"
    },
    {
        id: 11,
        title: "Set up welcome automation",
        description: "Automatically greet customers when a new conversation begins.",
        category: "AUTOMATION",
        priority: "low",
        status: "completed",
        agent: "Automation AI",
        due: "2026-10-01"
    },
    {
        id: 12,
        title: "Create support dashboard",
        description: "Build a centralized dashboard for customer support metrics.",
        category: "DASHBOARD",
        priority: "medium",
        status: "completed",
        agent: "Data Agent",
        due: "2026-10-01"
    }
];

let nextId = 13;
let editingId = null;
let selectedTaskId = null;
let searchQuery = "";
let priorityFilter = "all";

const columns = {
    backlog: "backlogList",
    progress: "progressList",
    review: "reviewList",
    completed: "completedList"
};

const agentColors = {
    "Support AI": "purple",
    "Research Bot": "blue",
    "Data Agent": "orange",
    "Automation AI": "green",
    "Unassigned": "pink"
};

const agentInitials = {
    "Support AI": "SA",
    "Research Bot": "RB",
    "Data Agent": "DA",
    "Automation AI": "AA",
    "Unassigned": "?"
};

const statusNames = {
    backlog: "Backlog",
    progress: "In Progress",
    review: "Review",
    completed: "Completed"
};


// TOAST

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


// DATE FORMAT

function formatDate(date) {
    if (!date) return "No due date";

    const parsed = new Date(date + "T00:00:00");

    return parsed.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
    });
}


// RENDER TASKS

function renderTasks() {

    Object.values(columns).forEach(id => {
        document.getElementById(id).innerHTML = "";
    });

    const filtered = tasks.filter(task => {

        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery) ||
            task.description.toLowerCase().includes(searchQuery) ||
            task.agent.toLowerCase().includes(searchQuery);

        const matchesPriority =
            priorityFilter === "all" ||
            task.priority === priorityFilter;

        return matchesSearch && matchesPriority;
    });

    filtered.forEach(task => {

        const card = document.createElement("article");

        card.className = "task-card";
        card.draggable = true;
        card.dataset.id = task.id;

        const agentColor = agentColors[task.agent] || "purple";
        const initials = agentInitials[task.agent] || "AI";

        card.innerHTML = `
            <div class="task-card-top">
                <span class="task-category"></span>
                <button class="task-menu" aria-label="Task options">•••</button>
            </div>

            <h4></h4>
            <p class="task-description"></p>

            <span class="priority ${task.priority}">
                ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>

            <div class="task-meta">
                <div class="agent-info">
                    <span class="agent-avatar ${agentColor}">${initials}</span>
                    <span class="agent-name"></span>
                </div>

                <span class="due-date"></span>
            </div>
        `;

        card.querySelector(".task-category").textContent = task.category;
        card.querySelector("h4").textContent = task.title;
        card.querySelector(".task-description").textContent = task.description;
        card.querySelector(".agent-name").textContent = task.agent;

        const dueElement = card.querySelector(".due-date");
        dueElement.textContent = "◷ " + formatDate(task.due);

        if (task.due && new Date(task.due + "T23:59:59") < new Date() &&
            task.status !== "completed") {
            dueElement.classList.add("overdue");
        }

        card.addEventListener("click", event => {

            if (event.target.closest(".task-menu")) {
                event.stopPropagation();
                openEdit(task.id);
                return;
            }

            openDetails(task.id);

        });

        card.addEventListener("dragstart", event => {

            event.dataTransfer.setData("text/plain", String(task.id));
            event.dataTransfer.effectAllowed = "move";

            card.classList.add("dragging");

        });

        card.addEventListener("dragend", () => {
            card.classList.remove("dragging");
        });

        document.getElementById(columns[task.status]).appendChild(card);

    });

    updateStats();
    updateColumnCounts();

}


// UPDATE STATISTICS

function updateStats() {

    const total = tasks.length;

    const active = tasks.filter(task =>
        task.status === "progress"
    ).length;

    const completed = tasks.filter(task =>
        task.status === "completed"
    ).length;

    const percentage = total
        ? Math.round((completed / total) * 100)
        : 0;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("activeTasks").textContent = active;
    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("completionRate").textContent =
        percentage + "%";

    document.getElementById("progressFill").style.width =
        percentage + "%";

}


// COLUMN COUNTS

function updateColumnCounts() {

    document.querySelectorAll(".kanban-column").forEach(column => {

        const status = column.dataset.status;

        const count = tasks.filter(task =>
            task.status === status
        ).length;

        column.querySelector(".column-count").textContent = count;

    });

}


// DRAG AND DROP

document.querySelectorAll(".kanban-column").forEach(column => {

    column.addEventListener("dragover", event => {

        event.preventDefault();
        column.classList.add("drag-over");

    });

    column.addEventListener("dragleave", event => {

        if (!column.contains(event.relatedTarget)) {
            column.classList.remove("drag-over");
        }

    });

    column.addEventListener("drop", event => {

        event.preventDefault();

        column.classList.remove("drag-over");

        const id = Number(event.dataTransfer.getData("text/plain"));

        const task = tasks.find(item => item.id === id);

        if (!task) return;

        const newStatus = column.dataset.status;

        if (task.status !== newStatus) {

            task.status = newStatus;

            renderTasks();

            showToast(`Task moved to ${statusNames[newStatus]}`);

        }

    });

});


// OPEN CREATE MODAL

function openCreate(status = "backlog") {

    editingId = null;

    taskForm.reset();

    document.getElementById("modalTitle").textContent = "Create New Task";
    document.getElementById("submitTask").textContent = "Create Task";

    document.getElementById("taskStatus").value = status;
    document.getElementById("taskPriority").value = "medium";
    document.getElementById("taskAgent").value = "Support AI";

    taskModal.classList.add("show");

    document.getElementById("taskTitle").focus();

}


// OPEN EDIT MODAL

function openEdit(id) {

    const task = tasks.find(item => item.id === id);

    if (!task) return;

    editingId = id;

    document.getElementById("modalTitle").textContent = "Edit Task";
    document.getElementById("submitTask").textContent = "Save Changes";

    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskStatus").value = task.status;
    document.getElementById("taskAgent").value = task.agent;
    document.getElementById("taskDue").value = task.due || "";

    detailsModal.classList.remove("show");
    taskModal.classList.add("show");

}


// CREATE TASK BUTTON

document.getElementById("addTaskBtn").addEventListener("click", () => {
    openCreate();
});


// ADD TASK FROM COLUMN

document.querySelectorAll(".add-column-task").forEach(button => {

    button.addEventListener("click", () => {
        openCreate(button.dataset.status);
    });

});


// CLOSE MODAL

function closeTaskModal() {
    taskModal.classList.remove("show");
}

document.getElementById("closeModal").addEventListener("click", closeTaskModal);
document.getElementById("cancelModal").addEventListener("click", closeTaskModal);


// SUBMIT TASK

taskForm.addEventListener("submit", event => {

    event.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();

    if (!title) {
        showToast("Please enter a task title");
        return;
    }

    const taskData = {
        title,
        description: document.getElementById("taskDescription").value.trim(),
        priority: document.getElementById("taskPriority").value,
        status: document.getElementById("taskStatus").value,
        agent: document.getElementById("taskAgent").value,
        due: document.getElementById("taskDue").value,
        category: "CUSTOM TASK"
    };

    if (editingId !== null) {

        const task = tasks.find(item => item.id === editingId);

        if (task) {
            Object.assign(task, taskData);
        }

        showToast("Task updated successfully");

    } else {

        tasks.push({
            id: nextId++,
            ...taskData
        });

        showToast("New task created successfully");

    }

    closeTaskModal();
    renderTasks();

});


// TASK DETAILS

function openDetails(id) {

    const task = tasks.find(item => item.id === id);

    if (!task) return;

    selectedTaskId = id;

    document.getElementById("detailTitle").textContent = task.title;

    document.getElementById("detailDescription").textContent =
        task.description || "No description provided.";

    document.getElementById("detailPriority").textContent =
        task.priority.toUpperCase();

    document.getElementById("detailStatus").textContent =
        statusNames[task.status];

    document.getElementById("detailAgent").textContent =
        task.agent;

    document.getElementById("detailDue").textContent =
        formatDate(task.due);

    detailsModal.classList.add("show");

}


// CLOSE DETAILS

document.getElementById("closeDetails").addEventListener("click", () => {
    detailsModal.classList.remove("show");
});


// EDIT FROM DETAILS

document.getElementById("editDetailBtn").addEventListener("click", () => {

    if (selectedTaskId !== null) {
        openEdit(selectedTaskId);
    }

});


// SEARCH

document.getElementById("searchInput").addEventListener("input", function() {

    searchQuery = this.value.toLowerCase().trim();

    renderTasks();

});


// PRIORITY FILTER

document.getElementById("priorityFilter").addEventListener("change", function() {

    priorityFilter = this.value;

    renderTasks();

});


// REFRESH

document.getElementById("refreshBtn").addEventListener("click", () => {

    renderTasks();

    showToast("Board refreshed successfully");

});


// SHARE BOARD

document.getElementById("shareBtn").addEventListener("click", async () => {

    const shareData = {
        title: "AgentFlow Workflow Board",
        text: "Check out my AI Agent workflow board."
    };

    if (navigator.share) {

        try {
            await navigator.share(shareData);
        } catch (error) {
            // User cancelled sharing.
        }

    } else if (navigator.clipboard) {

        await navigator.clipboard.writeText(window.location.href);

        showToast("Board link copied");

    } else {

        showToast("Sharing is not supported in this browser");

    }

});


// OTHER BUTTONS

document.getElementById("upgradeBtn").addEventListener("click", () => {
    showToast("Explore premium automation features");
});

document.getElementById("helpBtn").addEventListener("click", () => {
    showToast("Welcome to AgentFlow workflow management");
});

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("You are all caught up!");
});


// CLOSE MODALS ON BACKGROUND CLICK

[taskModal, detailsModal].forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });

});


// KEYBOARD ESCAPE

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        taskModal.classList.remove("show");
        detailsModal.classList.remove("show");
    }

});


// INITIAL RENDER

renderTasks();
