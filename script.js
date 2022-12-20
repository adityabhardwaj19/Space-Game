score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38 && 32) {
        rocket = document.querySelector('.rocket');
        rocketY = parseInt(window.getComputedStyle(rocket, null).getPropertyValue('bottom'));
        rocket.style.bottom = rocketY + 112 + "px";
        // rocket.classList.add('animaterocket');
        setTimeout(() => {
            rocketY = parseInt(window.getComputedStyle(rocket, null).getPropertyValue('bottom'));
            rocket.style.bottom = rocketY - 112 + "px";
            // rocket.classList.remove('animaterocket')
        }, 700);
    }
    if (e.keyCode == 39) {
        rocket = document.querySelector('.rocket');
        rocketX = parseInt(window.getComputedStyle(rocket, null).getPropertyValue('left'));
        rocket.style.left = rocketX + 112 + "px";
    }
    if (e.keyCode == 37) {
        rocket = document.querySelector('.rocket');
        rocketX = parseInt(window.getComputedStyle(rocket, null).getPropertyValue('left'));
        rocket.style.left = (rocketX - 112) + "px";
    }
}

setInterval(() => {
    rocket = document.querySelector('.rocket');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(rocket, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(rocket, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}