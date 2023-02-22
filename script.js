let player1Turn = true;
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
    console.log(matrix);
}

function addCellListeners() {
    matrixWrapper.forEach(cell => cell.addEventListener('click', clickHandler));
}

function updateMatrix() {

}

makeGrid(3, 3);

let matrixWrapper = document.querySelectorAll(".grid-item");

addCellListeners();
