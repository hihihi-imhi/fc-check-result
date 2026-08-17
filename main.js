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

place.focus();
touraku();

//申し込み
function touraku() {
  guidance.classList.add("hidden");

  let count = 0;
  requestBtn.addEventListener("click", () => {
    if (place.value === "") return;
    if (amount.value === "") return;
    count++;
    if (count === 1) {
      guidance.classList.remove("hidden");
      hopeAmount.textContent = `${amount.value}枚`;
      hopeDay.textContent = `2026年${Month}月${day}日`;
      hopePlace.textContent = place.value;
      woukdLike.classList.remove("hidden");
      confirmBtn.focus();
      requestBtn.textContent = "再申し込みする";
    } else {
      location.reload();
    }
  });

  confrim();
}

// 確認ボタン押したときの動作
function confrim() {
  let count = 0;

  confirmBtn.addEventListener("click", () => {
    count++;
    if (count === 1) {
      guidance.classList.add("hidden");
      const resultNum = document.getElementById("num-message");
      resultNum.textContent = randomNum;
      resultRange.classList.remove("hidden");

      const winnerMsg = document.querySelector(".winner-message");

      if (Math.random() < 0.3) {
        const id = obj[1];
        result.textContent = id.result;
        resultMsg.classList.add("hidden");
        winnerMsg.classList.remove("hidden");
        resultPlace.textContent = place.value;
        resultDay.textContent = `2026年${Month}月${day}日`;
      } else {
        const id = obj[2];
        resultMsg.classList.remove("hidden");
        winnerMsg.classList.add("hidden");
        result.textContent = id.result;
        resultMsg.textContent = id.resultMessage;
      }
    } else {
      guidance.classList.add("hidden");
      resultRange.classList.remove("hidden");
    }
  });

  const closeBtn = document.getElementById("close");
  const resultRange = document.querySelector(".result-range");

  closeBtn.addEventListener("click", () => {
    guidance.classList.remove("hidden");
    resultRange.classList.add("hidden");
  });
}
