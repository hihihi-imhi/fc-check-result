//結果の情報
const resultChoice = {
  win: {
    result: "第１希望当選",
    resultMessage: "チケットのご用意ができました",
  },
  lose: {
    result: "落選",
    resultMessage: "チケットのご用意ができませんでした",
  },
};

//日程、場所、整番、結果を保存、とりあえず5つ
const resultData = {
  1: {
    day: "",
    place: "",
    num: 0,
    result: "",
  },
  2: {
    day: "",
    place: "",
    num: 0,
    result: "",
  },
  3: {
    day: "",
    place: "",
    num: 0,
    result: "",
  },
  4: {
    day: "",
    place: "",
    num: 0,
    result: "",
  },
  5: {
    day: "",
    place: "",
    num: 0,
    result: "",
  },
};

const requestBtn = document.getElementById("requestbtn");
const place = document.getElementById("place");
const amount = document.getElementById("amount");
let serialNum = 0;
let month = 0;
let day = 0;
let count = 0;

function req() {
  requestBtn.addEventListener("click", () => {
    if (place.value === "") return;
    if (amount.value === "") return;
    serialNum = Math.floor(Math.random() * 99999999);
    month = Math.floor(Math.random() * 12) + 1;
    day = Math.floor(Math.random() * 30) + 1;
    count++;
    resultData[count].num = serialNum;
    resultData[count].day = `2026年${month}月${day}日`;
    resultData[count].place = place.value;
    const template = document.getElementById("guidance-template");
    const clone = template.content.cloneNode("true");
    clone.querySelector(".num").textContent = serialNum;
    clone.querySelector(".last-amount").textContent = `${amount.value}枚`;
    clone.querySelector(".last-day").textContent = `2026年${month}月${day}日`;
    clone.querySelector(".last-place").textContent = place.value;
    clone.querySelector(".guidance").dataset.id = count;
    const display = document.querySelector(".display");
    const div = document.createElement("div");
    div.className = "both";
    div.dataset.id = count;
    div.append(clone);
    display.append(div);

    //複数申し込みするなら、倍率は上げた方がいいのかも？ということで複数申し込むごとに倍率UP。でもこれ全然当たらんかも
    let chance = 0.3;
    for (let i = 1; i < count; i++) {
      chance = chance * 0.3;
    }
    console.log(chance);
    if (Math.random() < chance) {
      resultData[count].result = "win";
    } else {
      resultData[count].result = "lose";
    }
    const addGuidance = div.querySelector(".guidance");
    const confirmBtn = addGuidance.querySelector(".confirm-btn");
    confirmBtn.addEventListener("click", (e) => {
      // 確認ボタンを一回押したらもう申し込めないように
      requestBtn.textContent = "申し込みは終了しました";
      requestBtn.style.background = "#adacad";
      requestBtn.ariaDisabled = true;
      requestBtn.disabled = true;
      confrim(e);
    });
  });
}

function confrim(e) {
  const id = e.currentTarget.closest(".guidance").dataset.id;
  console.log(id, resultData[id]);

  const template = document.getElementById("result-template");
  const clone = template.content.cloneNode("true");
  clone.querySelector(".result-range").dataset.id = id;
  const winnerMsg = clone.querySelector(".winner-message");
  if (resultData[id].result === "win") {
    winnerMsg.classList.remove("hidden");
    clone.querySelector(".num-message").textContent = resultData[id].num;
    clone.querySelector(".result").textContent = resultChoice["win"].result;
    clone.querySelector(".result-place").textContent = resultData[id].place;
    clone.querySelector("#result-day").textContent = resultData[id].day;
  } else {
    winnerMsg.classList.add("hidden");
    clone.querySelector(".num-message").textContent = resultData[id].num;
    clone.querySelector(".result").textContent = resultChoice["lose"].result;
    clone.querySelector("#result-message").textContent =
      resultChoice["lose"].resultMessage;
    clone.querySelector(".result-place").textContent = resultData[id].place;
  }
  const guidance = document.querySelector(`.guidance[data-id="${id}"]`);
  const both = document.querySelector(`.both[data-id="${id}"]`);
  const addResult = clone.querySelector(".result-range");
  both.append(clone);
  guidance.classList.add("hidden");

  const closeBtn = addResult.querySelector(".close");
  closeBtn.addEventListener("click", (e) => {
    const cID = e.currentTarget.closest(".result-range").dataset.id;
    console.log(cID);
    const resultRange = document.querySelector(
      `.result-range[data-id="${cID}"]`,
    );
    resultRange.classList.add("hidden");
    resultRange.remove();
    guidance.classList.remove("hidden");
  });
}

place.focus();
req();
