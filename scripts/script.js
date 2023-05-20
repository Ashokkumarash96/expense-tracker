"use strict";

// DOM elements
let balanceEl = document.getElementById("balance");
let moneyPlusEl = document.getElementById("money-plus");
let moneyMinusEl = document.getElementById("money-minus");
let listEl = document.getElementById("list");
let formEl = document.getElementById("form");
let transactionEl = document.getElementById("transaction");
let amountEl = document.getElementById("amount");

// Transactions array
let transactions = [];
transactions =
  localStorage.getItem("transactions") != null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

// Initialize the application
let init = function () {
  listEl.innerHTML = null;
  transactions.forEach(addTransactionDOM);
  updateValues();
};

// Add transaction to the DOM
let addTransactionDOM = function (transaction) {
  let item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.transaction} <span>${transaction.amount}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;
  listEl.appendChild(item);
};

// Remove transaction by ID
let removeTransaction = function (id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  init();
};

// Update balance, income, and expense values
let updateValues = function () {
  let amounts = transactions.map((transaction) => transaction.amount);
  let income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0);
  let expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0);
  let total = income + expense;

  moneyPlusEl.innerText = `₹${income}`;
  moneyMinusEl.innerText = `₹${expense}`;
  balanceEl.innerText = `₹${total}`;
};

// Event listener for form submission
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (transactionEl.value.trim() === "" || amountEl.value.trim() === "") {
    alert("Enter correct transaction details");
  } else {
    const transactionItem = {
      id: new Date().valueOf(),
      transaction: transactionEl.value,
      amount: Number(amountEl.value),
    };
    transactions.push(transactionItem);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addTransactionDOM(transactionItem);
    updateValues();
    transactionEl.value = null;
    amountEl.value = null;
  }
});

// Initialize the application
init();
