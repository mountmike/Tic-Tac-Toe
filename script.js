let player1Turn = true;
let turns = 0;
let matrix = [
    [" ", " ", " ",],
    [" ", " ", " ",],
    [" ", " ", " ",]
]
let player1 = {
    name: "Player 1",
    score: 0,
}
let player2 = {
    name: "Player 2",
    score: 0,
}
let grid = document.querySelector(".grid");
let winnerOutput = document.querySelector("#winnerOutput")
let endOfRoundPopUp = document.querySelector(".end-of-round");


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
        e.target.innerText = "X";
        matrix[userSelectionRow][userSelectionCol] = "X"

    } else {
        e.target.innerText = "O";
        matrix[userSelectionRow][userSelectionCol] = "O"
    }
    player1Turn = !player1Turn;
    e.target.removeEventListener('click', clickHandler);
    checkWinner();
}

// ugly if else function to ascertain if there's a winner
function checkWinner() {
    turns == 9 ? announceWinner("draw") : null;
    let winner;
    // check rows
    for (i = 0; i < 3; i++) {
        if (matrix[i][0] == "X" && matrix[i][1] == "X" && matrix[i][2] == "X") {
            announceWinner("P1");
        } else if (matrix[i][0] == "O" && matrix[i][1] == "O" && matrix[i][2] == "O") {
            announceWinner("P2");
        }
    }
    // check cols
    for (i = 0; i < 3; i++) {
        if (matrix[0][i] == "X" && matrix[1][i] == "X" && matrix[2][i] == "X") {
            announceWinner("P1");
        } else if (matrix[0][i] == "O" && matrix[1][i] == "O" && matrix[2][i] == "O") {
            announceWinner("P2");
        }
    }
    // check diags1
    for (i = 0; i < 3; i++) {
        if (matrix[0][0] == "X" && matrix[1][1] == "X" && matrix[2][2] == "X") {
            announceWinner("P1");
        } else if (matrix[0][0] == "O" && matrix[1][1] == "O" && matrix[2][1] == "O") {
            announceWinner("P2");
        }
    }
    // check diags2
    for (i = 0; i < 3; i++) {
        if (matrix[0][2] == "X" && matrix[1][1] == "X" && matrix[2][0] == "X") {
            announceWinner("P1");
        } else if (matrix[0][2] == "O" && matrix[1][1] == "O" && matrix[2][0] == "O") {
            announceWinner("P2");
        }
    }
}

function announceWinner(result) {
    endOfRoundPopUp.style.visibility = "visible"
    if (result === "P1") {
    winnerOutput.textContent = `The winner is ${player1.name}!`
    player1.score++
    } else if (result === "P2") {
        winnerOutput.textContent = `The winner is ${player2.name}!`
        player2.score++
    } else if (result === "draw") {
        winnerOutput.textContent = `Well that means it's a draw...`
    }
}

// init process
makeGrid(3, 3);

let matrixWrapper = document.querySelectorAll(".grid-item");

addCellListeners();
