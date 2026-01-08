// Get our DOM Elements all contained so they don't run off.

const timerDisplay = document.querySelector('.timer-display');
const modeDisplay = document.querySelector('.mode-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workBtn = document.getElementById('work-btn');
const breakBtn = document.getElementById('break-btn');
//Alarm sound
// Create audio element for alarm
const alarm = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

// State - and all that goes with it

let timeLeft = 25 * 60;
let isRunning = false;
let timerInterval = null;
let currentMode = 'work';

// Update the display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    //padStart adds a leading zero if needed: 5 becomes "05" so it doesn't feel bad about things.

    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    timerDisplay.textContent = display;
    document.title = `${display} - Pomodoro`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            isRunning = false;
            alarm.play().catch(e => console.log('Audio failed to play:' ,e));

            //auto-switch modes
            const nextMode = currentMode === 'work' ? 'break' : 'work';
            setMode(nextMode);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

//Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = currentMode === 'work' ? 25 * 60 : 5 * 60;
    updateDisplay();
}



//Switch Modes
function setMode(mode) {
    currentMode = mode;
    timerleft = mode === 'work' ? 25 * 60 : 5 * 60;
    modeDisplay.textContent = mode === 'work' ? 'Work' : 'Break';

    //update button styles
    workBtn.classList.toggle('active', mode === 'work');
    breakBtn.classList.toggle('active', mode === 'break')

    // stop timer and update display
    pauseTimer();
    resetTimer();
}

//Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
workBtn.addEventListener('click', () => setMode('work'));
breakBtn.addEventListener('click', () => setMode('break'));
