const words = [
    'PYTHON', 'ELEMENT', 'COMPUTER', 'DATABASE', 'ALGORITHM',
    'VARIABLE', 'FUNCTION', 'DEBUGGING', 'NETWORK', 'CODING',
    'PROGRAM', 'DEVELOPER', 'INTERFACE', 'SOFTWARE', 'HARDWARE',
    'KEYBOARD', 'MONITOR', 'MEMORY', 'PROCESSOR', 'STORAGE'
];

const hangmanStages = [
    '',
    '  O',
    '  O\n  |',
    '  O\n /|',
    '  O\n /|\\',
    '  O\n /|\\\n /',
    '  O\n /|\\\n / \\'
];

let word;
let guessed = [];
let wrong = [];
let lives = 6;
let wins = 0;
let score = 0;
let gameActive = true;

const pickWord = () => {
    word = words[Math.floor(Math.random() * words.length)];
};

const getDisplayWord = () => {
    return word.split('').map(letter => guessed.includes(letter) ? letter : '_').join(' ');
};

const guessLetter = (letter) => {
    if (!gameActive) return;
    
    letter = letter.toUpperCase();
    
    if (!letter.match(/[A-Z]/)) return;
    if (guessed.includes(letter) || wrong.includes(letter)) return;

    if (word.includes(letter)) {
        guessed.push(letter);
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('feedback').textContent = `✅ ${letter} is in the word!`;
        document.getElementById('feedback').className = 'game-feedback correct';
    } else {
        wrong.push(letter);
        lives--;
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('feedback').textContent = `❌ ${letter} is not in the word!`;
        document.getElementById('feedback').className = 'game-feedback wrong';
    }

    document.getElementById('lives').textContent = lives;
    document.getElementById('guessed').textContent = [...guessed, ...wrong].join(', ');
    document.getElementById('word').textContent = getDisplayWord();
    document.getElementById('hangman').textContent = hangmanStages[6 - lives];
    document.getElementById('letterInput').value = '';

    checkGameStatus();
};

const checkGameStatus = () => {
    if (getDisplayWord().replace(/ /g, '') === word) {
        wins++;
        score += lives * 10;
        document.getElementById('wins').textContent = wins;
        document.getElementById('score').textContent = score;
        endGame(true);
    } else if (lives === 0) {
        endGame(false);
    }
};

const endGame = (won) => {
    gameActive = false;
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('letterInput').disabled = true;

    if (won) {
        document.getElementById('gameOverTitle').textContent = '🎉 You Won!';
        document.getElementById('gameOverMessage').textContent = `You guessed the word with ${lives} lives remaining!`;
    } else {
        document.getElementById('gameOverTitle').textContent = '💀 Game Over!';
        document.getElementById('gameOverMessage').textContent = `You ran out of lives!`;
    }
    document.getElementById('revealWord').textContent = word;
};

const newGame = () => {
    guessed = [];
    wrong = [];
    lives = 6;
    gameActive = true;
    pickWord();
    document.getElementById('lives').textContent = lives;
    document.getElementById('guessed').textContent = '';
    document.getElementById('word').textContent = getDisplayWord();
    document.getElementById('hangman').textContent = hangmanStages[0];
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('letterInput').disabled = false;
    document.getElementById('letterInput').value = '';
    document.getElementById('letterInput').focus();
};

document.getElementById('letterInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        guessLetter(e.target.value);
    }
});

document.getElementById('newGameBtn').addEventListener('click', newGame);
document.getElementById('playAgainBtn').addEventListener('click', newGame);

newGame();