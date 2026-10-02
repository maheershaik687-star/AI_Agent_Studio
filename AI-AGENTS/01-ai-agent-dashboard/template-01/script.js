const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", () => {

    refreshBtn.textContent = "Refreshing...";

    setTimeout(() => {

        refreshBtn.textContent = "✓ Updated";

        setTimeout(() => {
            refreshBtn.textContent = "↻ Refresh";
        }, 1200);

    }, 800);

});