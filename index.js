import { jobs } from "./data.js";

const tasksEl = document.getElementById("tasks");
const tasksSelected = document.getElementById("tasks-selected");
const totalAmount = document.getElementById("total-amount");
const tasksArray = [];
let tasksPrices = [];

jobs.forEach(function ({ name, price, id }) {
  tasksEl.innerHTML += `
    <button class="task" data-add="${id}">${name} $${price}</button>
    `;
});

document.addEventListener("click", function (e) {
  if (
    e.target.dataset.add &&
    !tasksArray.includes(jobs[e.target.dataset.add])
  ) {
    tasksArray.push(jobs[e.target.dataset.add]);
    tasksPrices.push(jobs[e.target.dataset.add].price);
    showSelectedTasks(tasksArray);
    showTotalAmount(tasksPrices);
  }
  if (e.target.dataset.remove) {
    let removedItem = e.target.dataset.remove;
    let itemIndex = tasksArray.findIndex((item) => item.id == removedItem);
    tasksArray.splice(itemIndex, 1);
    console.log(tasksArray);
    tasksPrices = tasksPrices.filter((price, index) => index != itemIndex);
    e.target.closest("div").remove();
    showTotalAmount(tasksPrices);
  }
});

function showSelectedTasks(arr) {
  let taskHtml = "";

  arr.forEach(function ({ name, price, id }) {
    taskHtml += `
    <div>
        <p>${name} <button data-remove= "${id}">remove</button></p>
        <p>$${price}</p>
    </div>`;
  });

  tasksSelected.innerHTML = taskHtml;
}

function showTotalAmount(arr) {
  let total = arr.reduce((a, b) => a + b, 0);

  totalAmount.innerHTML = `$${total}`;
}
