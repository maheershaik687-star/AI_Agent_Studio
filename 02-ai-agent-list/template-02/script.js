const search =
    document.getElementById("search");

const table =
    document.getElementById("agentTable");

const sortSelect =
    document.getElementById("sortSelect");


search.addEventListener("input", () => {

    const value =
        search.value.toLowerCase();

    const rows =
        table.querySelectorAll("tr");

    rows.forEach(row => {

        const name =
            row.dataset.name.toLowerCase();

        if (name.includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});


sortSelect.addEventListener("change", () => {

    const rows =
        Array.from(
            table.querySelectorAll("tr")
        );

    const type =
        sortSelect.value;

    rows.sort((a, b) => {

        if (type === "name") {

            return a.dataset.name.localeCompare(
                b.dataset.name
            );

        }

        return (
            Number(b.dataset.success) -
            Number(a.dataset.success)
        );

    });

    rows.forEach(row => {
        table.appendChild(row);
    });

});


function createAgent() {

    alert(
        "Create Agent window will open here."
    );

}


function showMenu(agentName) {

    alert(
        "Actions for " +
        agentName +
        "\n\n" +
        "• View Profile\n" +
        "• Edit Agent\n" +
        "• Pause Agent"
    );

}