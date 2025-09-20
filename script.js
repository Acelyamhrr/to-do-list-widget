// Éléments DOM
const newTask = document.getElementById('newTask');
const addBtn = document.getElementById('addBtn');
const tasks = document.getElementById('tasks');

// Configuration de la date
const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
const dayNumber = today.getDate().toString().padStart(2, '0');
const monthName = today.toLocaleDateString("en-US", { month: "long" }).toUpperCase();

document.getElementById("dayName").textContent = dayName;
document.getElementById("dayNumber").textContent = dayNumber;
document.getElementById("monthName").textContent = monthName;

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const progressPercent = total === 0 ? 0 : (checked / total) * 100;
    
    document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    const label = document.getElementById("progress-label");
    label.textContent = `${checked} / ${total} tasks done`;

    // Gestion de l'état vide
    const emptyState = tasks.querySelector('.empty-state');
    if (total === 0) {
        if (!emptyState) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.innerHTML = 'No tasks yet.<br>Add one above to get started!';
            tasks.appendChild(emptyDiv);
        }
    } else {
        if (emptyState) {
            emptyState.remove();
        }
    }
}

// Fonction pour ajouter une tâche
function addTask() {
    const taskText = newTask.value.trim();
    if (taskText !== '') {
        const task = document.createElement("div");
        task.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            task.classList.toggle('completed', checkbox.checked);
            updateProgress();
        });

        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;
        textSpan.className = "taskText";

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        const removeIcon = document.createElement("span");
        removeIcon.className = "remove-icon";
        removeIcon.textContent = "✕";
        removeBtn.appendChild(removeIcon);
        
        removeBtn.addEventListener("click", () => {
            task.style.animation = "fadeOut 0.3s ease-out forwards";
            setTimeout(() => {
                task.remove();
                updateProgress();
            }, 300);
        });

        task.appendChild(checkbox);
        task.appendChild(textSpan);
        task.appendChild(removeBtn);
        tasks.appendChild(task);
        
        newTask.value = "";
        updateProgress();
    }
}

// Événements
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

newTask.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

// Initialisation
updateProgress();