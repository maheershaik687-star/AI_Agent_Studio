
const canvas = document.getElementById("canvas");
const canvasContent = document.getElementById("canvasContent");
const connectionLines = document.getElementById("connectionLines");

const nodeCount = document.getElementById("nodeCount");
const toast = document.getElementById("canvasToast");

const nodeName = document.getElementById("nodeName");
const nodeDescription = document.getElementById("nodeDescription");

const selectedName = document.getElementById("selectedName");
const selectedType = document.getElementById("selectedType");
const selectedIcon = document.getElementById("selectedIcon");

const runModal = document.getElementById("runModal");

let selectedNode = null;
let nextId = 6;
let zoom = 1;
let running = false;

let connections = [
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5]
];

let history = [];
let historyIndex = -1;

const types = {
    trigger: {
        name: "Start Trigger",
        category: "TRIGGER",
        description: "Workflow entry point",
        icon: "▶",
        color: "trigger",
        x: 40,
        y: 500
    },
    agent: {
        name: "AI Agent",
        category: "AI MODEL",
        description: "Process intelligent tasks",
        icon: "✦",
        color: "agent",
        x: 280,
        y: 500
    },
    tool: {
        name: "Tool",
        category: "TOOL",
        description: "Execute external action",
        icon: "⚒",
        color: "tool",
        x: 530,
        y: 500
    },
    condition: {
        name: "Condition",
        category: "LOGIC",
        description: "Evaluate a condition",
        icon: "◇",
        color: "condition",
        x: 530,
        y: 650
    },
    knowledge: {
        name: "Knowledge Base",
        category: "KNOWLEDGE",
        description: "Retrieve relevant information",
        icon: "▤",
        color: "knowledge",
        x: 780,
        y: 500
    },
    output: {
        name: "Output",
        category: "OUTPUT",
        description: "Generate final response",
        icon: "▣",
        color: "output",
        x: 780,
        y: 650
    },
    memory: {
        name: "Memory",
        category: "STORAGE",
        description: "Store conversation context",
        icon: "◉",
        color: "memory",
        x: 40,
        y: 650
    },
    api: {
        name: "API Request",
        category: "INTEGRATION",
        description: "Connect to external APIs",
        icon: "⌁",
        color: "api",
        x: 280,
        y: 650
    }
};


// INITIAL HISTORY

function saveHistory() {

    const snapshot = [...document.querySelectorAll(".workflow-node")].map(node => ({
        id: node.dataset.id,
        type: node.dataset.type || "agent",
        name: node.querySelector("h3").textContent,
        description: node.querySelector(".node-description")?.textContent ||
                     node.querySelector("p").textContent,
        left: parseInt(node.style.left),
        top: parseInt(node.style.top)
    }));

    history = history.slice(0, historyIndex + 1);
    history.push(snapshot);
    historyIndex++;

    if (history.length > 30) {
        history.shift();
        historyIndex--;
    }

}


// TOAST

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);

}


// NODE COUNT

function updateCount() {

    const count = document.querySelectorAll(".workflow-node").length;

    nodeCount.textContent = `${count} Nodes`;

    document.getElementById("runNodes").textContent = count;

}


// CONNECTION DRAWING

function drawConnections() {

    connectionLines.innerHTML = "";

    connections.forEach(([fromId, toId]) => {

        const from = document.querySelector(
            `.workflow-node[data-id="${fromId}"]`
        );

        const to = document.querySelector(
            `.workflow-node[data-id="${toId}"]`
        );

        if (!from || !to) return;

        const x1 = parseInt(from.style.left) + from.offsetWidth;
        const y1 = parseInt(from.style.top) + from.offsetHeight / 2;

        const x2 = parseInt(to.style.left);
        const y2 = parseInt(to.style.top) + to.offsetHeight / 2;

        const middle = (x1 + x2) / 2;

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        path.setAttribute(
            "d",
            `M ${x1} ${y1} C ${middle} ${y1}, ${middle} ${y2}, ${x2} ${y2}`
        );

        path.setAttribute("class", "connection-path");

        connectionLines.appendChild(path);

    });

}


// SELECT NODE

function selectNode(node) {

    document.querySelectorAll(".workflow-node").forEach(item => {
        item.classList.remove("selected");
    });

    selectedNode = node;

    if (!node) return;

    node.classList.add("selected");

    const title = node.querySelector("h3").textContent;
    const description = node.querySelector("p").textContent;

    nodeName.value = title;
    nodeDescription.value = description;

    selectedName.textContent = title;
    selectedType.textContent =
        node.querySelector(".node-category").textContent;

    selectedIcon.textContent =
        node.querySelector(".node-icon").textContent;

}


// NODE DRAGGING

