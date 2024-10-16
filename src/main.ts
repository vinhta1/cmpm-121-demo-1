//https://www.tutorialspoint.com/how-to-add-a-tooltip-to-a-div-using-javascript

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface upgradeButton {
  display: string;
  description: string;
  cost: number;
  amount: number;
  effect: () => void;
  ongoing: boolean;
  flag: boolean;
  button: HTMLButtonElement;
  tooltip: HTMLDivElement;
}

//increment variables
let counter: number = 0;
let n1: number = 0;
let n2: number = 0;
let currentGrowth: number = 0;
let upgradeButtonCount: number = 0;
const upgradeButtonArray: upgradeButton[] = [];
const costFactor: number = 1.15;

const upgradeValueArray: number[] = [0.1, 2.0, 50.0, 600.0, 40000.0]

//display variables
const gameName = "The eyeball game";
const buttonEmoji = "👁️";
let eyeballDisplay = `there are ${Math.floor(counter)} eyeballs`;
let growthDisplay = `${currentGrowth} eyes are opening per second`;

//interval01Array.push(autoClicker(1, 1000)); //don't need

document.title = gameName;

//createElement's parameter dictates what kind of element it is
const gameTitle = document.createElement("h1");
const clickButton = document.createElement("button");
const eyeballCounter = document.createElement("div");
const growthCounter = document.createElement("div");

function makeNewUpgrade(
  theDisplay: string,
  theDescription: string,
  theCost: number,
  theEffect: () => void,
  isOngoing: boolean = true,
) {
  upgradeButtonArray[upgradeButtonCount] = {
    display: theDisplay,
    description: theDescription,
    cost: theCost,
    amount: 0,
    effect: theEffect,
    ongoing: isOngoing,
    flag: false,
    button: document.createElement("button"),
    tooltip: document.createElement("div"),
  };

  const newUpgrade = upgradeButtonArray[upgradeButtonCount];
  if (!newUpgrade.ongoing) {
    newUpgrade.flag = true;
  }

  newUpgrade.button.innerHTML = `${newUpgrade.display}`;
  newUpgrade.tooltip.innerHTML = `${newUpgrade.description} for ${newUpgrade.cost} eyeballs.`;
  app.append(newUpgrade.button);
  newUpgrade.button.hidden = true;
  newUpgrade.tooltip.classList.add("tooltip"); //thanks brace

  newUpgrade.button.addEventListener("mouseup", () => {
    newUpgrade.effect();
    if (!newUpgrade.ongoing) {
      newUpgrade.flag = false;
      newUpgrade.button.hidden = true;
    }
    counter -= newUpgrade.cost;
    newUpgrade.cost *= costFactor;
    newUpgrade.amount++;
    newUpgrade.button.innerHTML = `${newUpgrade.display} (${newUpgrade.amount})`;
    newUpgrade.tooltip.innerHTML = `${newUpgrade.description} for ${Math.round(newUpgrade.cost * 100) / 100} eyeballs.`;
    updateDisplay();
  });

  newUpgrade.button.addEventListener("mouseover", () => {
    newUpgrade.button.appendChild(newUpgrade.tooltip);
    newUpgrade.tooltip.style.display = "block";
  });

  newUpgrade.button.addEventListener("mouseout", () => {
    newUpgrade.tooltip.style.display = "none";
  });

  upgradeButtonCount++;

  return newUpgrade;
}

//changing the innerHTML changes what the element should display
gameTitle.innerHTML = gameName;
clickButton.innerHTML = buttonEmoji;
eyeballCounter.innerHTML = eyeballDisplay;

//adds it to the page, underneath the previous appended thing
app.append(gameTitle);
app.append(eyeballCounter);
app.append(growthCounter);
app.append(clickButton);

//upgrades
makeNewUpgrade("open your eyes.", "see what you shouldn't", 10, () => {
  currentGrowth += upgradeValueArray[0];
});
makeNewUpgrade("open your THIRD eye.", "see what you must", 100, () => {
  currentGrowth += upgradeValueArray[1];
});
makeNewUpgrade("👄", "open your mouth", 1000, () => {
  currentGrowth += upgradeValueArray[2];
});
makeNewUpgrade("now open MY mouth.", "wider", 10000, () => {
  currentGrowth += upgradeValueArray[3];
});
makeNewUpgrade("my OTHER mouth.", "and the other ones too", 100000, () => {
  currentGrowth += upgradeValueArray[4];
});
makeNewUpgrade(
  "this one's for you, you freak",
  "you know who you are. pay",
  1635344111012.6,
  () => {
    counter += 1635344111012.6;
    counter = counter * 2;
  },
  false,
);

//starting growth
autoClicking();
updateButtons();

//listeners
clickButton.addEventListener("mouseup", () => {
  addToCounter(1);
});

function addToCounter(toAdd: number) {
  counter += toAdd;
  updateDisplay();
}

function updateButtons() {
  for (let i = 0; i < upgradeButtonArray.length; i++) {
    if (counter < upgradeButtonArray[i].cost) {
      upgradeButtonArray[i].button.disabled = true;
    } else {
      if (upgradeButtonArray[i].ongoing || upgradeButtonArray[i].flag) {
        upgradeButtonArray[i].button.hidden = false;
        upgradeButtonArray[i].button.disabled = false;
      }
    }
  }
  requestAnimationFrame(updateButtons);
}

function updateDisplay() {
  eyeballDisplay = `there are ${Math.floor(counter)} eyeballs`;
  eyeballCounter.innerHTML = eyeballDisplay;

  growthDisplay = `${Math.round(currentGrowth * 100) / 100} eyes are opening per second`;
  growthCounter.innerHTML = growthDisplay;
}

function autoClicking() {
  n2 = performance.now();
  const msPassed = n2 - n1;
  addToCounter((currentGrowth * msPassed) / 1000); // 1/fps
  n1 = n2;
  requestAnimationFrame(autoClicking);
}
