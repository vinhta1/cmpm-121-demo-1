import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//increment variables
let counter: number = 0;
const interval01Array = [];
//display variables
const gameName = "The eyeball game";
const buttonEmoji = "👁️";
let eyeballDisplay = `there are ${counter} eyeballs`;

interval01Array.push(autoClicker(1, 1000));

document.title = gameName;

//createElement's parameter dictates what kind of element it is
const gameTitle = document.createElement("h1");
const button01 = document.createElement("button");
const eyeballCounter = document.createElement("div");

//changing the innerHTML changes what the element should display
gameTitle.innerHTML = gameName;
button01.innerHTML = buttonEmoji;
eyeballCounter.innerHTML = eyeballDisplay;

//adds it to the page, underneath the previous appended thing
app.append(gameTitle);
app.append(eyeballCounter);
app.append(button01);

//listeners
button01.addEventListener("mouseup", () => {
  testLog("button01");

  addToCounter(1);
});

//functions
// testLog allows for quick testing
function testLog(source: string) {
  console.log("test from " + source);
}

function addToCounter(toAdd: number) {
  counter += toAdd;
  updateDisplay();
}

function updateDisplay() {
  eyeballDisplay = `there are ${counter} eyeballs`;
  eyeballCounter.innerHTML = eyeballDisplay;
}

function autoClicker(toAdd: number, delay: number) {
  const newAutoClicker = setInterval(addToCounter, delay, toAdd);
  return newAutoClicker;
}
