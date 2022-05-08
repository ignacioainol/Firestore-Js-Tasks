import { saveTask, getTasks } from "./firebase.js";

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

window.addEventListener('DOMContentLoaded', async () => {

  // querySnapshot son los datos que existen en este momento
  const querySnapShot = await getTasks();

  let html = '';
  querySnapShot.forEach(doc => {
    const task = doc.data();
    html += `
      <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
      </div>`;
  });

  taskContainer.innerHTML = html;
});



taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = taskForm['task-title'];
  const description = taskForm['task-description'];

  saveTask(title.value, description.value);
  taskForm.reset();
});
