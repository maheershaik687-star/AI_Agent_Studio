function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


function runAgent() {

    showToast(
        "Research Bot started successfully!"
    );

}


function messageAgent() {

    showToast(
        "Opening agent conversation..."
    );

}


function goBack() {

    window.history.back();

}