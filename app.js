// Global variables
var Score = 0;
var Stage = 0;
var Timer = 50;
var Interval = 1500;
var soundInterval = 0.7
var addTimerNumber = 10
var randomWord = null
var intervalTimer
var beginTimer
var beginCounter = 3
var endgame = false

// Dom variables
var ScoreData = $('.score')
var timerData = $('.timer')
var addTimerData = $('.add-timer')
var stageData = $('.stage')
var beginTimerElem = $('.modal-cont-begin h2')

// Audio SRC
var bgMusic = document.createElement('audio');
bgMusic.setAttribute('src', 'sounds/bgmusic.mp3');
bgMusic.setAttribute('autoplay', 'autoplay');
$.get();
bgMusic.addEventListener("load", function () {
    bgMusic.load();
    bgMusic.pause();
}, true);
bgMusic.playbackRate = soundInterval

var loseSound = document.createElement('audio');
loseSound.setAttribute('src', 'sounds/lose.mp3');
$.get();
loseSound.addEventListener("load", function () {
    loseSound.load();
    loseSound.pause();
    alert()
}, true);

var scoreSound = document.createElement('audio');
scoreSound.setAttribute('src', 'sounds/score.mp3');
$.get();
scoreSound.addEventListener("load", function () {
    scoreSound.load();
    scoreSound.pause();
}, true);

var counterSound = document.createElement('audio');
counterSound.setAttribute('src', 'sounds/count.mp3');
$.get();
counterSound.addEventListener("load", function () {
    counterSound.load();
    counterSound.pause();
}, true);

counterSound.pause();
bgMusic.pause();
loseSound.pause();
scoreSound.pause();

function playbtnevent(){
    document.querySelector(".modal-cont-begin").classList.add("show")
    document.querySelector(".modal-cont-begin").classList.remove("hidden")

    document.querySelector(".play_box").classList.add("hidden")
    document.querySelector(".play_box").classList.remove("show")
    
    // Function expression
    beginTimer()
}

// Event when you catch word correct
document.querySelector('input').addEventListener('keyup', function () {
    SecurityKey = true
    if (document.querySelector('input').value === randomWord.toLowerCase()) {
        if (Score % 10 == 0) {
            addStage()
        }
        document.querySelector('input').value = ''
        setRandomWord()
        Score++
        scoreSound.volume = 0.5
        scoreSound.play()
        ScoreData.addClass('green')
        ScoreData.css('transform', 'scale(1.2)')
        Timer += addTimerNumber
        ScoreData.html("Score " + Score)
        timerData.addClass('green')
        timerData.html(Timer + "s")
        addTimerData.css('display', 'flex')
        addTimerData.html('+ ' + addTimerNumber)
        setTimeout(() => {
            timerData.removeClass('green')
            addTimerData.css('display', 'none')
            ScoreData.removeClass('green')
            ScoreData.css('transform', 'scale(1)')
        }, 600);
    }
})

// When your stage increment
function addStage() {
    soundInterval += 0.05
    Interval -= 20
    bgMusic.playbackRate = soundInterval
    Stage++
    stageData.css('transform', 'scale(1.2)')
    stageData.html("Stage  " + Stage)
    startTimer()
    setTimeout(() => {
        stageData.css('transform', 'scale(1)')
    }, 600);
}

// When timer is 0 begin Game
function beginTimer() {
    bgMusic.pause()
    beginTimer = setInterval(beginFun, 1000)
}

function beginFun() {
    counterSound.play()
    if (beginCounter === 0) {
        clearInterval(beginTimer)
        setDefData()
        beginCounter = 0
        bgMusic.play()
        $('.modal-cont-begin').css('display', 'none')
        document.querySelector('input').focus()
        return beginTimerElem.html(beginCounter)
    }
    beginCounter--
    beginTimerElem.html(beginCounter)
    document.querySelector('input').value = null
}

// Set all data and functions in mounted mode
function setDefData() {
    ScoreData.html("Score " + Score)
    stageData.html("Stage  " + Stage)
    startTimer()
    setRandomWord()
}

// Get Random word from array
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function setRandomWord() {
    var Words = []
    $.getJSON("words.json", function (data) {
        Words = data
        randomWord = Words[Math.floor(Math.random() * Words.length)]
        shuffle(Words)
        $('.word').html(randomWord.toLowerCase())
    }).fail(function () {
        console.log("An error has occurred.");
    });
}

// All timer setting is here
function timerSetting() {
    if (endgame) {
        return clearInterval(intervalTimer)
    }
    if (Timer < 10) {
        timerData.addClass('red')
    } else{
        timerData.removeClass('red')
    }
    if (Timer === 0) {
        gameOver()
    } else {
        Timer--
        timerData.html(Timer + "s")
    }
}

// Timer is starting with default interval
function startTimer() {
    intervalTimer = setInterval(timerSetting, Interval)
}

// When your timer is 0 call this function
function gameOver() {
    endgame = true
    clearInterval(intervalTimer)
    loseSound.play()
    bgMusic.pause();
    $('.modal-cont').css('display', 'flex')
    $('.your-time').html('Your score is ' + Score)
    $('.your-stage').html('Your stage is ' + Stage)
    $('.modal-cont .modal-box').css('display', 'flex')
    document.querySelector('input').setAttribute('disabled', true)
    setTimeout(() => {
        document.querySelector('input').value = null
    }, 500);
}

// Just restart game
function Repeat() {
    location.reload()
}