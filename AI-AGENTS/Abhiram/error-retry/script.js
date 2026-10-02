function retryTask(id, button) {
    button.disabled = true;
    button.textContent = "Retrying...";

    setTimeout(function () {
        const card = document.getElementById(id);
        card.querySelector(".error").textContent = "Success";
        card.querySelector(".error").style.background = "#e5f8ea";
        card.querySelector(".error").style.color = "#23833f";
        button.textContent = "Completed";
    }, 1200);
}
