// gettting canvas for game to be played in
const canvas = document.getElementById("snakeGame");
const d_space = canvas.getContext("2d");

// define how the snake moves inside the game space (moves 30pixels each update)
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

// define gmae for marking game state
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

    // if snake hits a wall, game ends calls gameOver function
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        gameOver();
        return;
    }

    // Check if the snake collides with itself. start i = 1 because i[0] is the head
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // make new head to make snake longer if eat food
    snake.unshift(newHead);

    // if snake eats food, no last part of snake is removed, new head is where food was
    if (newHead.x === foodX && newHead.y === foodY) {
        // new position for food
        foodX = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
        foodY = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
    } else {
        // if doesnt hit food, removes last part to keep moving
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

// resets the state of the game to the start (removes all parts of snake except the head), new random food location
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
    // set how often the game refreshes (100 milliseconds)
    game = setInterval(gameLoop, 100);
}

// when game ends, show play button again to start over
function gameOver() {
    clearInterval(game);
    // score is length - 1 for the head
    const score =  snake.length - 1;
    // display the score on one line, and play again on a separate line 
    document.getElementById("playButton").innerHTML = "Score: " + score + "<br>" + "Press Enter to Play Again";
    document.getElementById("playButton").classList.remove("hidden");
    game = null;
}

// play button, when pressed triggers startGame function
document.getElementById("playButton").addEventListener("click", function() {
    startGame();
});

