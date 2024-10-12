import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//increment variables
let counter: number = 0;
let n1 = 0;
let n2 = 0;

//const interval01Array = []; //don't need
//display variables
const gameName = "The eyeball game";
const buttonEmoji = "👁️";
let eyeballDisplay = `there are ${counter} eyeballs`;

//interval01Array.push(autoClicker(1, 1000)); //don't need

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

autoClicking(1);

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

//remaking
// function autoClicker(toAdd: number, delay: number) {
//   const newAutoClicker = setInterval(addToCounter, delay, toAdd);
//   return newAutoClicker;
// }

function autoClicking(incrementValue: number) {
  n2 = performance.now();
  const msPassed = n2 - n1;
  //console.log(incrementValue);
  addToCounter((incrementValue * msPassed) / 1000); // 1/fps
  n1 = n2;
  requestAnimationFrame(() => autoClicking(incrementValue)); //fucks up without having this call back change
  //() => to make a function, then pass incrementValue back to itself
  //or else it increases on its own????? fuck you
}
