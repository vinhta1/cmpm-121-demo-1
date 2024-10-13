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

const upgradeValue01: number = 0.1;
const upgradeValue02: number = 2.0;
const upgradeValue03: number = 50;
const upgradeValue04: number = 600;
const upgradeValue05: number = 40000;
// const upgradeValue06: number = 2;

//const interval01Array = []; //don't need
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
// const upgradeButton01 = document.createElement("button");
// const upgradeButton02 = document.createElement("button");
// const upgradeButton03 = document.createElement("button");
// const upgradeButton04 = document.createElement("button");
// const upgradeButton05 = document.createElement("button");
// const upgradeButton06 = document.createElement("button");

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
    tooltip: document.createElement("div")
  };

  const newUpgrade = upgradeButtonArray[upgradeButtonCount];
  if (!newUpgrade.ongoing) {
    newUpgrade.flag = true;
  }

  newUpgrade.button.innerHTML = `${newUpgrade.display}`;
  newUpgrade.tooltip.innerHTML = `${newUpgrade.description} for ${newUpgrade.cost} eyeballs.`;
  app.append(newUpgrade.button);
  newUpgrade.button.hidden = true;

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
    newUpgrade.tooltip.innerHTML = `${newUpgrade.description} for ${Math.round(newUpgrade.cost*100)/100} eyeballs.`;
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

// upgradeButton01.innerHTML = `open your eyes.`;
// upgradeButton02.innerHTML = `open your THIRD eye.`;
// upgradeButton03.innerHTML = `👄`;
// upgradeButton04.innerHTML = `now open MY mouth.`;
// upgradeButton05.innerHTML = `my OTHER mouth.`;
// upgradeButton06.innerHTML = `this one's for you, you freak.`;

//adds it to the page, underneath the previous appended thing
app.append(gameTitle);
app.append(eyeballCounter);
app.append(growthCounter);
app.append(clickButton);
// makeNewUpgrade("test", 1, () => {
//   console.log("Testing");
//   counter += 2;
// });
makeNewUpgrade("open your eyes.", "see what you shouldn't", 10, () => {
  currentGrowth += upgradeValue01;
});
makeNewUpgrade("open your THIRD eye.", "see what you must", 100, () => {
  currentGrowth += upgradeValue02;
});
makeNewUpgrade("👄", "open your mouth", 1000, () => {
  currentGrowth += upgradeValue03;
});
makeNewUpgrade("now open MY mouth.", "wider", 10000, () => {
  currentGrowth += upgradeValue04;
});
makeNewUpgrade("my OTHER mouth.", "and the other ones too", 100000, () => {
  currentGrowth += upgradeValue05;
});
makeNewUpgrade(
  "this one's for you, you freak", "you know who you are. pay",
  1635344111012.6,
  () => {
    counter += 1635344111012.6;
    counter = counter * 2;
  },
  false,
);
//app.append(upgradeButton01);
//app.append(upgradeButton02);
//app.append(upgradeButton03);
//app.append(upgradeButton04);
//app.append(upgradeButton05);
//app.append(upgradeButton06);

//starting growth
autoClicking();
updateButtons();
// upgradeButton01.hidden = true;
// upgradeButton02.hidden = true;
// upgradeButton03.hidden = true;
// upgradeButton04.hidden = true;
// upgradeButton05.hidden = true;
// upgradeButton06.hidden = true;
// let upgrade06flag = true;

//listeners
clickButton.addEventListener("mouseup", () => {
  addToCounter(1);
  //console.log(counter)

  //testLog("button01");
});

// upgradeButton01.addEventListener("mouseup", () => {
//   currentGrowth += upgradeValue01;
//   counter -= 10;
// });

// upgradeButton02.addEventListener("mouseup", () => {
//   currentGrowth += upgradeValue02;
//   counter -= 100;
// });

// upgradeButton03.addEventListener("mouseup", () => {
//   currentGrowth += upgradeValue03;
//   counter -= 1000;
// });

// upgradeButton04.addEventListener("mouseup", () => {
//   currentGrowth += upgradeValue04;
//   counter -= 1000000;
// });

// upgradeButton05.addEventListener("mouseup", () => {
//   currentGrowth += upgradeValue05;
//   counter -= 100000000;
// });

// upgradeButton06.addEventListener("mouseup", () => {
//   counter *= upgradeValue06;
//   upgrade06flag = false;
//   upgradeButton06.hidden = true;
// });

//functions
// testLog allows for quick testing
// function testLog(source: string) {
//   console.log("test from " + source);
// }

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

  //array test
  // for (let i = 0; i < upgradeButtonArray.length; i++) {
  //   if upgradeButtonArray.
  // }

  //enable/disable upgrades
  // if (counter < 10) {
  //   upgradeButton01.disabled = true;
  // } else {
  //   upgradeButton01.disabled = false;
  //   upgradeButton01.hidden = false;
  // }

  // if (counter < 100) {
  //   upgradeButton02.disabled = true;
  // } else {
  //   upgradeButton02.disabled = false;
  //   upgradeButton02.hidden = false;
  // }

  // if (counter < 10000) {
  //   upgradeButton03.disabled = true;
  // } else {
  //   upgradeButton03.disabled = false;
  //   upgradeButton03.hidden = false;
  // }

  // if (counter < 1000000) {
  //   upgradeButton04.disabled = true;
  // } else {
  //   upgradeButton04.disabled = false;
  //   upgradeButton04.hidden = false;
  // }

  // if (counter < 100000000) {
  //   upgradeButton05.disabled = true;
  // } else {
  //   upgradeButton05.disabled = false;
  //   upgradeButton05.hidden = false;
  // }

  // if (counter > 1635344111012.6 && upgrade06flag) {
  //   //1635344111012.6
  //   upgradeButton06.hidden = false;
  // }
}

//remaking
// function autoClicker(toAdd: number, delay: number) {
//   const newAutoClicker = setInterval(addToCounter, delay, toAdd);
//   return newAutoClicker;
// }

function autoClicking() {
  n2 = performance.now();
  const msPassed = n2 - n1;
  //console.log(currentGrowth);
  addToCounter((currentGrowth * msPassed) / 1000); // 1/fps
  n1 = n2;
  //   requestAnimationFrame(() => autoClicking(incrementValue)); //fucks up without having this call back change
  //   //() => to make a function, then pass incrementValue back to itself
  //   //or else it increases on its own????? fuck you
  requestAnimationFrame(autoClicking); //nevermind
}
