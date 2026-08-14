const num = document.getElementById("num");
let randomNum;
randomNum = Math.floor(Math.random() * 99999999);

num.textContent = randomNum;

const guidance = document.querySelector(".guidance");
const confirmBtn = document.getElementById("confirm-btn");
const result = document.getElementById("result");
const resultMsg = document.getElementById("result-message");
const resultPlace = document.getElementById("result-place");
const place = document.getElementById("place");
const amount = document.getElementById("amount");
const resultDay = document.getElementById("result-day");
let Month = Math.floor(Math.random() * 12) + 1;
let day = Math.floor(Math.random() * 30) + 1;

const obj = {
  1: {
    result: "第１希望当選",
    resultMessage: "チケットのご用意ができました",
  },
  2: {
    result: "落選",
    resultMessage: "チケットのご用意ができませんでした",
  },
};

const requestBtn = document.getElementById("requestbtn");
const woukdLike = document.querySelector(".hope");
const hopeAmount = document.getElementById("last-amount");
const hopeDay = document.getElementById("last-day");
const hopePlace = document.getElementById("last-place");

touraku();

function touraku() {
  guidance.classList.add("hidden");

  requestBtn.addEventListener("click", () => {
    if (place.value === "") return;
    if (amount.value === "") return;
    guidance.classList.remove("hidden");
    hopeAmount.textContent = `${amount.value}枚`;
    hopeDay.textContent = `2026年${Month}月${day}日`;
    hopePlace.textContent = place.value;
    woukdLike.classList.remove("hidden");
  });

  confrim();
}

function confrim() {
  confirmBtn.addEventListener("click", () => {
    guidance.classList.add("hidden");
    const resultNum = document.getElementById("num-message");
    resultNum.textContent = randomNum;
    resultRange.classList.remove("hidden");

    if (Math.random() < 0.3) {
      const id = obj[1];
      result.textContent = id.result;
      const winnerMsg = document.querySelector(".winner-message");
      resultMsg.classList.add("hidden");
      winnerMsg.classList.remove("hidden");
      resultPlace.textContent = place.value;
      resultDay.textContent = `2026年${Month}月${day}日`;
    } else {
      const id = obj[2];
      resultMsg.classList.remove("hidden");
      result.textContent = id.result;
      resultMsg.textContent = id.resultMessage;
    }
  });

  const closeBtn = document.getElementById("close");
  const resultRange = document.querySelector(".result-range");

  closeBtn.addEventListener("click", () => {
    resultRange.classList.add("hidden");
    guidance.classList.remove("hidden");
  });
}
