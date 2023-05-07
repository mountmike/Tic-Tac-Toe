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
let matrixWrapper;
let grid = document.querySelector(".grid");
const winnerOutput = document.querySelector("#winnerOutput")
const endOfRoundPopUp = document.querySelector(".end-of-round");
const winningPatternGrid = document.querySelector(".winning-pattern")
const playAgainBtn = document.querySelector("#playAgainBtn").addEventListener('click', resetGrid);
const closeBtn = document.querySelector("#closeBtn")
const nameChangeWindow = document.querySelector(".namechange");
const updateP1Name = document.querySelector("#updateP1Name");
const updateP2Name = document.querySelector("#updateP2Name");
const p1NameInput = document.querySelector("#p1NameInput")
const p2NameInput = document.querySelector("#p2NameInput")
const p1NameOutput = document.querySelector("#p1NameOutput");
const p2NameOutput = document.querySelector("#p2NameOutput");
const errorSound = new Audio("../sounds/error.mp3");

// Make the window draggable:
dragElement(document.getElementById("window"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

closeBtn.addEventListener('click', function() {
    nameChangeWindow.style.visibility = "hidden";
})

updateP1Name.addEventListener('click', function () {
     player1.name = p1NameInput.value;
     p1NameOutput.textContent = player1.name;
     localStorage.setItem('player1Name', player1.name);
})

updateP2Name.addEventListener('click', function () {
    player2.name = p2NameInput.value;
    p2NameOutput.textContent = player2.name;
    localStorage.setItem('player2Name', player2.name);
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
    localStorage.setItem('player1Score', player1.score);
    localStorage.setItem('player2Score', player2.score);
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
    turns = 0;
    init();
}

function newGame() {
    localStorage.removeItem('player1Score');
    localStorage.removeItem('player2Score');
    localStorage.removeItem('player1Name');
    localStorage.removeItem('player2Name');
    player1.score = 0;
    player2.score = 0;
    resetGrid();
}

function nameChange() {
    nameChangeWindow.style.visibility = "visible";
}

// check and update local storage for score
function checkLocalStorage() {
    localStorage.getItem('player1Score') ? player1.score = localStorage.getItem('player1Score') : player1.score = 0;
    localStorage.getItem('player2Score') ? player2.score = localStorage.getItem('player2Score') : player2.score = 0;
    localStorage.getItem('player1Name') ? player1.name = localStorage.getItem('player1Name') : player1.name = "Player 1";
    localStorage.getItem('player2Name') ? player2.name = localStorage.getItem('player2Name') : player2.name = "Player 2";
    player1.ScoreOutput.textContent = player1.score;
    player2.ScoreOutput.textContent = player2.score;
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
    checkLocalStorage();
    p1NameOutput.textContent = player1.name;
    p2NameOutput.textContent = player2.name;
}

init()