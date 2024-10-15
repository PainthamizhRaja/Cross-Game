// Game variables
let board;
let currentPlayer = 'X';
let gameActive = true;
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize game board
function initializeGame() {
  board = Array(9).fill(null);
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  message.textContent = `Player ${currentPlayer}'s turn`;
  message.classList.remove('popup');
  message.style.opacity = '1';
  resetButton.style.display = 'none';

  // Create game cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    message.classList.add('popup');
    gameActive = false;
    resetButton.style.display = 'block';
  } else if (board.every(cell => cell)) {
    message.textContent = `It's a draw!`;
    message.classList.add('popup');
    resetButton.style.display = 'block';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Reset the game
resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  initializeGame();
});

// Start the game
initializeGame();
