const board = document.getElementById('connect-four-board');
const currentPlayerSpan = document.getElementById('current-player');
const resetBtn = document.getElementById('reset-btn');
const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let gameBoard = [];

// Initialize the game board
function initializeBoard() {
    for (let i = 0; i < ROWS; i++) {
        gameBoard[i] = new Array(COLS).fill(null);
    }
}

// Function to create and render the game board
function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            if (gameBoard[row][col]) {
                cell.style.backgroundColor = gameBoard[row][col];
            }
            board.appendChild(cell);
        }
    }
}

// Function to check for a winner
function checkWinner(row, col) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (const [dx, dy] of directions) {
        let count = 1;
        for (let k = 1; k < 4; k++) {
            const newRow = row + k * dx;
            const newCol = col + k * dy;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && gameBoard[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        for (let k = 1; k < 4; k++) {
            const newRow = row - k * dx;
            const newCol = col - k * dy;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && gameBoard[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

// Function to check for a draw match
function checkDraw() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (!gameBoard[row][col]) {
                return false; // If any cell is empty, the game is not a draw
            }
        }
    }
    return true; // All cells are filled, indicating a draw
}

// Function to reset the game
function resetGame() {
    initializeBoard();
    currentPlayer = 'red';
    currentPlayerSpan.textContent = `Player 1's Turn`;
    renderBoard();
    showClapsAnimation();
}

window.onload = function() {
    // Code to be executed when the page finishes loading
    initializeBoard();
    renderBoard();
};


let animationInProgress = false;

// Function to handle cell click event
function handleCellClick(event) {
    if (animationInProgress) return; 
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    if (!gameBoard[row][col]) {
        let newRow = row;
        while (newRow < ROWS - 1 && !gameBoard[newRow + 1][col]) {
            newRow++;
        }
        gameBoard[newRow][col] = currentPlayer;
        renderBoard();
        dropPiece(newRow, col); 
        
    }
}

// Function to animate the dropped piece
function dropPiece(row, col) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    const piece = document.createElement('div');
    piece.classList.add('piece', currentPlayer, 'falling');
    cell.appendChild(piece);
    animationInProgress = true; // Set animation in progress flag
    piece.addEventListener('animationend', () => {
        piece.classList.remove('falling');
        animationInProgress = false; 
        // Check for a win condition after the animation ends
        if (checkWinner(row, col)) {
            alert(currentPlayer.toUpperCase() + ' wins!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            currentPlayerSpan.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s Turn`;
        }
    });
}
function showClapsAnimation() {
    const clapsElement = document.getElementById('claps');
    clapsElement.classList.remove('hidden');
    setTimeout(() => {
        clapsElement.classList.add('hidden');
    }, 2000);
}


