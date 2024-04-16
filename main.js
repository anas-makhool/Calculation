const screen = document.querySelector("#screen");
const btn = document.querySelectorAll(".btn");
let buttons = document.querySelectorAll("button");
let input = document.querySelector("input");
let icon = document.querySelector(".icon img");
let p = document.querySelector(".icon p");
let science = document.querySelectorAll(".sci");
let backspaceInterval;
input.readOnly = true;

for (item of btn) {
  item.addEventListener("click", (e) => {
    let btnText = e.target.innerHTML;

    if (btnText == "×") {
      btnText = "*";
    }
    if (btnText == "÷") {
      btnText = "/";
    }
    if (btnText === "%" && screen.value.length == 0) {
      btnText = "";
    }

    screen.value += btnText;
  });
}

function checkIfInf(value) {
  if (screen.value.length === 0) {
    return;
  } else {
    equal();
    screen.value = value;
    if (
      screen.value == -Infinity ||
      screen.value == Infinity ||
      isNaN(screen.value)
    ) {
      screen.value = "";
      screen.placeholder = "input error";
    }
  }
}

function checkNum() {
  if (
    typeof +screen.value !== "number" ||
    screen.value === "undefined" ||
    screen.value[0] === "%"
  ) {
    screen.value = "";
  }
}

function equal() {
  try {
    let result = eval(screen.value);
    if (result === Infinity || result === -Infinity) {
      screen.value = "";
      screen.style.fontSize = "20px";
      if (window.innerWidth > 450) {
        screen.placeholder = "You cannot divide by zero.";
      } else {
        screen.placeholder = "Input error";
      }
    } else {
      screen.value = result;
    }
  } catch (error) {
    console.error(error);
    screen.placeholder = "invalid input";
    screen.value = "";
  }
  checkNum();
}

function sin() {
  equal();
  checkIfInf(Math.sin(screen.value));
}

function cos() {
  equal();
  checkIfInf(Math.cos(screen.value));
}

function tan() {
  equal();
  checkIfInf(Math.tan(screen.value));
}

function log() {
  equal();
  checkIfInf(Math.log(screen.value));
}

function sqrt() {
  equal();
  checkIfInf(Math.sqrt(screen.value, 2));
}

function pi() {
  checkIfInf(Math.PI / screen.value);
}

function pow() {
  equal();
  screen.value = Math.pow(screen.value, 2);
}
function e() {
  equal();
  screen.value = 2.71828182846;
}

function fact() {
  var i, num, f;

  f = 1;
  num = screen.value;
  for (i = 1; i <= num; i++) {
    f *= i;
  }
  i -= 1;
  screen.value = f;
  checkNum();
}

function backSSpace() {
  screen.value = screen.value.substr(0, screen.value.length - 1);
}

function startBackspace() {
  backspaceInterval = setInterval(backSpace, 100);
}

function stopBackspace() {
  clearInterval(backspaceInterval);
}

function backSpace() {
  console.log("Backspace is pressed continuously");
  screen.value = screen.value.substr(0, screen.value.length - 1);
}

function showSummery(e) {
  let myDiv = document.querySelector(".summery");
  myDiv.classList.toggle("none");

  myDiv.lastElementChild.onclick = (e) => {
    let element = e.target.innerHTML;

    if (element === "science") {
      e.target.innerHTML = "standard";
      localStorage.setItem("sci/sta", e.target.innerHTML);
      science.forEach((ele) => (ele.style.display = "block"));
    } else {
      e.target.innerHTML = "science";
      localStorage.setItem("sci/sta", e.target.innerHTML);
      science.forEach((ele) => (ele.style.display = "none"));
    }
  };
}

icon.addEventListener("click", (e) => {
  showSummery(e);
  e.stopPropagation();
});

document.body.addEventListener("click", (e) => {
  let myDiv = document.querySelector(".summery");

  if (!myDiv.contains(e.target) && !e.target.classList.contains("icon")) {
    myDiv.classList.remove("none");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("sci/sta") !== "standard") {
    p.innerHTML = "science";
    localStorage.setItem("sci/sta", p.innerHTML);
    science.forEach((ele) => (ele.style.display = "none"));
  } else {
    p.innerHTML = "standard";
    localStorage.setItem("sci/sta", p.innerHTML);
    science.forEach((ele) => (ele.style.display = "block"));
  }
});
