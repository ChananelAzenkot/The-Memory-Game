const oneInput = document.getElementById("oneInput");
const twoInput = document.getElementById("twoInput");
const theNameOne = document.getElementById("theNameOne");
const theNameTwo = document.getElementById("theNameTwo");

let playerOneAttempts = 0;
let playerOneScore = 0;
let playerTwoAttempts = 0;
let playerTwoScore = 0;

function writeAname() {
  const playerOneName = oneInput.value;
  const playerTwoName = twoInput.value;

  theNameOne.innerHTML = `
  Player one is: ${playerOneName}
  - Attempts: ${playerOneAttempts}
  - Score: ${playerOneScore}`;
  theNameTwo.innerHTML = `
  Player two is: ${playerTwoName}
  - Attempts: ${playerTwoAttempts}
  - Score: ${playerTwoScore}`;
}

let amount = 0;
let range = 0;
let theBox = document.querySelector(".box2");
let titleBox = document.querySelector(".titleBox");

function myFunction() {
  amount = parseInt(document.getElementById("myInputNum").value);
  range = parseInt(document.getElementById("myInputRange").value);
  theBox.style.display = "none";
  titleBox.style.display = "block";
  writeAname();
  test();
  test2();
  timer();
}

const numbers = [];
let attempts = 0;
let time = 160;
let timerInterval;

const board = document.querySelector(".board");

function test() {
  board.style.display = "grid";
  board.style.gridTemplateColumns = `repeat(6, 1fr)`;

  for (let i = 1; i <= amount; i++) {
    const randomNumber = Math.floor(Math.random() * range) + 1;
    numbers.push(randomNumber, randomNumber);
  }
}

function test2() {
  for (let i = 1; i <= amount * 2; i++) {
    const rand = Math.floor(Math.random() * numbers.length);

    const div = document.createElement("div");
    div.innerHTML = `<span>${numbers[rand]}</span>`;
    board.appendChild(div);

    numbers.splice(rand, 1);

    div.addEventListener("click", (ev) => {
      if (ev.target.classList.contains("hidden")) {
        return;
      }

      if (board.querySelectorAll(".showing").length == 2) {
        return;
      }

      ev.target.classList.add("showing");

      const button = document.querySelector("button");
      button.addEventListener("click", () => {
        const board = document.querySelector(".board");
        board
          .querySelectorAll(".cheat")
          .forEach((elem) => elem.classList.remove("cheat"));
        const elements = board.querySelectorAll("div:not(.showing)");

        for (const elem of elements) {
          if (elem.textContent == ev.target.textContent) {
            elem.classList.add("cheat");
            break;
          }
        }
      });
      check();
    });
  }
}

function timer() {
  timerInterval = setInterval(() => {
    time--;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    document.querySelector(
      ".timer"
    ).innerHTML = `${formattedMinutes}:${formattedSeconds}`;

    if (time == 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      window.location.reload();
    }
  }, 1000);
}

function check() {
  const cards = board.querySelectorAll(".showing");

  if (cards.length == 2) {
    const first = cards[0];
    const last = cards[1];

    const currentPlayer =
      (playerOneAttempts + playerTwoAttempts) % 2 === 0 ? "one" : "two";

    if (currentPlayer === "one") {
      playerOneAttempts++;
    } else {
      playerTwoAttempts++;
    }

    document.querySelector(".counter").innerHTML = `${
      playerOneAttempts + playerTwoAttempts
    }`;
    theNameOne.innerHTML = `Player one is: ${oneInput.value} Attempts: ${playerOneAttempts} Score: ${playerOneScore}`;
    theNameTwo.innerHTML = `Player two is: ${twoInput.value} Attempts: ${playerTwoAttempts} Score: ${playerTwoScore}`;

    if (first.textContent == last.textContent) {
      if (currentPlayer === "one") {
        playerOneScore++;
      } else {
        playerTwoScore++;
      }

      theNameOne.innerHTML = `Player one is: ${oneInput.value} - Attempts: ${playerOneAttempts} -  Score: ${playerOneScore}`;
      theNameTwo.innerHTML = `Player two is: ${twoInput.value} - Attempts: ${playerTwoAttempts} - Score: ${playerTwoScore}`;

      setTimeout(() => {
        first.classList.remove("showing");
        last.classList.remove("showing");

        first.classList.add("hidden");
        last.classList.add("hidden");

        checkIsComplete();
      }, 1000);
    } else {
      setTimeout(() => {
        first.classList.remove("showing");
        last.classList.remove("showing");
      }, 1500);
    }
  }
}

function checkIsComplete() {
  const cards = board.querySelectorAll("div:not(.hidden)");

  if (!cards.length) {
    clearInterval(timerInterval);

    if (playerOneScore > playerTwoScore || playerOneScore < playerTwoScore) {
      alert(
        `Player ${
          playerOneScore > playerTwoScore ? oneInput.value : twoInput.value
        } won!`
      );
      const confettiCanvas = document.getElementById("confetti-canvas");
      confetti(confettiCanvas, {
        particleCount: 100,
        spread: 70,
        decay: 0.9,
        origin: { y: 0.6 },
      });
    } else if (playerOneScore == playerTwoScore) {
      alert("no one won!");
    }
    setInterval(() => {
      window.location.reload();
    }, 3000);
  }
}
