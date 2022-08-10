"use strict";

// Images for reveal

const [firstImage, secondImage] = [
  ...document.querySelectorAll(".reason__img img"),
];

// First image reveal

const revealFirstImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  firstImage.classList.add("slide-up");
  observer.unobserve(entry.target);
};

const firstImageObserver = new IntersectionObserver(revealFirstImage, {
  root: null,
  threshold: 0.5,
});

firstImageObserver.observe(firstImage);

// Second image reveal

const revealSecondImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  secondImage.classList.add("slide-down");
  observer.unobserve(entry.target);
};

const secondImageObserver = new IntersectionObserver(revealSecondImage, {
  root: null,
  threshold: 0.5,
});

secondImageObserver.observe(secondImage);

// Meals reveal

const meals = document.querySelectorAll(".meal");
const mealsList = document.querySelector(".meal-list");

const revealMeal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  meals.forEach((meal, i) => {
    meal.style.animation = "slide-left 700ms ease-out forwards";
    meal.style.animationDelay = `${i * 300}ms`;
  });

  observer.unobserve(entry.target);
};

const mealObserver = new IntersectionObserver(revealMeal, {
  root: null,
  threshold: 0.5,
});

mealObserver.observe(mealsList);

// Changing content of gathering section

const gatheringHeading = document.querySelector(".gathering-text h2");
const gatheringParagraph = document.querySelector(".gathering-text p");
const gatheringList = [...document.querySelectorAll(".event")];
const gatheringImage = document.querySelector(".gathering-img img");
let typeOfDevice = "";

if (window.innerWidth > 768) {
  typeOfDevice = "desktop";
} else if (window.innerWidth > 375 && window.innerWidth <= 768) {
  typeOfDevice = "tablet";
} else {
  typeOfDevice = "mobile";
}

const gatheringContent = {
  headings: ["Family gathering", "Special Events", "Social Events"],
  paragraphs: [
    "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We'll provide a memorable experience for all.",
    "Whether it's a romantic dinner or special date you're celebrating with others we'll look after you. We'll be sure to mark your special date with an unforgettable meal.",
    "Are you looking to have a larger social event? No problem! We're more than happy to cater for big parties. We'll work with you to make your event a hit with everyone.",
  ],
  images: [
    `./assets/homepage/family-gathering-${typeOfDevice}.jpg`,
    `./assets/homepage/special-events-${typeOfDevice}.jpg`,
    `./assets/homepage/social-events-${typeOfDevice}.jpg`,
  ],
};
const gatheringType = document.querySelectorAll(".event");
let index = 1;

function changeContent(index) {
  gatheringHeading.textContent = gatheringContent.headings[index];
  gatheringParagraph.textContent = gatheringContent.paragraphs[index];
  gatheringImage.src = gatheringContent.images[index];

  gatheringList.forEach((gathering) =>
    gathering.classList.remove("event--active")
  );
  gatheringList[index].classList.add("event--active");
}

function switchGathering() {
  if (index > gatheringContent.headings.length - 1) {
    index = 0;
    changeContent(index);
    index++;
  } else {
    changeContent(index);
    index++;
  }
}

setInterval(switchGathering, 3000);
