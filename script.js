const GameBoard = (() => {
  const buttons = [
    document.querySelector("#btn1"),
    document.querySelector("#btn2"),
    document.querySelector("#btn3"),
    document.querySelector("#btn4"),
    document.querySelector("#btn5"),
    document.querySelector("#btn6"),
    document.querySelector("#btn7"),
    document.querySelector("#btn8"),
    document.querySelector("#btn9"),
  ];
  const gameContainer = document.querySelector("#game-container");
  const hasWon = document.querySelector("#hasWon");
  const oScore = document.querySelector("#oScore");
  const xScore = document.querySelector("#xScore");
  const resetBtn = document.querySelector("#restart");
  const o = document.querySelector("#o-user");
  const x = document.querySelector("#x-user");
  const o1 = document.querySelector("#o-score");
  const x1 = document.querySelector("#x-score");

  let xInput = "";
  let oInput = "";
  setTimeout(() => {
    xInput = prompt("Enter player 1's name:");
    oInput = prompt("Enter player 2's name:");
    x.innerHTML = xInput;
    o.innerHTML = oInput;
  }, 200);

  let xScore1 = 0;
  let oScore2 = 0;

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameOver = false;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getBoard = () => board;

  const placeMarker = (index) => {
    if (board[index] === "" && !gameOver) {
      board[index] = currentPlayer;
      buttons[index].innerHTML = `<p>${currentPlayer}</p>`;
      if (currentPlayer === "X") {
        x1.style.borderBottom = "1px solid #14bdac";
      } else {
        o1.style.borderBottom = "1px solid blue";
      }
      if (checkWinner()) {
        setTimeout(() => {
          if (currentPlayer === "X") {
            hasWon.innerHTML = `${xInput} has won`;
          } else {
            hasWon.innerHTML = `${oInput} has won`;
          }
          console.log(`${currentPlayer} has won!`);
          resetBoard();
        }, 200);
        if (currentPlayer === "X") {
          xScore1 += 1;
          xScore.innerHTML = xScore1;
        } else {
          oScore2 += 1;
          oScore.innerHTML = oScore2;
        }
        gameOver = true;
      } else if (!checkWinner() && board.every((cell) => cell !== "")) {
        hasWon.innerHTML = "It's a draw";
        gameOver = true;
        setTimeout(() => {
          resetBoard();
        }, 500);
      } else {
        switchPlayer();
      }
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "X") {
      x1.style.borderBottom = "1px solid #14bdac";
      o1.style.borderBottom = "none";
    } else {
      o1.style.borderBottom = "1px solid #14bdac";
      x1.style.borderBottom = "none";
    }
  };

  const checkWinner = () => {
    return winningCombos.some((combo) => {
      const [a, b, c] = combo;
      return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
  };

  const setupGame = () => {
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => placeMarker(index));
    });
    x1.style.borderBottom = "1px solid #14bdac";
    resetBtn.addEventListener("click", resetBoard);
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    buttons.forEach((btn) => (btn.innerHTML = ""));
    hasWon.innerHTML = "";
    currentPlayer = "X";
    gameOver = false;
    x1.style.borderBottom = "1px solid #14bdac";
    o1.style.borderBottom = "none";
  };

  return { setupGame, getBoard };
})();

GameBoard.setupGame();
