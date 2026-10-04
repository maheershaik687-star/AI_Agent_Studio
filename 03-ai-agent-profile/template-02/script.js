function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


function saveChanges() {

    const name =
        document.getElementById("agentName").value;

    if (name.trim() === "") {

        showToast(
            "Agent name cannot be empty."
        );

        return;

    }

    showToast(
        "Changes saved successfully."
    );

}


function deleteAgent() {

    const confirmed =
        confirm(
            "Are you sure you want to delete this agent?"
        );

    if (confirmed) {

        showToast(
            "Agent deletion requested."
        );

    }

}