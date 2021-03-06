import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from "./firebase.js";
const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {

  // querySnapshot son los datos que existen en este momento

  onGetTasks((querySnapShot) => {
    tasksContainer.innerHTML = '';
    querySnapShot.forEach(doc => {
      const task = doc.data();
      tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
            <h3 class="h5">${task.title}</h3>
            <p>${task.description}</p>
            <div>
              <button class='btn btn-primary btn-edit' data-id=${doc.id}>Edit</button>  
              <button class='btn btn-secondary btn-delete' data-id=${doc.id}>Delete</button>  
            </div>
        </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      })
    });

    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id);
        const task = doc.data();
        taskForm['task-title'].value = task.title;
        taskForm['task-description'].value = task.description;
        taskForm['task-save'].innerText = 'Update!';
        id = dataset.id;
        editStatus = true;
      })
    })
  })

});



taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = taskForm['task-title'];
  const description = taskForm['task-description'];

  if (!editStatus) {
    saveTask(title.value, description.value);
  } else {
    updateTask(id, {
      title: title.value,
      description: description.value
    });
    id = '';
    taskForm['task-save'].innerText = 'Save';
  }

  taskForm.reset();
});
