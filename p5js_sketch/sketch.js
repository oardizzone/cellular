function create2DArray(cols, rows) {
    let array = new Array(rows);
    for (let i = 0; i < rows; i++) {
        array[i] = new Array(cols);
    }
    return array;
}

let grid;
let rows = 45;
let cols = 45;
let cellSize = 20;
updateSpeed = 8;

function setup() {
    frameRate(updateSpeed)
    createCanvas(cols * cellSize, rows * cellSize);
    grid = create2DArray(cols, rows);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(255);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * cellSize;
            let y = i * cellSize;
            rect(x, y, cellSize, cellSize);
            fill(grid[i][j] * 255);
        }
    }

    let next = create2DArray(cols, rows);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            let neighbours = countNeightbours(grid, j, i);
            let state = grid[i][j];

            if (state === 0 && neighbours === 3) {
                next[i][j] = 1;
            } else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }

    grid = next;

}

function countNeightbours(grid, x, y) {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let column = (x + j + cols) % cols;
            let row = (y + i + rows) % rows;

            const isCurrentCell = i === 0 && j === 0;

            if (isCurrentCell) {
                sum += 0;
            } else {
                sum += grid[row][column];
            }
        }
    }

    return sum;
}