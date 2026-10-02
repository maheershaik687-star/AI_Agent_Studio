function updatePreview() {
    const trigger = document.getElementById("trigger").value;
    const condition = document.getElementById("condition").value;
    const action = document.getElementById("action").value;

    document.getElementById("preview").innerHTML =
        '<div class="flow">' +
        '<div class="box">TRIGGER<br><b>' + trigger + '</b></div>' +
        '<div class="arrow">→</div>' +
        '<div class="box">CONDITION<br><b>' + condition + '</b></div>' +
        '<div class="arrow">→</div>' +
        '<div class="box">ACTION<br><b>' + action + '</b></div>' +
        '</div>';
}

function saveWorkflow() {
    const name = document.getElementById("name").value;
    document.getElementById("saved").textContent = name + " saved successfully.";
}

updatePreview();
