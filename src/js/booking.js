"use strict";

// Time period dropdown

const selectBtn = document.querySelector(".select-dropdown");
const iconArrow = document.querySelector(".icon-arrow");
const dropdown = document.querySelector(".dropdown");

function toggleDropdown() {
  dropdown.classList.toggle("dropdown--active");
  iconArrow.classList.toggle("icon-arrow--active");
}

selectBtn.addEventListener("click", toggleDropdown);
dropdown.addEventListener("click", function (e) {
  const timePeriods = document.querySelectorAll(".time-period");
  const target = e.target.closest(".time-period");
  const period = document.querySelector(".period");

  period.textContent = target.children[1].textContent;

  timePeriods.forEach((period) => {
    period.classList.remove("time-period--active");
  });

  target.classList.add("time-period--active");
});

// Control number of people

const minusBtn = document.querySelector(".btn-minus");
const plusBtn = document.querySelector(".btn-plus");
const peoplePerson = document.querySelector(".people-span");
let numOfPeople = document.querySelector(".number");
let peopleNum = numOfPeople.textContent;

function changeTitle() {
  peopleNum === 1
    ? (peoplePerson.textContent = "person")
    : (peoplePerson.textContent = "people");
}

plusBtn.addEventListener("click", function (e) {
  e.preventDefault();
  peopleNum++;

  changeTitle();
  numOfPeople.textContent = peopleNum;
});

minusBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (peopleNum <= 1) {
    peopleNum = 1;
  } else {
    peopleNum--;
  }

  changeTitle();
  numOfPeople.textContent = peopleNum;
});

// Validating data

const makeReservationBtn = document.querySelector(".btn-booking");
const inputs = document.querySelectorAll('input:not([type="email"])');
const emailInput = document.querySelector('input[type="email"]');
const numberInputs = document.querySelectorAll('input[maxlength="2"]');
const allInputs = document.querySelectorAll("input");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function checkIputs(inputs) {
  inputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("input--error");
    }
  });
}

const validateEmail = (email) => {
  return emailRegex.test(email);
};

function initInputs() {
  inputs.forEach((input) => (input.value = ""));
  emailInput.value = "";

  numOfPeople.textContent = 4;
}

makeReservationBtn.addEventListener("click", function (e) {
  e.preventDefault();

  checkIputs(inputs);

  if (!validateEmail(emailInput.value)) {
    emailInput.classList.add("input--error");
  }

  [...inputs].every((input) => input.value !== "") &&
    validateEmail(emailInput.value) &&
    initInputs();
});

allInputs.forEach((input) => {
  input.addEventListener("change", function () {
    this.classList.remove("input--error");
  });
});

window.addEventListener("load", initInputs);
