import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface upgradeButton {
  display: string ,
  cost: number,
  amount: number,
  effect: any,
  ongoing: boolean,
  button: any
};

//increment variables
let counter: number = 0;
let n1: number = 0;
let n2: number = 0;
let currentGrowth: number = 0;
let upgradeButtonCount: number = 0;
let upgradeButtonArray: upgradeButton[] = [];

const upgradeValue01: number = 0.1;
const upgradeValue02: number = 2.0;
const upgradeValue03: number = 50;
const upgradeValue04: number = 50000;
const upgradeValue05: number = 10000000;
const upgradeValue06: number = 2;

//const interval01Array = []; //don't need
//display variables
const gameName = "The eyeball game";
const buttonEmoji = "👁️";
let eyeballDisplay = `there are ${Math.floor(counter)} eyeballs`;
let growthDisplay = `${Math.floor(currentGrowth)} eyes are opening per second`;

//interval01Array.push(autoClicker(1, 1000)); //don't need

document.title = gameName;

//createElement's parameter dictates what kind of element it is
const gameTitle = document.createElement("h1");
const clickButton = document.createElement("button");
const eyeballCounter = document.createElement("div");
const growthCounter = document.createElement("div");
const upgradeButton01 = document.createElement("button");
const upgradeButton02 = document.createElement("button");
const upgradeButton03 = document.createElement("button");
const upgradeButton04 = document.createElement("button");
const upgradeButton05 = document.createElement("button");
const upgradeButton06 = document.createElement("button");

function upgradeMaker(theDisplay: string, theCost: number, theEffect: () => void, isOngoing: boolean = true){
  upgradeButtonArray[upgradeButtonCount] = {
    display: theDisplay,
    cost: theCost,
    amount: 0,
    effect: theEffect,
    ongoing: isOngoing,
    button: document.createElement("button")
  }
  
  let newUpgrade = upgradeButtonArray[upgradeButtonCount];

  newUpgrade.button.innerHTML = `${newUpgrade.display} (${newUpgrade.amount})`;
  app.append(newUpgrade.button);
  //newUpgrade.button.hidden = true;

  newUpgrade.button.addEventListener("mouseup", () => {
    newUpgrade.effect();
    newUpgrade.amount ++;
    newUpgrade.button.innerHTML = `${newUpgrade.display} (${newUpgrade.amount})`;
    counter -= newUpgrade.cost;
  });

  return newUpgrade;
};

//changing the innerHTML changes what the element should display
gameTitle.innerHTML = gameName;
clickButton.innerHTML = buttonEmoji;
eyeballCounter.innerHTML = eyeballDisplay;

upgradeMaker("test", 1, () => {
  console.log("Testing");
  counter +=2;
});

upgradeButton01.innerHTML = `open your eyes. ()`;
upgradeButton02.innerHTML = `open your THIRD eye.`;
upgradeButton03.innerHTML = `👄`;
upgradeButton04.innerHTML = `now open MY mouth.`;
upgradeButton05.innerHTML = `my OTHER mouth.`;
upgradeButton06.innerHTML = `this one's for you, you freak.`;

//adds it to the page, underneath the previous appended thing
app.append(gameTitle);
app.append(eyeballCounter);
app.append(growthCounter)
app.append(clickButton);
app.append(upgradeButton01);
app.append(upgradeButton02);
app.append(upgradeButton03);
app.append(upgradeButton04);
app.append(upgradeButton05);
app.append(upgradeButton06);

//starting growth
autoClicking();
upgradeButton01.hidden = true;
upgradeButton02.hidden = true;
upgradeButton03.hidden = true;
upgradeButton04.hidden = true;
upgradeButton05.hidden = true;
upgradeButton06.hidden = true;
let upgrade06flag = true;

//listeners
clickButton.addEventListener("mouseup", () => {
  addToCounter(1);

  //testLog("button01");
});

upgradeButton01.addEventListener("mouseup", () => {
  currentGrowth += upgradeValue01;
  counter -= 10;
});

upgradeButton02.addEventListener("mouseup", () => {
  currentGrowth += upgradeValue02;
  counter -= 100;
});

upgradeButton03.addEventListener("mouseup", () => {
  currentGrowth += upgradeValue03;
  counter -= 1000;
});

upgradeButton04.addEventListener("mouseup", () => {
  currentGrowth += upgradeValue04;
  counter -= 1000000;
});

upgradeButton05.addEventListener("mouseup", () => {
  currentGrowth += upgradeValue05;
  counter -= 100000000;
});

upgradeButton06.addEventListener("mouseup", () => {
  counter *= upgradeValue06;
  upgrade06flag = false;
  upgradeButton06.hidden = true;
});

//functions
// testLog allows for quick testing
// function testLog(source: string) {
//   console.log("test from " + source);
// }

function addToCounter(toAdd: number) {
  counter += toAdd;
  updateDisplay();
}

function updateDisplay() {
  eyeballDisplay = `there are ${Math.floor(counter)} eyeballs`;
  eyeballCounter.innerHTML = eyeballDisplay;

  growthDisplay = `${Math.floor(currentGrowth)} eyes are opening per second`;
  growthCounter.innerHTML = growthDisplay;

  //array test
  // for (let i = 0; i < upgradeButtonArray.length; i++) {
  //   if upgradeButtonArray.
  // }

  //enable/disable upgrades
  if (counter < 10) {
    upgradeButton01.disabled = true;
  } else {
    upgradeButton01.disabled = false;
    upgradeButton01.hidden = false;
  }

  if (counter < 100) {
    upgradeButton02.disabled = true;
  } else {
    upgradeButton02.disabled = false;
    upgradeButton02.hidden = false;
  }

  if (counter < 10000) {
    upgradeButton03.disabled = true;
  } else {
    upgradeButton03.disabled = false;
    upgradeButton03.hidden = false;
  }

  if (counter < 1000000) {
    upgradeButton04.disabled = true;
  } else {
    upgradeButton04.disabled = false;
    upgradeButton04.hidden = false;
  }

  if (counter < 100000000) {
    upgradeButton05.disabled = true;
  } else {
    upgradeButton05.disabled = false;
    upgradeButton05.hidden = false;
  }

  if (counter > 1635344111012.6 && upgrade06flag) {
    //1635344111012.6
    upgradeButton06.hidden = false;
  }
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
