const toast = document.getElementById("toast");


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* CREATE TASK */

function addTask() {

    const waiting =
        document.getElementById("waiting");

    let number =
        parseInt(waiting.textContent);

    waiting.textContent = number + 1;

    showToast("New task added to queue");
}


/* SORT */

function sortTasks(type) {

    if (type === "priority") {

        showToast("Sorted by priority");

    } else {

        showToast("Sorted by recent activity");
    }
}


/* LIVE QUEUE UPDATE */

setInterval(() => {

    const progressBars =
        document.querySelectorAll(
            ".progress span"
        );


    progressBars.forEach(bar => {

        let current =
            parseInt(bar.style.width);

        if (current < 100) {

            current += Math.floor(
                Math.random() * 5
            );

            if (current > 100) {
                current = 100;
            }

            bar.style.width =
                current + "%";
        }

    });

}, 4000);