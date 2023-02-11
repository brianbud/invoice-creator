import { jobs } from "./data.js";

const tasksEl = document.getElementById("tasks");
const tasksSelected = document.getElementById("tasks-selected");
const totalAmount = document.getElementById("total-amount");
const sendInvoice = document.querySelector(".send-invoice-btn");
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
    resetInvoiceBtn();
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
        <p class="task-name">${name} <button data-remove= "${id}" class="remove-btn">remove</button></p>
        <p>$${price}</p>
    </div>`;
  });

  tasksSelected.innerHTML = taskHtml;
}

function showTotalAmount(arr) {
  let total = arr.reduce((a, b) => a + b, 0);

  totalAmount.innerHTML = `$${total}`;
}

sendInvoice.addEventListener("click", handleInvoiceBtn);

function handleInvoiceBtn() {
  if (tasksArray.length > 0) {
    sendInvoice.innerHTML = `<i class="fa-solid fa-check"></i> Invoice Sent!`;
    sendInvoice.style.backgroundColor = "#93a8d7";
  } else if (tasksArray.length === 0) {
    sendInvoice.innerHTML = ` Please select a task`;
    sendInvoice.style.backgroundColor = "#93a8d7";
  }
}

function resetInvoiceBtn() {
  sendInvoice.innerHTML = `<i class="fa-solid fa-envelope"></i> Send Invoice`;
  sendInvoice.style.backgroundColor = "#3A69D2";
}
