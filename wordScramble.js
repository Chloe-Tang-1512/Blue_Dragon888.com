const words = [
    { word: 'PYTHON', hint: 'A programming language' },
    { word: 'JAVASCRIPT', hint: 'Web development language' },
    { word: 'COMPUTER', hint: 'Electronic device' },
    { word: 'DATABASE', hint: 'Store data here' },
    { word: 'ALGORITHM', hint: 'Step-by-step procedure' },
    { word: 'VARIABLE', hint: 'Stores a value' },
    { word: 'FUNCTION', hint: 'Reusable block of code' },
    { word: 'LOOP', hint: 'Repeat code multiple times' },
    { word: 'ARRAY', hint: 'Collection of elements' },
    { word: 'STRING', hint: 'Text data type' },
    { word: 'INTEGER', hint: 'Whole number' },
    { word: 'BOOLEAN', hint: 'True or False' },
    { word: 'COMPILER', hint: 'Converts code to machine language' },
    { word: 'DEBUG', hint: 'Find and fix errors' },
    { word: 'SYNTAX', hint: 'Rules of a language' }
];

const shuffledWords = [...words].sort(() => Math.random() - 0.5);

let score = 0;
let level = 1;
let currentWord;
let gameActive = true;

const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
};

const loadWord = () => {
    if (level > shuffledWords.length) {
        endGame();
        return;
    }
    currentWord = shuffledWords[level - 1];
    document.getElementById('scrambled').textContent = scrambleWord(currentWord.word);
    document.getElementById('hint').textContent = '';
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').disabled = false;
    document.getElementById('answerInput').focus();
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'inline-block';
    document.getElementById('hintBtn').style.display = 'inline-block';
    document.getElementById('hintBtn').disabled = false;
};

const submit = () => {
    const answer = document.getElementById('answerInput').value.toUpperCase().trim();

    if (!answer) {
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('feedback').textContent = '❌ Please enter a word!';
        document.getElementById('feedback').className = 'game-feedback wrong';
        return;
    }

    if (answer === currentWord.word) {
        score += 10;
        document.getElementById('score').textContent = score;
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('feedback').textContent = '✅ Correct!';
        document.getElementById('feedback').className = 'game-feedback correct';
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('hintBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('answerInput').disabled = true;
    } else {
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('feedback').textContent = '❌ Wrong! Try again!';
        document.getElementById('feedback').className = 'game-feedback wrong';
    }
};

const showHint = () => {
    document.getElementById('hint').textContent = `Hint: ${currentWord.hint}`;
    document.getElementById('hintBtn').disabled = true;
};

const nextWord = () => {
    level++;
    document.getElementById('level').textContent = level;
    document.getElementById('answerInput').disabled = false;
    loadWord();
};

const endGame = () => {
    gameActive = false;
    document.getElementById('scramble-display').style.display = 'none';
    document.getElementById('game-input').style.display = 'none';
    document.getElementById('hintBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
};

document.getElementById('submitBtn').addEventListener('click', submit);
document.getElementById('answerInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') submit();
});
document.getElementById('hintBtn').addEventListener('click', showHint);
document.getElementById('nextBtn').addEventListener('click', nextWord);
document.getElementById('playAgainBtn').addEventListener('click', () => {
    score = 0;
    level = 1;
    gameActive = true;
    shuffledWords.sort(() => Math.random() - 0.5);
    document.getElementById('score').textContent = '0';
    document.getElementById('level').textContent = '1';
    document.getElementById('gameOver').style.display = 'none';
    document.querySelectorAll('.scramble-display, .game-input, .game-buttons').forEach(el => el.style.display = 'block');
    loadWord();
});

loadWord();
