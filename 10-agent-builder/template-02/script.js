
const steps = [
  {icon:"✦",title:"Give your agent an identity",description:"Start with a name and purpose for your AI assistant."},
  {icon:"◈",title:"Choose your AI model",description:"Select the intelligence that powers your agent."},
  {icon:"⌘",title:"Define agent behavior",description:"Set instructions, creativity, and memory preferences."},
  {icon:"⚡",title:"Connect your tools",description:"Choose the capabilities your agent can use."},
  {icon:"✓",title:"Review your configuration",description:"Check your settings before completing the setup."}
];

let currentStep=1;
let selectedAvatar="✦";
let selectedCategory="Customer Support";
let selectedModel="GPT-4o mini";
let temperature=0.7;
let memory=true;
let selectedTools=[];

const $=id=>document.getElementById(id);

function toast(message){
  const box=$("toast");
  box.textContent=message;
  box.classList.add("show");
  setTimeout(()=>box.classList.remove("show"),2200);
}

function updatePreview(){
  $("previewName").textContent=$("agentName").value||"Your AI Agent";
  $("previewDescription").textContent=$("agentDescription").value||"Your agent description will appear here.";
  $("previewAvatar").textContent=selectedAvatar;
  $("previewCategory").textContent="◉ "+selectedCategory;
  $("summaryModel").textContent=selectedModel;
  $("summaryTemperature").textContent=temperature.toFixed(1);
  $("summaryTools").textContent=selectedTools.length+" tools";
  $("summaryMemory").textContent=memory?"Enabled":"Disabled";
}

function renderStep(){
  const info=steps[currentStep-1];
  $("stepIcon").textContent=info.icon;
  $("stepCount").textContent=`STEP 0${currentStep} OF 05`;
  $("stepTitle").textContent=info.title;
  $("stepDescription").textContent=info.description;
  $("stepProgressText").textContent=`${currentStep} of 5 steps`;
  $("backBtn").disabled=currentStep===1;
  $("nextBtn").innerHTML=currentStep===5?"✓ Create agent <span>→</span>":"Continue <span>→</span>";

  document.querySelectorAll(".step").forEach((step,index)=>{
    step.classList.toggle("active",index+1===currentStep);
    step.classList.toggle("completed",index+1<currentStep);
    step.querySelector(".step-circle").textContent=index+1<currentStep?"✓":index+1;
  });

  if(currentStep===1) renderIdentity();
  if(currentStep===2) renderModel();
  if(currentStep===3) renderBehavior();
  if(currentStep===4) renderTools();
  if(currentStep===5) renderReview();
  updatePreview();
}

function renderIdentity(){
  $("stepContent").innerHTML=`
    <div class="field">
      <label>Agent name <span>*</span></label>
      <input id="agentName" maxlength="50" value="${escapeHTML(agentData.name)}" placeholder="Enter agent name">
      <small>Choose a clear name for your AI assistant.</small>
    </div>
    <div class="field">
      <label>Short description <span>*</span></label>
      <textarea id="agentDescription" maxlength="220" rows="3">${escapeHTML(agentData.description)}</textarea>
      <small>Explain the main purpose of your agent.</small>
    </div>
    <div class="field">
      <label>Choose an avatar</label>
      <div class="avatar-picker">
        ${["✦","🤖","◈","⚡","✧","◎"].map(a=>`<button class="avatar-choice ${selectedAvatar===a?"selected":""}" data-avatar="${a}">${a}</button>`).join("")}
      </div>
    </div>
    <div class="field">
      <label>Agent category</label>
      <div class="category-grid">
        ${["Customer Support","Research","Productivity","Development","Marketing","Other"].map(c=>`<button class="category ${selectedCategory===c?"selected":""}" data-category="${c}">${c}</button>`).join("")}
      </div>
    </div>`;

  $("agentName").addEventListener("input",e=>{agentData.name=e.target.value;updatePreview();});
  $("agentDescription").addEventListener("input",e=>{agentData.description=e.target.value;updatePreview();});

  document.querySelectorAll("[data-avatar]").forEach(btn=>btn.addEventListener("click",()=>{
    selectedAvatar=btn.dataset.avatar;
    renderIdentity();
    updatePreview();
  }));

  document.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{
    selectedCategory=btn.dataset.category;
    renderIdentity();
    updatePreview();
  }));
}

