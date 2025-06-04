const quoteHere = document.getElementById("quoteHere");
const inputBox = document.getElementById("inputBox");
const wpm = document.getElementById("wpm");
const acc = document.getElementById("acc");
const errs = document.getElementById("errs");
const leftTime = document.getElementById("leftTime");
const diffLv = document.getElementById("diffLv");
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const modCh = document.getElementById("modCh");
const modeSwitch = document.getElementById("modeSwitch");
const modeText = document.getElementById("modeText");
let timeInt, started, quoteNow = "";
function getRndQuote() {
  const level = diffLv.value;
  const pool = wordPools[level];
  return pool[Math.floor(Math.random() * pool.length)];
}

function showQuote() {
  quoteNow = getRndQuote();
  quoteHere.innerHTML = "";
  quoteNow.split("").forEach((c) => {
    const span = document.createElement("span");
    span.innerText = c;
    quoteHere.appendChild(span);
  });
  inputBox.value = "";
}

inputBox.addEventListener("input", () => {
  const spans = quoteHere.querySelectorAll("span");
  const chars = inputBox.value.split("");
  let correct = 0, wrong = 0;
  spans.forEach((span, i) => {
    const typed = chars[i];
    if (typed == null) {
      span.classList.remove("correct", "incorrect");
    } else if (typed === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correct++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      wrong++;
    }
  });

  const mins = (new Date() - started) / 1000 / 60;
  const wordsTyped = inputBox.value.trim().split(/\s+/).length;
  const w = Math.round(wordsTyped / mins || 0);
  const a = Math.round((correct / quoteNow.length) * 100);
  wpm.textContent = isNaN(w) ? 0 : w;
  acc.textContent = `${a}%`;
  errs.textContent = wrong;
});

btnStart.addEventListener("click", () => {
  showQuote();
  inputBox.disabled = false;
  inputBox.focus();
  started = new Date();
  if (modCh.value === "timer") {
    let time = diffLv.value === "medium" ? 45 : diffLv.value === "hard" ? 30 : 60;
    leftTime.textContent = time;
    timeInt = setInterval(() => {
      time--;
      leftTime.textContent = time;
      if (time <= 0) {
        clearInterval(timeInt);
        endNow();
      }
    }, 1000);
  } else {
    leftTime.textContent = "--";
  }
});

btnStop.addEventListener("click", endNow);
function endNow() {
  inputBox.disabled = true;
  clearInterval(timeInt);
}
modeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("nightMood");
  if (document.body.classList.contains("nightMood")) {
    modeText.innerHTML = "🌙 Dark";
  } else {
    modeText.innerHTML = "☀️ Light";
  }
});
