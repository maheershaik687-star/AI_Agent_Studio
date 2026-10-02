function toggleTheme() {

    document.body.classList.toggle("dark");

    const button = document.querySelector(".theme-btn");

    if (document.body.classList.contains("dark")) {

        button.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        button.textContent = "🌙";

        localStorage.setItem("theme", "light");
    }
}


window.addEventListener("DOMContentLoaded", () => {

    const savedTheme = localStorage.getItem("theme");

    const button = document.querySelector(".theme-btn");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (button) {
            button.textContent = "☀️";
        }
    }

});