function renderModel(){
  $("stepContent").innerHTML=`
    <div class="field">
      <label>Select AI model</label>
      <div class="choice-grid">
        ${[
          ["GPT-4o mini","✧","Fast and efficient for everyday tasks."],
          ["GPT-4o","◈","Advanced reasoning and complex workflows."],
          ["Claude Sonnet","◎","Useful for writing and analysis."],
          ["Gemini Flash","⚡","Fast multimodal capabilities."]
        ].map(m=>`<button class="model-card ${selectedModel===m[0]?"selected":""}" data-model="${m[0]}"><span class="model-symbol">${m[1]}</span><b>${m[0]}</b><p>${m[2]}</p></button>`).join("")}
      </div>
    </div>
    <div class="field">
      <div class="range-row"><label>Temperature / Creativity</label><b id="temperatureValue">${temperature.toFixed(1)}</b></div>
      <input type="range" id="temperature" min="0" max="1" step="0.1" value="${temperature}">
      <small>Lower values are more consistent. Higher values allow more variation.</small>
    </div>
    <div class="field">
      <label>Maximum response length</label>
      <select id="responseLength">
        <option>Short</option><option selected>Medium</option><option>Long</option>
      </select>
    </div>`;

  document.querySelectorAll("[data-model]").forEach(btn=>btn.addEventListener("click",()=>{
    selectedModel=btn.dataset.model;
    renderModel();
    updatePreview();
  }));

  $("temperature").addEventListener("input",e=>{
    temperature=Number(e.target.value);
    $("temperatureValue").textContent=temperature.toFixed(1);
    updatePreview();
  });
}

function renderBehavior(){
  $("stepContent").innerHTML=`
    <div class="field">
      <label>System instructions <span>*</span></label>
      <textarea id="instructions" rows="7" placeholder="You are a helpful AI assistant...">${escapeHTML(agentData.instructions)}</textarea>
      <small>Explain how the agent should behave, respond, and handle requests.</small>
    </div>
    <div class="field">
      <label>Personality</label>
      <select id="personality">
        <option>Professional and helpful</option>
        <option>Friendly and conversational</option>
        <option>Concise and direct</option>
        <option>Creative and expressive</option>
      </select>
    </div>
    <div class="toggle-row"><div><b>Conversation memory</b><small>Remember context during conversations.</small></div><button class="toggle ${memory?"on":""}" id="memoryToggle"><i></i></button></div>
    <div class="toggle-row"><div><b>Require approval for actions</b><small>Ask for confirmation before sensitive actions.</small></div><button class="toggle on" id="approvalToggle"><i></i></button></div>`;

  $("instructions").addEventListener("input",e=>agentData.instructions=e.target.value);
  $("memoryToggle").addEventListener("click",()=>{
    memory=!memory;
    renderBehavior();
    updatePreview();
  });
  $("approvalToggle").addEventListener("click",e=>e.currentTarget.classList.toggle("on"));
}

