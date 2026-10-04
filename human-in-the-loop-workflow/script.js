/* =========================================================
   AGENT STUDIO - HUMAN-IN-THE-LOOP WORKFLOW
   ========================================================= */


/* ==================== ELEMENTS ==================== */

const approveBtn = document.getElementById("approveBtn");
const rejectBtn = document.getElementById("rejectBtn");
const changesBtn = document.getElementById("changesBtn");
const resetBtn = document.getElementById("resetBtn");

const pendingCount = document.getElementById("pendingCount");
const progressCount = document.getElementById("progressCount");
const completedCount = document.getElementById("completedCount");

const workflowStatus = document.getElementById("workflowStatus");

const stepReview = document.getElementById("stepReview");
const stepAction = document.getElementById("stepAction");

const toast = document.getElementById("toast");


/* ==================== INITIAL STATE ==================== */

function resetWorkflowState() {

    pendingCount.textContent = "1";
    progressCount.textContent = "0";
    completedCount.textContent = "0";

    workflowStatus.textContent = "Waiting for Review";

    workflowStatus.classList.remove(
        "approved-badge",
        "rejected-badge",
        "changes-badge"
    );

    workflowStatus.classList.add("pending-badge");

    stepReview.classList.remove(
        "completed-step"
    );

    stepReview.classList.add(
        "active-step"
    );

    stepAction.classList.remove(
        "completed-step",
        "active-step"
    );

    approveBtn.disabled = false;
    rejectBtn.disabled = false;
    changesBtn.disabled = false;

    approveBtn.textContent = "Approve & Continue";
    rejectBtn.textContent = "Reject";
    changesBtn.textContent = "Request Changes";

    clearDecisionMessage();

}


/* ==================== TOAST ==================== */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* ==================== DECISION MESSAGE ==================== */

function clearDecisionMessage() {

    const existingMessage =
        document.querySelector(".decision-message");

    if (existingMessage) {
        existingMessage.remove();
    }

}


function showDecisionMessage(message, type) {

    clearDecisionMessage();

    const messageBox =
        document.createElement("div");

    messageBox.className =
        "decision-message " + type;

    messageBox.textContent = message;

    const reviewCard =
        document.querySelector(".review-card");

    const actions =
        document.querySelector(".review-actions");

    reviewCard.insertBefore(
        messageBox,
        actions
    );

}


/* ==================== APPROVE ==================== */

approveBtn.addEventListener(
    "click",
    function () {

        pendingCount.textContent = "0";

        progressCount.textContent = "1";

        completedCount.textContent = "0";

        workflowStatus.textContent =
            "Approved - Executing";

        workflowStatus.classList.remove(
            "pending-badge",
            "rejected-badge",
            "changes-badge"
        );

        workflowStatus.classList.add(
            "approved-badge"
        );


        /* Human Review completed */

        stepReview.classList.remove(
            "active-step"
        );

        stepReview.classList.add(
            "completed-step"
        );


        /* Execution becomes active */

        stepAction.classList.add(
            "active-step"
        );


        approveBtn.disabled = true;
        rejectBtn.disabled = true;
        changesBtn.disabled = true;


        showDecisionMessage(
            "Approved. The agent can now continue with the proposed action.",
            "success-message"
        );


        showToast(
            "Action approved successfully."
        );

    }
);


/* ==================== REJECT ==================== */

rejectBtn.addEventListener(
    "click",
    function () {

        pendingCount.textContent = "0";

        progressCount.textContent = "0";

        completedCount.textContent = "0";


        workflowStatus.textContent =
            "Rejected";


        workflowStatus.classList.remove(
            "pending-badge",
            "approved-badge",
            "changes-badge"
        );

        workflowStatus.classList.add(
            "rejected-badge"
        );


        stepReview.classList.remove(
            "active-step"
        );

        stepReview.classList.add(
            "completed-step"
        );


        stepAction.classList.remove(
            "active-step",
            "completed-step"
        );


        approveBtn.disabled = true;
        rejectBtn.disabled = true;
        changesBtn.disabled = true;


        showDecisionMessage(
            "The proposed action was rejected and will not be executed.",
            "rejected-message"
        );


        showToast(
            "Action rejected."
        );

    }
);


/* ==================== REQUEST CHANGES ==================== */

changesBtn.addEventListener(
    "click",
    function () {

        pendingCount.textContent = "1";

        progressCount.textContent = "0";

        completedCount.textContent = "0";


        workflowStatus.textContent =
            "Changes Requested";


        workflowStatus.classList.remove(
            "pending-badge",
            "approved-badge",
            "rejected-badge"
        );

        workflowStatus.classList.add(
            "changes-badge"
        );


        stepReview.classList.remove(
            "active-step"
        );

        stepReview.classList.add(
            "completed-step"
        );


        stepAction.classList.remove(
            "active-step",
            "completed-step"
        );


        approveBtn.disabled = true;
        rejectBtn.disabled = true;
        changesBtn.disabled = true;


        showDecisionMessage(
            "Changes have been requested. The agent must update the proposal before review.",
            "changes-message"
        );


        showToast(
            "Changes requested."
        );

    }
);


/* ==================== RESET ==================== */

resetBtn.addEventListener(
    "click",
    function () {

        resetWorkflowState();

        showToast(
            "Workflow reset successfully."
        );

    }
);


/* ==================== INITIALIZE ==================== */

resetWorkflowState();