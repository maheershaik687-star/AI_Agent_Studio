function startWorkflow() {
    const steps = [1, 2, 3, 4];
    document.getElementById("message").textContent = "";

    steps.forEach(function (number, index) {
        setTimeout(function () {
            const step = document.getElementById("step" + number);
            step.classList.add("active");
            step.querySelector("span").textContent = "Running";

            setTimeout(function () {
                step.classList.remove("active");
                step.classList.add("done");
                step.querySelector("span").textContent = "Completed";

                if (number === 4) {
                    document.getElementById("message").textContent = "Workflow completed successfully.";
                }
            }, 700);
        }, index * 900);
    });
}
