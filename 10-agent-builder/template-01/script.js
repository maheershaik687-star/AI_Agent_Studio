
const canvas = document.getElementById("canvas");
const inner = document.getElementById("canvasInner");
const svg = document.getElementById("connections");
const config = document.getElementById("configContent");
const toastBox = document.getElementById("toast");

let selectedId = null;
let nextId = 6;
let zoom = 1;
let connections = [[1,2],[2,3],[3,4],[4,5]];
let saved = false;

const definitions = {
  trigger: ["Trigger","When message received","Incoming event"],
  llm: ["AI Model","New AI task","Reason and generate"],
  memory: ["Memory","Store conversation","Save context"],
  condition: ["Condition","Check condition","Branch decision"],
  loop: ["Loop","Repeat action","Iteration"],
  tool: ["Tool / API","Call external tool","Execute integration"],
  output: ["Output","Return response","Final result"]
};

function toast(message) {
  toastBox.textContent = message;
  toastBox.classList.add("show");
  setTimeout(() => toastBox.classList.remove("show"), 2300);
}

function nodes() {
  return [...document.querySelectorAll(".workflow-node")];
}

function nodeById(id) {
  return document.querySelector(`.workflow-node[data-id="${id}"]`);
}

function drawConnections() {
  svg.innerHTML = "";
  connections.forEach(([from,to]) => {
    const a = nodeById(from), b = nodeById(to);
    if (!a || !b) return;

    const x1 = a.offsetLeft + a.offsetWidth;
    const y1 = a.offsetTop + a.offsetHeight - 25;
    const x2 = b.offsetLeft;
    const y2 = b.offsetTop + b.offsetHeight - 25;
    const mid = (x1 + x2) / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d",`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
    path.setAttribute("class","connection-path");
    svg.appendChild(path);
  });
}

function selectNode(node) {
  nodes().forEach(n => n.classList.remove("selected"));
  node.classList.add("selected");
  selectedId = Number(node.dataset.id);

  const title = node.querySelector("h4").textContent;
  const type = node.querySelector(".node-kind").textContent;
  document.getElementById("configSubtitle").textContent = type + " settings";

  config.innerHTML = `
    <div class="field">
      <label>Block name</label>
      <input id="editTitle" value="${title.replaceAll('"','&quot;')}">
    </div>
    <div class="field">
      <label>Instructions / Description</label>
      <textarea id="editDescription">${node.querySelector("p").textContent}</textarea>
    </div>
    <div class="field">
      <label>Execution mode</label>
      <select id="editMode">
        <option>Automatic</option>
        <option>Manual approval</option>
        <option>Run once</option>
      </select>
    </div>
    <div class="field">
      <label>Timeout</label>
      <select id="editTimeout">
        <option>30 seconds</option>
        <option>60 seconds</option>
        <option>120 seconds</option>
      </select>
    </div>
    <div class="field">
      <label>Block ID</label>
      <input value="node_${selectedId}" readonly>
    </div>
    <div class="field">
      <button class="btn secondary block" id="deleteNode">⌫ Delete component</button>
    </div>`;

  document.getElementById("deleteNode").addEventListener("click", deleteSelected);
}

nodes().forEach(node => {
  node.addEventListener("click", e => {
    if (e.target.closest(".node-menu")) {
      selectNode(node);
      return;
    }
    selectNode(node);
  });

  node.addEventListener("mousedown", e => {
    if (e.target.closest(".port") || e.target.closest(".node-menu")) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const left = node.offsetLeft;
    const top = node.offsetTop;

    function move(ev) {
      node.style.left = `${Math.max(0,left + (ev.clientX-startX)/zoom)}px`;
      node.style.top = `${Math.max(0,top + (ev.clientY-startY)/zoom)}px`;
      drawConnections();
    }

    function stop() {
      document.removeEventListener("mousemove",move);
      document.removeEventListener("mouseup",stop);
    }

    document.addEventListener("mousemove",move);
    document.addEventListener("mouseup",stop);
  });
});

function addNode(type,x,y) {
  const [kind,title,description] = definitions[type];
  const id = nextId++;
  const node = document.createElement("div");
  node.className = "workflow-node";
  node.dataset.id = id;
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  node.innerHTML = `
    <div class="node-top">
      <div class="node-icon ${type}">${({trigger:"⚡",llm:"✧",memory:"◫",condition:"⑂",loop:"⟳",tool:"⌘",output:"↗"})[type]}</div>
      <span class="node-kind">${kind.toUpperCase()}</span>
      <button class="node-menu">•••</button>
    </div>
    <h4>${title}</h4><p>${description}</p>
    <div class="node-footer"><span class="status-dot"></span> Ready
      <span class="port input-port" data-port="in"></span>
      <span class="port output-port" data-port="out"></span>
    </div>`;

  inner.appendChild(node);
  node.addEventListener("click", e => { e.stopPropagation(); selectNode(node); });
  node.addEventListener("mousedown", e => {
    if (e.target.closest(".port")) return;
    const sx=e.clientX, sy=e.clientY, l=node.offsetLeft, t=node.offsetTop;
    function move(ev) {
      node.style.left=`${Math.max(0,l+(ev.clientX-sx)/zoom)}px`;
      node.style.top=`${Math.max(0,t+(ev.clientY-sy)/zoom)}px`;
      drawConnections();
    }
    function stop() {
      document.removeEventListener("mousemove",move);
      document.removeEventListener("mouseup",stop);
    }
    document.addEventListener("mousemove",move);
    document.addEventListener("mouseup",stop);
  });
  selectNode(node);
  drawConnections();
  toast(`${kind} component added`);
}

