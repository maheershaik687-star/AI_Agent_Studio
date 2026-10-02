const modal = document.getElementById("taskModal");
const toast = document.getElementById("toast");


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* OPEN MODAL */

function openTaskForm() {

    modal.classList.add("show");

    document.getElementById("taskTitle").focus();
}


/* CLOSE MODAL */

function closeTaskForm() {

    modal.classList.remove("show");
}


/* CREATE TASK */

function createTask() {

    const title =
        document.getElementById("taskTitle").value.trim();

    const description =
        document.getElementById("taskDescription").value.trim();

    const priority =
        document.getElementById("taskPriority").value;


    if (!title) {

        showToast("Please enter a task title");

        return;
    }


    const task = document.createElement("div");

    task.className = "task-card";

    task.dataset.priority = priority;
    task.dataset.category = "research";

    task.innerHTML = `

        <div class="task-top">

            <span class="priority ${priority}">
                ${priority.toUpperCase()}
            </span>

            <button onclick="removeTask(this)">
                •••
            </button>

        </div>

        <h3>${title}</h3>

        <p>
            ${description || "New AI task added to the queue."}
        </p>

        <div class="task-tags">

            <span>New Task</span>
            <span>AI</span>

        </div>

        <div class="task-footer">

            <div class="agent">

                <span class="avatar blue-avatar">
                    AI
                </span>

                AI Agent

            </div>

            <span>Just now</span>

        </div>
    `;


    document
        .getElementById("queuedColumn")
        .prepend(task);


    let queued =
        parseInt(
            document.getElementById("queuedTasks").textContent
        );

    let total =
        parseInt(
            document.getElementById("totalTasks").textContent
        );


    document.getElementById("queuedTasks").textContent =
        queued + 1;

    document.getElementById("totalTasks").textContent =
        total + 1;


    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";

    closeTaskForm();

    showToast("New task added");
}


/* REMOVE */

function removeTask(button) {

    const card = button.closest(".task-card");

    if (card) {

        card.remove();

        showToast("Task removed");
    }
}


/* FILTER */

function filterTasks(type, button) {

    document
        .querySelectorAll(".filter")
        .forEach(item => {
            item.classList.remove("active");
        });

    button.classList.add("active");


    document
        .querySelectorAll(".task-card")
        .forEach(card => {

            if (
                type === "all" ||
                card.dataset.priority === type ||
                card.dataset.category === type
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }
        });
}


/* SEARCH */

function searchTasks() {

    const value =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    document
        .querySelectorAll(".task-card")
        .forEach(card => {

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                text.includes(value)
                    ? "block"
                    : "none";
        });
}


/* CLICK OUTSIDE MODAL */

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeTaskForm();
    }

});