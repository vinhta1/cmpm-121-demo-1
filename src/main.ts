import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The eyeball game";
const button01 = "👁️"
document.title = gameName;

//createElement's parameter dictates what kind of element it is
const header = document.createElement("h1");
const header2 = document.createElement("button");

//changing the innerHTML changes what the element should display
header.innerHTML = gameName;
header2.innerHTML = button01;

//adds it to the page, underneath the previous appended thing
app.append(header);
app.append(header2);

