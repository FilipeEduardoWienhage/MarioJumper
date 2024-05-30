const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');

let score = 0;
let isGameOver = false;
let pulando = false;

const jump = () => {
    if (!isGameOver) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump'); 
        }, 500);
    }
}
const updateScore = () => {
    if (!isGameOver && !pulando) {
        score++;
        pulando = true;
        scoreElement.textContent = `Score: ${score}`;
    }
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    
    if (pipePosition <= 120 && pipePosition >0 && marioPosition < 80) {
    
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'game-over.png';
        mario.style.width = '75px'
        mario.style.margionLeft = '50px'

        clearInterval(loop);
        isGameOver = true;

    } else if (marioPosition === 0) {
        pulando = false;
    } else if (pipePosition < 0) {
        updateScore();
    } 

}, 10);

document.addEventListener('keydown', jump);