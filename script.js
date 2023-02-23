let player1 = {
    name: "Player 1",
    score: 0,
    ScoreOutput: document.querySelector("#p1Score"),
    ScoreBackground: document.querySelector(".scoreboard1"),
}
let player2 = {
    name: "Player 2",
    score: 0,
    ScoreOutput: document.querySelector("#p2Score"),
    ScoreBackground: document.querySelector(".scoreboard2"),
}
let player1Turn = true;
let turns = 0;
let matrix = [];
let grid = document.querySelector(".grid");
const winnerOutput = document.querySelector("#winnerOutput")
const endOfRoundPopUp = document.querySelector(".end-of-round");
const winningPatternGrid = document.querySelector(".winning-pattern")
const playAgainBtn = document.querySelector("#playAgainBtn").addEventListener('click', resetGrid);
const closeBtn = document.querySelector("#closeBtn")
const mainWindow = document.querySelector(".window");
let matrixWrapper;
const errorSound = new Audio("../sounds/error.mp3");

closeBtn.addEventListener('click', function() {
    mainWindow.style.visibility = "hidden";
})

// Creates a grid of DIVS that act as the game board
function makeGrid(rows, cols) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);
    for (c = 0; c < cols; c++) {
        for (r = 0; r < rows; r++) {
        let cell = document.createElement("div");
        cell.dataset.matrixRow = (c);
        cell.dataset.matrixCol = (r);
        grid.appendChild(cell).className = "grid-item";
        }
    }
}

// Adds event listeners to each of the blocks in game board
function addCellListeners() {
    matrixWrapper.forEach(cell => cell.addEventListener('click', clickHandler));
}

// handles what happens when a block in the grid gets clicked
function clickHandler(e) {
    turns++
    let userSelectionRow = e.target.dataset.matrixRow;
    let userSelectionCol = e.target.dataset.matrixCol;
    if (player1Turn) {
        player1.ScoreBackground.style.backgroundColor = "black";
        player2.ScoreBackground.style.backgroundColor = "yellow";
        e.target.innerText = "X";
        matrix[userSelectionRow][userSelectionCol] = "X"

    } else {
        player2.ScoreBackground.style.backgroundColor = "black";
        player1.ScoreBackground.style.backgroundColor = "yellow";
        e.target.innerText = "O";
        matrix[userSelectionRow][userSelectionCol] = "O"
    }
    player1Turn = !player1Turn;
    e.target.removeEventListener('click', clickHandler);
    e.target.classList.add("grid-item-clicked")
    checkWinner();
}

// ugly if else function to ascertain if there's a winner
function checkWinner() {
    turns == 9 ? announceWinner("draw") : null;
    // check rows
    for (i = 0; i < 3; i++) {
        if (matrix[i][0] == "X" && matrix[i][1] == "X" && matrix[i][2] == "X") {
            matrix[i][0] = "#";
            matrix[i][1] = "#";
            matrix[i][2] = "#";
            announceWinner("P1");
        } else if (matrix[i][0] == "O" && matrix[i][1] == "O" && matrix[i][2] == "O") {
            matrix[i][0] = "#";
            matrix[i][1] = "#";
            matrix[i][2] = "#";
            announceWinner("P2");
        }
    }
    // check cols
    for (i = 0; i < 3; i++) {
        if (matrix[0][i] == "X" && matrix[1][i] == "X" && matrix[2][i] == "X") {
            matrix[0][i] = "#";
            matrix[1][i] = "#";
            matrix[2][i] = "#";
            announceWinner("P1");
        } else if (matrix[0][i] == "O" && matrix[1][i] == "O" && matrix[2][i] == "O") {
            matrix[0][i] = "#";
            matrix[1][i] = "#";
            matrix[2][i] = "#";
            announceWinner("P2");
        }
    }
    // check diags1
    for (i = 0; i < 3; i++) {
        if (matrix[0][0] == "X" && matrix[1][1] == "X" && matrix[2][2] == "X") {
            matrix[0][0] = "#";
            matrix[1][1] = "#";
            matrix[2][2] = "#";
            announceWinner("P1");
        } else if (matrix[0][0] == "O" && matrix[1][1] == "O" && matrix[2][2] == "O") {
            matrix[0][0] = "#";
            matrix[1][1] = "#";
            matrix[2][2] = "#";
            announceWinner("P2");
        }
    }
    // check diags2
    for (i = 0; i < 3; i++) {
        if (matrix[0][2] == "X" && matrix[1][1] == "X" && matrix[2][0] == "X") {
            matrix[0][2] = "#";
            matrix[1][1] = "#";
            matrix[2][0] = "#";
            announceWinner("P1");
        } else if (matrix[0][2] == "O" && matrix[1][1] == "O" && matrix[2][0] == "O") {
            matrix[0][2] = "#";
            matrix[1][1] = "#";
            matrix[2][0] = "#";
            announceWinner("P2");
        }
    }
}

function announceWinner(result) {
    errorSound.play();
    endOfRoundPopUp.style.visibility = "visible"
    if (result === "P1") {
        player1.score++
        winnerOutput.textContent = `The winner is ${player1.name}!`
        displayWinningMove(3, 3)
    } else if (result === "P2") {
        player2.score++
        winnerOutput.textContent = `The winner is ${player2.name}!`
        displayWinningMove(3, 3)
    } else if (result === "draw") {
        winnerOutput.textContent = `Well that means it's a draw...`
    }
    player1.ScoreOutput.textContent = player1.score;
    player2.ScoreOutput.textContent = player2.score;
}

function displayWinningMove(rows, cols) {
    winningPatternGrid.style.setProperty('--grid-rows', rows);
    winningPatternGrid.style.setProperty('--grid-cols', cols);
    for (c = 0; c < cols; c++) {
        for (r = 0; r < rows; r++) {
        let cell = document.createElement("div");
        cell.textContent = matrix[c][r];
        winningPatternGrid.appendChild(cell).className = "winning-pattern-cell";
        }
    }
    let grid = document.querySelectorAll(".winning-pattern-cell")
    grid.forEach(cell => {
        if (cell.textContent === "#") {
            cell.style.color = "red";
        }
    })
}

function resetGrid() {
    while (winningPatternGrid.firstChild) {
        winningPatternGrid.removeChild(winningPatternGrid.lastChild);
    }
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
    endOfRoundPopUp.style.visibility = "hidden";
    init();
    turns = 0;
}

// init/reset process

function init() {
    makeGrid(3, 3);
    matrixWrapper = document.querySelectorAll(".grid-item");
    addCellListeners();
    matrix = [
        [" ", " ", " ",],
        [" ", " ", " ",],
        [" ", " ", " ",]
    ]
}

init()