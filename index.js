
/* https://www.educative.io/blog/javascript-snake-game-tutorial */

const snakeboard = document.querySelector('gameCanvas');
const snakeboard_ctx = gameCanvas.getContext('2d');

let snake = [
    {x:200, y:200}, 
    {x:190, y:200},
    {x:180, y:200},
    {x:170, y:200},
    {x:160, y:200},
]

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = 'cyan';
    snakeboard_ctx.strokestyle = ''
}
