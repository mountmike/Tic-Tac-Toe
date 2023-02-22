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
};

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

function addCellListeners() {
    matrixWrapper.forEach(cell => cell.addEventListener('click', clickHandler));
}

function checkWinner() {
    turns == 9 ? console.log('draw') : null;
    let winner;
    // check rows
    for (i = 0; i < 3; i++) {
        if (matrix[i][0] == "X" && matrix[i][1] == "X" && matrix[i][2] == "X") {
            console.log('X wins');
        } else if (matrix[i][0] == "O" && matrix[i][1] == "O" && matrix[i][2] == "O") {
                console.log('0 wins');
        }
    }
    // check cols
    for (i = 0; i < 3; i++) {
        if (matrix[0][i] == "X" && matrix[1][i] == "X" && matrix[2][i] == "X") {
            console.log('X wins');
        } else if (matrix[0][i] == "O" && matrix[1][i] == "O" && matrix[2][i] == "O") {
                console.log('0 wins');
        }
    }
    // check diags1
    for (i = 0; i < 3; i++) {
        if (matrix[0][0] == "X" && matrix[1][1] == "X" && matrix[2][2] == "X") {
            console.log('X wins');
        } else if (matrix[0][0] == "O" && matrix[1][1] == "O" && matrix[2][1] == "O") {
                console.log('0 wins');
        }
    }
    // check diags2
    for (i = 0; i < 3; i++) {
        if (matrix[0][2] == "X" && matrix[1][1] == "X" && matrix[2][0] == "X") {
            console.log('X wins');
        } else if (matrix[0][2] == "O" && matrix[1][1] == "O" && matrix[2][0] == "O") {
                console.log('0 wins');
        }
    }
}

makeGrid(3, 3);

let matrixWrapper = document.querySelectorAll(".grid-item");

addCellListeners();
