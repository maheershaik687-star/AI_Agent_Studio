function toggleRule(button) {
    if (button.textContent === "Active") {
        button.textContent = "Inactive";
        button.classList.add("off");
    } else {
        button.textContent = "Active";
        button.classList.remove("off");
    }
}

function searchRules() {
    const text = document.getElementById("search").value.toLowerCase();
    const rules = document.querySelectorAll(".rule");

    rules.forEach(function (rule) {
        rule.style.display = rule.textContent.toLowerCase().includes(text) ? "flex" : "none";
    });
}
