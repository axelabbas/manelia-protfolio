const projectCards = document.querySelectorAll(".projectCard");
const projectsSection = document.getElementById("projects");
const sets = document.getElementById("sets");
let currentIndex = 0;
const cardsToShow = 4;
const timerDuration = 10000; // 5 seconds
let amountOfSets = projectCards.length / 4;
let timerInterval;
// Delay timings (in milliseconds)
const fadeInDelay = 500;
const displayChangeDelay = 500; // Adjust this value as needed

for (let i = 0; i < amountOfSets; i++) {
  let set = document.createElement("div");
  set.classList.add("set");

  set.onclick = function () {
    clearInterval(timerInterval);
    currentIndex = i * cardsToShow;
    showCards();
    timerInterval = setInterval(nextSet, timerDuration);
  };
  sets.appendChild(set);
}
let setsArray = Array.from(sets.children);

function showCards() {
  // Apply fade-out animation
  for (let i = 0; i < projectCards.length; i++) {
    projectsSection.style.opacity = "0";
  }
  for (let i = 0; i < setsArray.length; i++) {
    setsArray[i].classList.remove("activeSet");
  }
  console.log(setsArray);
  console.log(currentIndex);
  setsArray[currentIndex / 4].classList.add("activeSet");

  // Wait for fade-out animation to complete before changing display
  setTimeout(() => {
    // Hide elements not in the current set
    for (let i = 0; i < projectCards.length; i++) {
      if (i < currentIndex || i >= currentIndex + cardsToShow) {
        projectCards[i].style.display = "none";
      } else {
        projectCards[i].style.display = "block";
      }
    }
  }, displayChangeDelay);

  // Delay and apply fade-in animation
  setTimeout(() => {
    for (let i = currentIndex; i < currentIndex + cardsToShow; i++) {
      if (projectCards[i]) {
        projectsSection.style.opacity = "1";
      }
    }
  }, fadeInDelay);
}

function next() {
  nextSet();
  clearInterval(timerInterval);
  timerInterval = setInterval(nextSet, timerDuration);
}
function prev() {
  prevSet();
  clearInterval(timerInterval);
  timerInterval = setInterval(nextSet, timerDuration);
}
function nextSet() {
  currentIndex += cardsToShow;

  if (currentIndex >= projectCards.length) {
    currentIndex = 0;
  }
  showCards();
}

function prevSet() {
  currentIndex -= cardsToShow;
  if (currentIndex < 0) {
    currentIndex = projectCards.length - cardsToShow;
  }

  showCards();
}

// Start the timer to automatically show the next set of cards
timerInterval = setInterval(nextSet, timerDuration);


showCards();