function enableDragging(node) {

    node.addEventListener("pointerdown", function(event) {

        if (event.target.closest("button") || event.target.closest(".port")) {
            return;
        }

        selectNode(node);

        const startX = event.clientX;
        const startY = event.clientY;

        const initialLeft = parseInt(node.style.left);
        const initialTop = parseInt(node.style.top);

        node.setPointerCapture(event.pointerId);

        function move(moveEvent) {

            const dx = (moveEvent.clientX - startX) / zoom;
            const dy = (moveEvent.clientY - startY) / zoom;

            node.style.left = Math.max(0, initialLeft + dx) + "px";
            node.style.top = Math.max(0, initialTop + dy) + "px";

            drawConnections();

        }

        function stop() {

            node.removeEventListener("pointermove", move);
            node.removeEventListener("pointerup", stop);

            saveHistory();

        }

        node.addEventListener("pointermove", move);
        node.addEventListener("pointerup", stop);

    });

}


// NODE EVENTS

function activateNode(node) {

    enableDragging(node);

    node.addEventListener("click", function(event) {

        event.stopPropagation();
        selectNode(node);

    });

    node.querySelector(".node-menu").addEventListener("click", function(event) {

        event.stopPropagation();

        selectNode(node);

        showToast("Node selected. Edit its properties on the right.");

    });

}


// ADD COMPONENT

function addNode(type) {

    const data = types[type];

    if (!data) return;

    const id = nextId++;

    const node = document.createElement("div");

    node.className = "workflow-node";
    node.dataset.id = id;
    node.dataset.type = type;

    const offset = (id - 6) * 25;

    node.style.left = (data.x + offset) + "px";
    node.style.top = (data.y + offset) + "px";

    node.innerHTML = `
        <span class="port input-port"></span>

        <div class="node-header">
            <span class="node-icon ${data.color}">${data.icon}</span>
            <span class="node-category">${data.category}</span>
            <button class="node-menu">•••</button>
        </div>

        <h3>${data.name}</h3>
        <p>${data.description}</p>

        <div class="node-footer">
            <span class="node-status">● Ready</span>
            <span>${String(id).padStart(2, "0")}</span>
        </div>

        <span class="port output-port"></span>
    `;

    canvasContent.appendChild(node);

    activateNode(node);

    selectNode(node);

    updateCount();
    drawConnections();
    saveHistory();

    showToast(`${data.name} added to canvas`);

}


// ADD COMPONENT BUTTONS

document.querySelectorAll(".component").forEach(button => {

    button.addEventListener("click", () => {

        addNode(button.dataset.type);

    });

});


// SELECT CANVAS BACKGROUND

canvas.addEventListener("click", event => {

    if (event.target === canvas || event.target.classList.contains("canvas-grid")) {

        document.querySelectorAll(".workflow-node").forEach(node => {
            node.classList.remove("selected");
        });

        selectedNode = null;

    }

});


// EDIT NODE NAME

nodeName.addEventListener("input", function() {

    if (!selectedNode) return;

    selectedNode.querySelector("h3").textContent = this.value;

    selectedName.textContent = this.value;

});


// EDIT DESCRIPTION

nodeDescription.addEventListener("input", function() {

    if (!selectedNode) return;

    selectedNode.querySelector("p").textContent = this.value;

});


// TEMPERATURE

const temperature = document.getElementById("temperature");

temperature.addEventListener("input", function() {

    document.getElementById("temperatureValue").textContent = this.value;

});


// DELETE NODE

document.getElementById("deleteNode").addEventListener("click", function() {

    if (!selectedNode) {

        showToast("Select a node first");

        return;

    }

    const id = Number(selectedNode.dataset.id);

    connections = connections.filter(
        ([from, to]) => from !== id && to !== id
    );

    selectedNode.remove();

    selectedNode = null;

    updateCount();
    drawConnections();
    saveHistory();

    showToast("Node deleted successfully");

});


// SAVE WORKFLOW

document.getElementById("saveBtn").addEventListener("click", function() {

    saveHistory();

    showToast("✓ Workflow saved successfully");

    document.querySelector(".workflow-title p").innerHTML =
        '<span class="saved-dot"></span> All changes saved';

});


// UNDO

document.getElementById("undoBtn").addEventListener("click", function() {

    if (historyIndex <= 0) {

        showToast("Nothing to undo");

        return;

    }

    historyIndex--;

    restoreHistory(history[historyIndex]);

    showToast("Previous state restored");

});


// REDO

document.getElementById("redoBtn").addEventListener("click", function() {

    if (historyIndex >= history.length - 1) {

        showToast("Nothing to redo");

        return;

    }

    historyIndex++;

    restoreHistory(history[historyIndex]);

    showToast("Changes restored");

});


// RESTORE NODES

