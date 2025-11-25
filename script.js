let inpSlider = document.querySelector("[data-lengthSlider]");
let lengthDisplay = document.querySelector("[data-lengthNumber]");
let passwordDisplay = document.querySelector("[data-passwordDisplay]");
let copyBtn = document.querySelector("[data-copy]");
let upperCaseCheck = document.querySelector("#uppercase");
let lowerCaseCheck = document.querySelector("#lowercase");
let numbersCheck = document.querySelector("#numbers");
let symbolsCheck = document.querySelector("#symbols");
let indicator = document.querySelector(".data-indicator");
let generateBtn = document.querySelector(".generateBtn");
let allCheckBox = document.querySelectorAll("input[type=checkbox]");
let symbols = "!@#$%^&*~?|_";

let password = "";
let passwordLength = 10;
let checkCount = 0;
// set strength colour to grey
setIndicator("#ccc");

//set passowrd length
function handleSlider() {
  inpSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  let min = inpSlider.min;
  let max = inpSlider.max;
  let percentage = ((passwordLength - min) * 100) / (max - min);
  inpSlider.style.backgroundSize = `${percentage}% 100%`;
}
handleSlider();

//indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// random integer
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRndNumber() {
  return getRndInteger(0, 9);
}

function getRndLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function getRndUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}
function getRndSymbol() {
  let rndNum = getRndInteger(0, symbols.length);
  return symbols.charAt(rndNum);
}
//calculate strength
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSymbol = false;
  if (upperCaseCheck.checked) hasUpper = true;
  if (lowerCaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSymbol = true;

  if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}
inpSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

//main
function handleCheckBox() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });
  //condtion
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBox);
});

// Generate password

function shuflePassword(array) {
  // Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

generateBtn.addEventListener("click", () => {
  // none of the checkbox was checked
  if (checkCount <= 0) return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  // important steps
  // rename old password
  console.log("STARTING ");
  password = "";
  // insert elements
  funcArr = [];
  if (upperCaseCheck.checked) {
    funcArr.push(getRndUpperCase);
  }
  if (lowerCaseCheck.checked) {
    funcArr.push(getRndLowerCase);
  }
  if (numbersCheck.checked) {
    funcArr.push(getRndNumber);
  }
  if (symbolsCheck.checked) {
    funcArr.push(getRndSymbol);
  }

  //compulsary addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  console.log("COMPULSARY");

  //remaining addition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIdx = getRndInteger(0, funcArr.length);
    password += funcArr[randIdx]();
  }
  console.log("remaining");

  // shuffle the password
  password = shuflePassword(Array.from(password)); // pas as array

  console.log("shuffling done");

  // show in UI
  passwordDisplay.value = password;

  console.log("UI addition done");
  //calculate Strength
  calcStrength();

  console.log(password);
});
