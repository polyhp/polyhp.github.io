var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var box = 20;
var canvasSize = 20;
var snake;
var food;
var score;
var d;
var gamePaused = false;
var gameOver = false;
var game;

function initGame() {
    snake = [];
    snake[0] = { x: 19 * box, y: 20 * box };

    food = {
        x: Math.floor(Math.random() * canvasSize) * box,
        y: Math.floor(Math.random() * canvasSize) * box
    };

    score = 0;
    d = null;
    gamePaused = false;
    gameOver = false;

    clearInterval(game);
    game = setInterval(draw, 200);
}

document.addEventListener('keydown', direction);
document.addEventListener('keydown', togglePause);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function togglePause(event) {
    if (event.keyCode == 32) {
        if (gameOver) {
            initGame();
        } else {
            gamePaused = !gamePaused;
            if (!gamePaused) {
                game = setInterval(draw, 200);
            } else {
                clearInterval(game);
            }
        }
    }
}

function collision(newHead, array) {
    for (let i = 0; i < array.length; i++) {
        if (newHead.x == array[i].x && newHead.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    if (gamePaused) return;

    ctx.fillStyle = "#c09999";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "blue" : "black";
        ctx.strokeStyle = "blue";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        gameOver = true;
       
    }

    snake.unshift(newHead);

    ctx.fillStyle = "red";
    ctx.font = "40px serif";
    ctx.fillText("Score: " + score, 20, canvas.height - 30);
}

initGame();