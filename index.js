import { jobs } from "./data.js";

const tasksEl = document.getElementById("tasks");
const tasksSelected = document.getElementById("tasks-selected");
const totalAmount = document.getElementById("total-amount");
const sendInvoice = document.querySelector(".send-invoice-btn");
const tasksArray = [];
let tasksPrices = [];
let totalPrice = 0;

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
    showAmount(jobs[e.target.dataset.add].price, true);
    resetInvoiceBtn();
  }
  if (e.target.dataset.remove) {
    let removedItem = e.target.dataset.remove;
    let itemIndex = tasksArray.findIndex((item) => item.id == removedItem);
    showAmount(tasksArray[itemIndex].price, false);
    tasksArray.splice(itemIndex, 1);
    e.target.closest("div").remove();
  }
});

function showSelectedTasks(arr) {
  tasksSelected.innerHTML = "";
  arr.forEach(function ({ name, price, id }) {
    tasksSelected.innerHTML += `
    <div>
        <p class="task-name">${name} <button data-remove= "${id}" class="remove-btn">remove</button></p>
        <p>$${price}</p>
    </div>`;
  });
}

function showAmount(price, isAdd) {
  if (isAdd === true) {
    totalPrice += price;
  } else if (isAdd === false) {
    totalPrice -= price;
  }

  totalAmount.innerHTML = `$${totalPrice}`;
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
