const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas settings
canvas.width = 600;
canvas.height = 400;

// Game settings
const cellSize = 20;
let snake = [{ x: 100, y: 100 }, { x: 80, y: 100 }, { x: 60, y: 100 }];
let direction = "RIGHT";
let food = randomFood();
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let lastScore = localStorage.getItem("lastScore") || 0;
let playerName = "";
let gameRunning = false;

// Load high score and last score
document.getElementById("highScore").innerText = highScore;
document.getElementById("lastScore").innerText = lastScore;

// Listen for arrow key inputs
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Random food position
function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize,
        y: Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize
    };
}

// Game loop
function updateGame() {
    if (!gameRunning) return;

    let head = { ...snake[0] };
    if (direction === "UP") head.y -= cellSize;
    if (direction === "DOWN") head.y += cellSize;
    if (direction === "LEFT") head.x -= cellSize;
    if (direction === "RIGHT") head.x += cellSize;

    // Collision detection
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        stopGame();
        return;
    }

    // Add new head
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = randomFood();
    } else {
        snake.pop();
    }

    drawGame();
    setTimeout(updateGame, 100);
}

// Draw game elements
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, cellSize, cellSize);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, cellSize, cellSize));

    // Display score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Start game
function startGame() {
    playerName = document.getElementById("playerName").value || "Player";
    document.getElementById("displayPlayer").innerText = playerName;
    gameRunning = true;
    snake = [{ x: 100, y: 100 }, { x: 80, y: 100 }, { x: 60, y: 100 }];
    direction = "RIGHT";
    score = 0;
    updateGame();
}

// Stop game
function stopGame() {
    gameRunning = false;
    alert(`${playerName}, Game Over! Your Score: ${score}`);

    // Update last score (so next player can see it)
    lastScore = score;
    localStorage.setItem("lastScore", lastScore);
    document.getElementById("lastScore").innerText = lastScore;

    // Update high score if beaten
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highScore").innerText = highScore;
    }
}