document.querySelectorAll(".node-option").forEach(option => {
  option.addEventListener("dragstart", e => {
    e.dataTransfer.setData("nodeType",option.dataset.type);
  });
});

canvas.addEventListener("dragover", e => e.preventDefault());
canvas.addEventListener("drop", e => {
  e.preventDefault();
  const type = e.dataTransfer.getData("nodeType");
  if (!definitions[type]) return;
  const rect = inner.getBoundingClientRect();
  addNode(type,(e.clientX-rect.left)/zoom,(e.clientY-rect.top)/zoom);
});

document.getElementById("applyBtn").addEventListener("click",() => {
  const node = nodeById(selectedId);
  if (!node) return;
  const title = document.getElementById("editTitle").value.trim();
  const desc = document.getElementById("editDescription").value.trim();
  if (!title) return toast("Please enter a block name");
  node.querySelector("h4").textContent = title;
  node.querySelector("p").textContent = desc;
  toast("Configuration applied");
});

function deleteSelected() {
  if (!selectedId) return;
  nodeById(selectedId)?.remove();
  connections = connections.filter(c => c[0] !== selectedId && c[1] !== selectedId);
  selectedId = null;
  config.innerHTML = '<div class="empty-config"><div>✧</div><b>Select a component</b><p>Click any block to configure it.</p></div>';
  drawConnections();
  toast("Component deleted");
}

document.getElementById("resetBtn").addEventListener("click",() => {
  if (!confirm("Reset the workflow to its original layout?")) return;
  location.reload();
});

document.getElementById("saveBtn").addEventListener("click",() => {
  const data = {
    name: document.getElementById("agentName").value,
    nodes: nodes().map(n => ({
      id:n.dataset.id,
      title:n.querySelector("h4").textContent,
      description:n.querySelector("p").textContent,
      x:n.style.left,y:n.style.top
    })),
    connections
  };
  localStorage.setItem("nexusAgentDraft",JSON.stringify(data));
  document.getElementById("saveStatus").textContent = "● Draft saved locally";
  toast("Agent draft saved in this browser");
});

document.getElementById("runBtn").addEventListener("click",async e => {
  const button=e.currentTarget;
  button.disabled=true;
  button.textContent="⏳ Running...";
  const list=nodes();
  for (const node of list) {
    node.classList.add("running");
    await new Promise(resolve=>setTimeout(resolve,450));
    node.classList.remove("running");
  }
  button.disabled=false;
  button.textContent="▶ Run agent";
  toast("Workflow simulation completed");
});

document.getElementById("zoomIn").addEventListener("click",() => setZoom(zoom+.1));
document.getElementById("zoomOut").addEventListener("click",() => setZoom(zoom-.1));
document.getElementById("fitBtn").addEventListener("click",() => setZoom(1));
function setZoom(value) {
  zoom=Math.min(1.5,Math.max(.5,value));
  inner.style.transform=`scale(${zoom})`;
  document.getElementById("zoomLabel").textContent=`${Math.round(zoom*100)}%`;
}

document.getElementById("gridBtn").addEventListener("click",() => {
  canvas.style.backgroundImage = canvas.style.backgroundImage ? "" : "none";
});

document.getElementById("nodeSearch").addEventListener("input",e => {
  const q=e.target.value.toLowerCase();
  document.querySelectorAll(".node-option").forEach(item => {
    item.style.display=item.textContent.toLowerCase().includes(q)?"flex":"none";
  });
});

document.getElementById("collapseLibrary").addEventListener("click",() => {
  const library=document.querySelector(".node-library");
  library.style.display=library.style.display==="none"?"block":"none";
});

document.getElementById("closeConfig").addEventListener("click",() => {
  config.innerHTML='<div class="empty-config"><div>✧</div><b>Select a component</b><p>Click any block on the canvas to configure it.</p></div>';
  nodes().forEach(n=>n.classList.remove("selected"));
  selectedId=null;
});

document.getElementById("moreBtn").addEventListener("click",() => toast("Agent options"));
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click",() => {
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    if(tab.textContent.includes("Settings")) toast("Workflow settings view");
  });
});

drawConnections();
