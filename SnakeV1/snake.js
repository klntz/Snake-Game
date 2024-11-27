const canvas = document.getElementById("snakeGame");
const d_space = canvas.getContext("2d");

let gridSize = 30;
let snake = [{x: 120, y: 120}];
let directionX = gridSize;
let directionY = 0;

// randomize food location
let foodX = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
let foodY = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;

// food image (remi the rat)
const foodImage = new Image();
foodImage.src = 'rat.png';

// snake head image (cartoon head)
const headImage = new Image();
headImage.src = 'snake.png';

let game;

// create the snake's body
function drawCircle(x, y, color) {
    // create some shading to the snakes body
    d_space.shadowColor = "rgba(0, 0, 0, 0.3)";
    d_space.shadowBlur = 8;
    d_space.shadowOffsetX = 4;
    d_space.shadowOffsetY = 4;

    d_space.beginPath();
    d_space.arc(x + gridSize / 2, y + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
    d_space.fillStyle = color;
    d_space.fill();

    d_space.shadowColor = "transparent";
}


// draw the snake, food, and background
function draw() {
    d_space.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw the snake's body
    for (let i = 1; i < snake.length; i++) {
        drawCircle(snake[i].x, snake[i].y, "lightgreen");
    }
    // draw the head
    const head = snake[0];
    d_space.drawImage(headImage, head.x, head.y, gridSize, gridSize);

    // draw the food
    d_space.drawImage(foodImage, foodX, foodY, gridSize, gridSize);
}

// move the snake
function moveSnake() {
    let newHead = {x: snake[0].x + directionX, y: snake[0].y + directionY};

    // if snake hits walls, game over
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        gameOver();
        return;
    }
    // make new head to make snake longer if eat food
    snake.unshift(newHead);

    // if snake eats food, get bigger
    if (newHead.x === foodX && newHead.y === foodY) {
        foodX = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
        foodY = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
    } else {
        snake.pop();
    }
}

// add listener, to look for keypresses
document.addEventListener("keydown", function(event) {
    // press enter to start the game
    if (event.key === "Enter" && !game) {
        startGame();
        return;
    }
    // arrow keys as inputs to move the snake
    if (event.key === "ArrowLeft" && directionX === 0) {
        directionX = -gridSize;
        directionY = 0;
    } else if (event.key === "ArrowUp" && directionY === 0) {
        directionX = 0;
        directionY = -gridSize;
    } else if (event.key === "ArrowRight" && directionX === 0) {
        directionX = gridSize;
        directionY = 0;
    } else if (event.key === "ArrowDown" && directionY === 0) {
        directionX = 0;
        directionY = gridSize;
    }
});

// start the game
function gameLoop() {
    moveSnake();
    draw();
}
// resets the state of the game to the start (removes all parts of snake except the head), new food location
function resetGame() {
    snake = [{x: 120, y: 120}];
    directionX = gridSize;
    directionY = 0;
    foodX = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    foodY = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
    document.getElementById("playButton").textContent = "Press Enter to Play";
    document.getElementById("playButton").classList.remove("hidden");
}
// starts the game -> snake head begines moving
function startGame() {
    resetGame();
    document.getElementById("playButton").classList.add("hidden");
    game = setInterval(gameLoop, 100);
}

// when game ends, show play button again to start over
function gameOver() {
    clearInterval(game);
    document.getElementById("playButton").textContent = "Press Enter to Play Again";
    document.getElementById("playButton").classList.remove("hidden");
    game = null;
}
// play button, when pressed triggers startGame function
document.getElementById("playButton").addEventListener("click", function() {
    startGame();
});