function renderTools(){
  const tools=[
    ["Web Search","Search the web for current information","⌕"],
    ["Knowledge Base","Retrieve information from documents","▤"],
    ["Email","Draft and send email messages","✉"],
    ["Calendar","Read and manage calendar events","◷"],
    ["Database","Query connected database records","▦"],
    ["HTTP API","Connect to external services","⌘"]
  ];

  $("stepContent").innerHTML=`
    <div class="field">
      <label>Available integrations</label>
      <small>Select the tools your agent may use.</small>
    </div>
    ${tools.map(t=>`
      <label class="tool-choice">
        <input type="checkbox" data-tool="${t[0]}" ${selectedTools.includes(t[0])?"checked":""}>
        <span>${t[2]}</span>
        <div><b>${t[0]}</b><small>${t[1]}</small></div>
      </label>`).join("")}
    <div class="preview-note"><span>✧</span><div><b>Permission reminder</b><p>Only enable tools that your agent needs. Real integrations require backend authorization.</p></div></div>`;

  document.querySelectorAll("[data-tool]").forEach(input=>input.addEventListener("change",()=>{
    const tool=input.dataset.tool;
    selectedTools=input.checked?[...selectedTools,tool]:selectedTools.filter(t=>t!==tool);
    updatePreview();
  }));
}

function renderReview(){
  $("stepContent").innerHTML=`
    <div class="review-box">
      <h4>✦ Agent identity</h4>
      <div class="review-row"><span>Name</span><b>${escapeHTML(agentData.name)}</b></div>
      <div class="review-row"><span>Category</span><b>${selectedCategory}</b></div>
      <div class="review-row"><span>Description</span><b>${escapeHTML(agentData.description)}</b></div>
    </div>
    <div class="review-box">
      <h4>◈ Model & behavior</h4>
      <div class="review-row"><span>Model</span><b>${selectedModel}</b></div>
      <div class="review-row"><span>Temperature</span><b>${temperature.toFixed(1)}</b></div>
      <div class="review-row"><span>Memory</span><b>${memory?"Enabled":"Disabled"}</b></div>
    </div>
    <div class="review-box">
      <h4>⌘ Connected tools</h4>
      <div class="review-row"><span>Selected integrations</span><b>${selectedTools.length?selectedTools.join(", "):"No tools selected"}</b></div>
    </div>
    <div class="preview-note"><span>✓</span><div><b>Ready for setup</b><p>Click Create agent to complete this frontend configuration demo.</p></div></div>`;
}

let agentData={
  name:"Customer Support Assistant",
  description:"An intelligent assistant that answers customer questions and helps resolve support requests.",
  instructions:"You are a helpful customer support assistant. Answer clearly, politely, and accurately. Ask clarifying questions when necessary. Do not invent information."
};

function escapeHTML(value){
  return String(value).replace(/[&<>"']/g,char=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[char]);
}

function validateStep(){
  if(currentStep===1){
    agentData.name=$("agentName").value.trim();
    agentData.description=$("agentDescription").value.trim();
    if(!agentData.name||!agentData.description){
      toast("Please complete the required identity fields.");
      return false;
    }
  }
  if(currentStep===3){
    agentData.instructions=$("instructions").value.trim();
    if(!agentData.instructions){
      toast("Please enter system instructions.");
      return false;
    }
  }
  return true;
}

$("nextBtn").addEventListener("click",()=>{
  if(!validateStep())return;
  if(currentStep<5){
    currentStep++;
    renderStep();
  }else{
    $("successMessage").textContent=`${agentData.name} has been configured with ${selectedModel}. This is a frontend demo; no live agent has been deployed.`;
    $("successModal").classList.add("show");
  }
});

$("backBtn").addEventListener("click",()=>{
  if(currentStep>1){currentStep--;renderStep();}
});

$("finishBtn").addEventListener("click",()=>{
  $("successModal").classList.remove("show");
  toast("Configuration completed!");
});

$("exitBtn").addEventListener("click",()=>{
  if(confirm("Exit the agent builder? Unsaved changes may be lost."))toast("You can return to the builder anytime.");
});

$("upgradeBtn").addEventListener("click",()=>toast("Plan information is a demo feature."));

document.querySelectorAll(".step").forEach(step=>{
  step.addEventListener("click",()=>{
    const target=Number(step.dataset.step);
    if(target<currentStep){currentStep=target;renderStep();}
  });
});

$("autosave").textContent="● Ready to configure";

renderStep();
