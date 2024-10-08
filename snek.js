const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake;
let direction;
let food;
let score;
let game;

function initializeGame() {
    snake = [{x: 160, y: 160}];  // Start the snake in the middle of the canvas
    direction = {x: gridSize, y: 0};  // Set the initial direction to the right
    food = {x: getRandomCoordinate(), y: getRandomCoordinate()};
    score = 0;
}

function getRandomCoordinate() {
    return Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the background color of the play area to white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the pink border
    ctx.strokeStyle = "pink";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw food (pink letter "E")
    ctx.fillStyle = "pink";
    ctx.font = "20px Arial";
    ctx.fillText("E", food.x, food.y + gridSize - 2);

    // Draw snake (pink squares)
    ctx.fillStyle = "pink";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

    // Move snake
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {x: getRandomCoordinate(), y: getRandomCoordinate()};
    } else {
        snake.pop();
    }

    // Check collisions with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }

    // Check collisions with self
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(game);
    const playAgain = confirm("Game Over! Your score: " + score + ". Do you want to play again?");
    
    if (playAgain) {
        initializeGame();  // Reset game state
        game = setInterval(draw, 100);  // Restart the game loop
    } else {
        alert("Thanks for playing!");
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction.x === 0) { // Left arrow
        direction = {x: -gridSize, y: 0};
    } else if (keyPressed === 38 && direction.y === 0) { // Up arrow
        direction = {x: 0, y: -gridSize};
    } else if (keyPressed === 39 && direction.x === 0) { // Right arrow
        direction = {x: gridSize, y: 0};
    } else if (keyPressed === 40 && direction.y === 0) { // Down arrow
        direction = {x: 0, y: gridSize};
    }
}

// Initialize the game on page load
initializeGame();

// Listen for keyboard input
window.addEventListener("keydown", changeDirection);

// Start the game loop
game = setInterval(draw, 100);
