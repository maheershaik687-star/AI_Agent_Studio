const permissionToggles = document.querySelectorAll(".permission-toggle");
const permissionCount = document.getElementById("permissionCount");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const accessLevel = document.getElementById("accessLevel");
const toast = document.getElementById("toast");

function updatePermissionCount() {
    const enabledPermissions = document.querySelectorAll(
        ".permission-toggle:checked"
    ).length;

    permissionCount.textContent = enabledPermissions;
}

permissionToggles.forEach((toggle) => {
    toggle.addEventListener("change", updatePermissionCount);
});

saveBtn.addEventListener("click", function () {
    showToast("Permissions saved successfully!");
});

resetBtn.addEventListener("click", function () {
    permissionToggles.forEach((toggle) => {
        const permission = toggle.dataset.permission;

        toggle.checked =
            permission === "Web Search" ||
            permission === "File Access";
    });

    accessLevel.value = "standard";

    updatePermissionCount();
    showToast("Permissions reset.");
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

updatePermissionCount();