$(document).ready(function () {

    loadTasks();
    updateStatus();

    // Add task
    $("#addBtn").click(function () {
        let taskText = $("#taskInput").val().trim();
        if (taskText === "") return;

        addTask(taskText, false);
        $("#taskInput").val("");
        saveTasks();
        updateStatus();
    });

    // Add task function
    function addTask(text, completed) {
        let li = `
            <li>
                <input type="checkbox" class="toggle" ${completed ? "checked" : ""}>
                <span class="task ${completed ? "completed" : ""}">${text}</span>
                <div class="actions">
                    <span class="edit">✏️</span>
                    <span class="delete">❌</span>
                </div>
            </li>
        `;
        $("#taskList").append(li);
    }

    // Delete task
    $("#taskList").on("click", ".delete", function () {
        $(this).closest("li").remove();
        saveTasks();
        updateStatus();
    });

    // Edit task
    $("#taskList").on("click", ".edit", function () {
        let taskSpan = $(this).closest("li").find(".task");
        let newText = prompt("Edit task:", taskSpan.text());
        if (newText !== null && newText.trim() !== "") {
            taskSpan.text(newText);
            saveTasks();
        }
    });

    // Toggle complete
    $("#taskList").on("change", ".toggle", function () {
        $(this).siblings(".task").toggleClass("completed");
        saveTasks();
        updateStatus();
    });

    // Save to localStorage
    function saveTasks() {
        let tasks = [];
        $("#taskList li").each(function () {
            tasks.push({
                text: $(this).find(".task").text(),
                completed: $(this).find(".toggle").is(":checked")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load from localStorage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    // Update status message
    function updateStatus() {
        let total = $("#taskList li").length;
        let pending = $("#taskList li").find(".toggle:not(:checked)").length;

        if (total === 0) {
            $("#statusMsg").text("No pending task");
        } else {
            $("#statusMsg").text("You have " + pending + " pending task(s)");
        }
    }

});
