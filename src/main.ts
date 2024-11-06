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
let currentEyeballCoutner: number = 0;
let milliseconds1: number = 0;
let milliseconds2: number = 0;
let currentGrowth: number = 0;
let upgradeButtonCount: number = 0;
const upgradeButtonArray: upgradeButton[] = [];
const costFactor: number = 1.15;

const upgradeValueArray: number[] = [0.1, 2.0, 50.0, 600.0, 40000.0];

//display variables
const gameName = "The eyeball game";
const buttonEmoji = "👁️";
let eyeballDisplay = `there are ${Math.floor(currentEyeballCoutner)} eyeballs`;
let growthDisplay = `${currentGrowth} eyes are opening per second`;

//interval01Array.push(autoClicker(1, 1000)); //don't need

document.title = gameName;

//createElement's parameter dictates what kind of element it is
const gameTitle = document.createElement("h1");
const clickButton = document.createElement("button");
const eyeballCounter = document.createElement("div");
const growthCounter = document.createElement("div");

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = <CanvasRenderingContext2D>canvas.getContext("2d");

//starting growth
autoClicking();
updateButtons();

//listeners
clickButton.addEventListener("mouseup", () => {
  addToCounter(1);
  context.save();
  context.translate(Math.random() * innerWidth, Math.random() * innerHeight);
  context.rotate(Math.random());
  context.scale(Math.random() * 5, Math.random() * 5);
  context.translate(
    -1 * Math.random() * innerWidth,
    -1 * Math.random() * innerHeight,
  );
  context.fillText(
    "👁️",
    Math.random() * innerWidth,
    Math.random() * innerHeight,
  );
  context.restore();
});

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
    currentEyeballCoutner -= newUpgrade.cost;
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
const upgrades = [
  {
    name: "open your eyes.",
    description: "see what you shouldn't",
    cost: 10,
    effect: () => {
      currentGrowth += upgradeValueArray[0];
    },
  },
  {
    name: "open your THIRD eye.",
    description: "see what you must",
    cost: 100,
    effect: () => {
      currentGrowth += upgradeValueArray[1];
    },
  },
  {
    name: "👄",
    description: "open your mouth",
    cost: 1000,
    effect: () => {
      currentGrowth += upgradeValueArray[2];
    },
  },
  {
    name: "now open MY mouth.",
    description: "wider",
    cost: 10000,
    effect: () => {
      currentGrowth += upgradeValueArray[3];
    },
  },
  {
    name: "my OTHER mouth.",
    description: "and the other ones too",
    cost: 100000,
    effect: () => {
      currentGrowth += upgradeValueArray[4];
    },
  },
  {
    name: "this one's for you, you freak",
    description: "you know who you are. pay",
    cost: 1635344111012.6,
    effect: () => {
      currentEyeballCoutner += 1635344111012.6;
      currentEyeballCoutner = currentEyeballCoutner * 2;
    },
    ongoing: false,
  },
];

upgrades.forEach((upgrade) => {
  makeNewUpgrade(
    upgrade.name,
    upgrade.description,
    upgrade.cost,
    upgrade.effect,
    upgrade.ongoing,
  );
});

function addToCounter(toAdd: number) {
  currentEyeballCoutner += toAdd;
  updateDisplay();
}

function updateButtons() {
  for (let i = 0; i < upgradeButtonArray.length; i++) {
    if (currentEyeballCoutner < upgradeButtonArray[i].cost) {
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
  eyeballDisplay = `there are ${Math.floor(currentEyeballCoutner)} eyeballs`;
  eyeballCounter.innerHTML = eyeballDisplay;

  growthDisplay = `${Math.round(currentGrowth * 100) / 100} eyes are opening per second`;
  growthCounter.innerHTML = growthDisplay;
}

function autoClicking() {
  milliseconds2 = performance.now();
  const msPassed = milliseconds2 - milliseconds1;
  addToCounter((currentGrowth * msPassed) / 1000); // 1/fps
  milliseconds1 = milliseconds2;
  requestAnimationFrame(autoClicking);
}
