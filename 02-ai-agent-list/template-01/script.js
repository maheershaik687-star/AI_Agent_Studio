const searchInput =
    document.getElementById("searchInput");

const agentCards =
    document.querySelectorAll(".agent-card");

const filterButtons =
    document.querySelectorAll(".filter");


let currentFilter = "all";


function filterAgents() {

    const searchTerm =
        searchInput.value.toLowerCase();

    agentCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const status =
            card.dataset.status;

        const matchesSearch =
            name.includes(searchTerm);

        const matchesFilter =
            currentFilter === "all" ||
            status === currentFilter;

        if (matchesSearch && matchesFilter) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


searchInput.addEventListener(
    "input",
    filterAgents
);


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        filterAgents();

    });

});


function openAgent(name) {

    alert(
        "Opening " + name + " profile..."
    );

}


function addAgent() {

    alert(
        "New Agent creation panel will open here."
    );

}