const agentName = document.getElementById("agentName");
const agentDescription = document.getElementById("agentDescription");
const model = document.getElementById("model");
const responseStyle = document.getElementById("responseStyle");
const temperature = document.getElementById("temperature");
const temperatureValue = document.getElementById("temperatureValue");
const instructions = document.getElementById("instructions");

const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");

const toast = document.getElementById("toast");
const statusMessage = document.getElementById("statusMessage");


/* =========================
   TEMPERATURE SLIDER
========================= */

temperature.addEventListener("input", function () {
    temperatureValue.textContent = temperature.value;
});


/* =========================
   SAVE CONFIGURATION
========================= */

saveBtn.addEventListener("click", function () {

    showToast("Configuration saved successfully!");

    statusMessage.textContent = "Saved just now";

});


/* =========================
   RESET CONFIGURATION
========================= */

resetBtn.addEventListener("click", function () {

    agentName.value = "Research Assistant";

    agentDescription.value =
        "AI Research & Analysis Agent";

    model.value = "gpt";

    responseStyle.value = "balanced";

    temperature.value = "0.7";

    temperatureValue.textContent = "0.7";

    instructions.value =
        "You are a helpful AI research assistant. Provide accurate, clear and well-structured responses.";

    statusMessage.textContent = "";

    showToast("Configuration reset.");

});


/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}