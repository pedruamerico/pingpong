document.addEventListener('DOMContentLoaded', function() {
    const game = document.getElementById('game');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const ball = document.getElementById('ball');
    const scoreDisplay = document.getElementById('score');
    const gameoverDisplay = document.getElementById('gameover');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('start-btn');
    const startContainer = document.getElementById('start-container');

    let player1Y = 130;
    let player2Y = 130;
    let ballX = 195;
    let ballY = 145;
    let ballSpeedX = -1;
    let ballSpeedY = 1;
    let ballSpeedIncrement = 0.2;
    let initialBallSpeedX = -1;
    let initialBallSpeedY = 1;
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let jogoPausado = true;
    const playerSpeed = 5;
    let gameInterval;

    const keysPressedPlayer1 = {
        w: false,
        s: false
    };

    const keysPressedPlayer2 = {
        ArrowUp: false,
        ArrowDown: false
    };

    function atualizaTela() {
        player1.style.top = `${player1Y}px`;
        player2.style.top = `${player2Y}px`;
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
        scoreDisplay.textContent = `${scorePlayer1} - ${scorePlayer2}`;
    }

    function moveJogadores() {
        if (keysPressedPlayer1.w && player1Y > 0) {
            player1Y -= playerSpeed;
        } else if (keysPressedPlayer1.s && player1Y < 250) {
            player1Y += playerSpeed;
        }

        if (keysPressedPlayer2.ArrowUp && player2Y > 0) {
            player2Y -= playerSpeed;
        } else if (keysPressedPlayer2.ArrowDown && player2Y < 250) {
            player2Y += playerSpeed;
        }

        atualizaTela();
    }

    function moveBola() {
        if (!jogoPausado) {
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Verifica colisão com as bordas verticais
            if (ballX <= 0 || ballX >= 390) {
                ballSpeedX = -ballSpeedX;
            }

            // Verifica colisão com as bordas horizontais
            if (ballY <= 0 || ballY >= 290) {
                ballSpeedY = -ballSpeedY;
            }

            // Verifica colisão com os jogadores
            if (ballX <= 20 && ballY >= player1Y && ballY <= player1Y + 50) {
                ballSpeedX = -ballSpeedX;
                ballSpeedX *= 1 + ballSpeedIncrement; // Aumenta a velocidade da bola
                ballSpeedY *= 1 + ballSpeedIncrement;
            }
            if (ballX >= 370 && ballY >= player2Y && ballY <= player2Y + 50) {
                ballSpeedX = -ballSpeedX;
                ballSpeedX *= 1 + ballSpeedIncrement;
                ballSpeedY *= 1 + ballSpeedIncrement;
            }

            // Verifica se a bola saiu pela esquerda
            if (ballX <= 0) {
                scorePlayer2++;
                if (scorePlayer2 >= 3) {
                    mostraFimDeJogo("Jogador 2");
                } else {
                    reiniciarJogo();
                }
            }
            // Verifica se a bola saiu pela direita
            if (ballX >= 390) {
                scorePlayer1++;
                if (scorePlayer1 >= 3) {
                    mostraFimDeJogo("Jogador 1");
                } else {
                    reiniciarJogo();
                }
            }

            atualizaTela();
        }
    }

    function mostraFimDeJogo(vencedor) {
        jogoPausado = true;
        clearInterval(gameInterval);
        gameoverDisplay.style.display = 'block';
        document.getElementById('winner').textContent = vencedor;
    }

    function reiniciarJogo() {
        player1Y = 120;
        player2Y = 120;
        ballX = 195;
        ballY = 145;
        ballSpeedX = initialBallSpeedX; // Resetar a velocidade da bola
        ballSpeedY = initialBallSpeedY; // Resetar a velocidade da bola
        jogoPausado = true;
        atualizaTela();
        gameoverDisplay.style.display = 'none';
        startContainer.style.display = 'block';
    }

    function iniciarJogo() {
        jogoPausado = false;
        gameoverDisplay.style.display = 'none';
        startContainer.style.display = 'none';
        gameInterval = setInterval(function() {
            moveJogadores();
            moveBola();
        }, 10);
    }

    restartBtn.addEventListener('click', function() {
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        reiniciarJogo();
        iniciarJogo();
    });

    startBtn.addEventListener('click', function() {
        iniciarJogo();
    });

    document.addEventListener('keydown', function(event) {
        const tecla = event.key;

        if (tecla === 'w' || tecla === 's') {
            keysPressedPlayer1[tecla] = true;
        }

        if (tecla === 'ArrowUp' || tecla === 'ArrowDown') {
            keysPressedPlayer2[tecla] = true;
        }
    });

    document.addEventListener('keyup', function(event) {
        const tecla = event.key;

        if (tecla === 'w' || tecla === 's') {
            keysPressedPlayer1[tecla] = false;
        }

        if (tecla === 'ArrowUp' || tecla === 'ArrowDown') {
            keysPressedPlayer2[tecla] = false;
        }
    });
});
