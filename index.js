import { jobs } from "./data.js";

const tasksEl = document.getElementById("tasks");
const tasksSelected = document.getElementById("tasks-selected");
const totalAmount = document.getElementById("total-amount");
const tasksArray = [];
const tasksPrices = [];

jobs.forEach(function ({ name, price, id }) {
  tasksEl.innerHTML += `
    <button class="task" data-add="${id}">${name} $${price}</button>
    `;
});

document.addEventListener("click", function (e) {
  if (!tasksArray.includes(jobs[e.target.dataset.add])) {
    tasksArray.push(jobs[e.target.dataset.add]);
    tasksPrices.push(jobs[e.target.dataset.add].price);
    showSelectedTasks(tasksArray);
    showTotalAmount(tasksPrices);
    console.log(jobs[e.target.dataset.add]);
  }
});

function showSelectedTasks(arr) {
  let taskHtml = "";

  arr.forEach(function ({ name, price }) {
    taskHtml += `
    <div>
        <p>${name}</p>
        <p>$${price}</p>
    </div>`;
  });

  tasksSelected.innerHTML = taskHtml;
}

function showTotalAmount(arr) {
  let total = arr.reduce((a, b) => a + b, 0);

  totalAmount.innerHTML = `$${total}`;
}
