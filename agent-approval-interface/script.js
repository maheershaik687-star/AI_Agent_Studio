/* =========================
   ELEMENTS
========================= */

const approvalCards =
    document.querySelectorAll(".approval-card");

const approveButtons =
    document.querySelectorAll(".approve-btn");

const rejectButtons =
    document.querySelectorAll(".reject-btn");

const searchInput =
    document.getElementById("searchInput");

const filterSelect =
    document.getElementById("filterSelect");

const resetBtn =
    document.getElementById("resetBtn");

const pendingCount =
    document.getElementById("pendingCount");

const approvedCount =
    document.getElementById("approvedCount");

const rejectedCount =
    document.getElementById("rejectedCount");

const emptyState =
    document.getElementById("emptyState");

const toast =
    document.getElementById("toast");


/* =========================
   ORIGINAL STATE
========================= */

const originalRequests = [
    {
        title: "External API Data Request",
        status: "pending"
    },
    {
        title: "File Export Request",
        status: "pending"
    },
    {
        title: "Database Update Request",
        status: "pending"
    }
];


/* =========================
   UPDATE COUNTS
========================= */

function updateCounts() {

    let pending = 0;
    let approved = 0;
    let rejected = 0;


    approvalCards.forEach(function (card) {

        const status =
            card.dataset.status;


        if (status === "pending") {
            pending++;
        }

        if (status === "approved") {
            approved++;
        }

        if (status === "rejected") {
            rejected++;
        }

    });


    pendingCount.textContent =
        pending;

    approvedCount.textContent =
        approved;

    rejectedCount.textContent =
        rejected;
}


/* =========================
   CHANGE REQUEST STATUS
========================= */

function changeRequestStatus(card, newStatus) {

    card.dataset.status =
        newStatus;


    const statusBadge =
        card.querySelector(".status");


    statusBadge.textContent =
        newStatus.charAt(0).toUpperCase() +
        newStatus.slice(1);


    statusBadge.className =
        "status " + newStatus;


    const actions =
        card.querySelector(".approval-actions");


    if (newStatus === "pending") {

        actions.style.display =
            "flex";

    } else {

        actions.style.display =
            "none";
    }


    updateCounts();

    applyFilters();
}


/* =========================
   APPROVE BUTTONS
========================= */

approveButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const card =
                button.closest(".approval-card");


            changeRequestStatus(
                card,
                "approved"
            );


            showToast(
                "Request approved successfully."
            );

        }
    );

});


/* =========================
   REJECT BUTTONS
========================= */

rejectButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const card =
                button.closest(".approval-card");


            changeRequestStatus(
                card,
                "rejected"
            );


            showToast(
                "Request rejected."
            );

        }
    );

});


/* =========================
   SEARCH + FILTER
========================= */

function applyFilters() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedFilter =
        filterSelect.value;


    let visibleCards = 0;


    approvalCards.forEach(function (card) {

        const title =
            card.dataset.title
                .toLowerCase();


        const status =
            card.dataset.status;


        const matchesSearch =
            title.includes(searchTerm);


        const matchesFilter =
            selectedFilter === "all" ||
            status === selectedFilter;


        if (
            matchesSearch &&
            matchesFilter
        ) {

            card.style.display =
                "block";

            visibleCards++;

        } else {

            card.style.display =
                "none";
        }

    });


    if (visibleCards === 0) {

        emptyState.classList.add("show");

    } else {

        emptyState.classList.remove("show");
    }
}


searchInput.addEventListener(
    "input",
    applyFilters
);


filterSelect.addEventListener(
    "change",
    applyFilters
);


/* =========================
   RESET
========================= */

resetBtn.addEventListener(
    "click",
    function () {

        approvalCards.forEach(
            function (card, index) {

                card.dataset.status =
                    originalRequests[index].status;


                const statusBadge =
                    card.querySelector(".status");


                statusBadge.textContent =
                    "Pending";


                statusBadge.className =
                    "status pending";


                const actions =
                    card.querySelector(
                        ".approval-actions"
                    );


                actions.style.display =
                    "flex";

            }
        );


        searchInput.value =
            "";

        filterSelect.value =
            "all";


        updateCounts();

        applyFilters();


        showToast(
            "Approval requests reset."
        );

    }
);


/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
}


/* =========================
   INITIAL LOAD
========================= */

updateCounts();

applyFilters();