function restoreHistory(snapshot) {

    canvasContent.querySelectorAll(".workflow-node").forEach(node => {
        node.remove();
    });

    connections = [];

    snapshot.forEach(item => {

        const data = types[item.type] || types.agent;

        const node = document.createElement("div");

        node.className = "workflow-node";
        node.dataset.id = item.id;
        node.dataset.type = item.type;

        node.style.left = item.left + "px";
        node.style.top = item.top + "px";

        node.innerHTML = `
            <span class="port input-port"></span>
            <div class="node-header">
                <span class="node-icon ${data.color}">${data.icon}</span>
                <span class="node-category">${data.category}</span>
                <button class="node-menu">•••</button>
            </div>
            <h3></h3>
            <p></p>
            <div class="node-footer">
                <span class="node-status">● Ready</span>
                <span>${String(item.id).padStart(2, "0")}</span>
            </div>
            <span class="port output-port"></span>
        `;

        node.querySelector("h3").textContent = item.name;
        node.querySelector("p").textContent = item.description;

        canvasContent.appendChild(node);

        activateNode(node);

    });

    nextId = Math.max(
        6,
        ...snapshot.map(item => Number(item.id) + 1)
    );

    updateCount();
    drawConnections();

}


// RUN WORKFLOW

document.getElementById("runBtn").addEventListener("click", async function() {

    if (running) return;

    running = true;

    const nodes = [...document.querySelectorAll(".workflow-node")];

    this.disabled = true;
    this.textContent = "◌ Running...";

    document.querySelectorAll(".connection-path").forEach(path => {
        path.classList.add("running");
    });

    nodes.forEach(node => {
        node.classList.remove("running", "error");
        node.querySelector(".node-status").textContent = "● Ready";
    });

    for (const node of nodes) {

        node.classList.add("running");

        node.querySelector(".node-status").textContent = "● Running";

        await new Promise(resolve => setTimeout(resolve, 550));

        node.classList.remove("running");

        node.querySelector(".node-status").textContent = "● Completed";

    }

    document.querySelectorAll(".connection-path").forEach(path => {
        path.classList.remove("running");
    });

    this.disabled = false;
    this.textContent = "▶ Run Workflow";

    running = false;

    runModal.classList.add("show");

});


// CLOSE RUN MODAL

document.getElementById("closeRun").addEventListener("click", () => {
    runModal.classList.remove("show");
});

document.getElementById("doneRun").addEventListener("click", () => {
    runModal.classList.remove("show");
});

runModal.addEventListener("click", event => {

    if (event.target === runModal) {
        runModal.classList.remove("show");
    }

});


// ZOOM

function updateZoom() {

    canvasContent.style.transform = `scale(${zoom})`;
    document.getElementById("zoomValue").textContent =
        Math.round(zoom * 100) + "%";

    drawConnections();

}

document.getElementById("zoomIn").addEventListener("click", () => {

    zoom = Math.min(1.5, zoom + 0.1);
    updateZoom();

});

document.getElementById("zoomOut").addEventListener("click", () => {

    zoom = Math.max(0.5, zoom - 0.1);
    updateZoom();

});

document.getElementById("fitBtn").addEventListener("click", () => {

    zoom = 1;
    updateZoom();

    canvas.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    });

});


// COMPONENT SEARCH

document.getElementById("componentSearch").addEventListener("input", function() {

    const query = this.value.toLowerCase();

    document.querySelectorAll(".component").forEach(button => {

        button.style.display =
            button.textContent.toLowerCase().includes(query)
                ? "flex"
                : "none";

    });

});


// COLLAPSE COMPONENT PANEL

document.getElementById("collapseBtn").addEventListener("click", function() {

    const panel = document.querySelector(".component-panel");

    panel.classList.toggle("collapsed");

    if (panel.classList.contains("collapsed")) {

        panel.style.width = "55px";
        this.textContent = "+";

    } else {

        panel.style.width = "";
        this.textContent = "−";

    }

    drawConnections();

});


// PROPERTIES CLOSE

document.getElementById("closeProperties").addEventListener("click", () => {

    document.querySelector(".properties-panel").style.display = "none";

});


// LOGS TAB

document.getElementById("logsTab").addEventListener("click", () => {

    showToast("Execution logs will appear after running the workflow.");

});


// OTHER BUTTONS

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("No new notifications");
});

document.getElementById("searchBtn").addEventListener("click", () => {
    showToast("Use the component search to find nodes");
});

document.getElementById("upgradeBtn").addEventListener("click", () => {
    showToast("Explore workflow features");
});


// INITIALIZE

document.querySelectorAll(".workflow-node").forEach(activateNode);

document.querySelectorAll(".workflow-node").forEach(node => {
    node.dataset.type = node.classList.contains("trigger-node") ? "trigger" :
        node.classList.contains("agent-node") ? "agent" :
        node.classList.contains("tool-node") ? "tool" :
        node.classList.contains("condition-node") ? "condition" : "output";
});

updateCount();
drawConnections();
saveHistory();
