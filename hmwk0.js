let secret, attempts, best;

const startGame = () => {
    secret = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('gameDisplay').innerHTML = '🎲 New game started! Make your first guess...';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
    document.getElementById('newGameBtn').style.display = 'none';
};

const makeGuess = () => {
    const guess = parseInt(document.getElementById('guessInput').value);
    if (!guess || guess < 1 || guess > 100) {
        document.getElementById('gameDisplay').innerHTML = '❌ Please enter a number between 1-100';
        return;
    }

    attempts++;
    let message = `Guess #${attempts}: ${guess} - `;

    if (guess === secret) {
        best = best === undefined ? attempts : Math.min(best, attempts);
        message += `🎉 Correct! You found it in ${attempts} attempt${attempts > 1 ? 's' : ''}!`;
        document.getElementById('highScore').textContent = best;
        document.getElementById('gameDisplay').innerHTML = message;
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessBtn').disabled = true;
        document.getElementById('newGameBtn').style.display = 'inline-block';
    } else {
        message += guess < secret ? '📈 Too low! Try higher.' : '📉 Too high! Try lower.';
        document.getElementById('gameDisplay').innerHTML = message;
    }

    document.getElementById('attempts').textContent = attempts;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
};

document.getElementById('guessBtn').addEventListener('click', makeGuess);
document.getElementById('guessInput').addEventListener('keypress', e => e.key === 'Enter' && makeGuess());
document.getElementById('newGameBtn').addEventListener('click', () => {
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
    startGame();
});

startGame();