const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const playAgainBtn = document.getElementById("playAgainBtn");
const gameContainer = document.getElementById("gameContainer");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  renderBoard();

  if (checkWin()) {
    showResult(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (!gameState.includes("")) {
    showResult("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((mark, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (mark) {
      cell.classList.add("marked");
      cell.setAttribute("data-mark", mark);
    }
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
  });
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  resultScreen.classList.remove("hidden");
  gameContainer.classList.add("hidden");
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  status.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function playAgain() {
  resultScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  resetGame();
}

resetBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", playAgain);

renderBoard();
