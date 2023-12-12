var timeEl = document.querySelector(".timer");
var secondsLeft;
var questList = [];
var answerList = [];
var storeScores = [];

var questions = {
    0: { N: 1, Q: "one", A: ["C1", "w", "w", "w"] },
    1: { N: 2, Q: "two", A: ["C2", "w", "w", "w"] },
    2: { N: 3, Q: "three", A: ["C3", "w", "w", "w"] },
    3: { N: 4, Q: "four", A: ["C4", "w", "w", "w"] },
    4: { N: 5, Q: "five", A: ["C5", "w", "w", "w"] },
    5: { N: 6, Q: "six", A: ["C6", "w", "w", "w"] },
    6: { N: 7, Q: "seven", A: ["C7", "w", "w", "w"] },
    7: { N: 8, Q: "eight", A: ["C8", "w", "w", "w"] },
    8: { N: 9, Q: "nine", A: ["C9", "w", "w", "w"] },
    9: { N: 10, Q: "ten", A: ["C10", "w", "w", "w"] }
}

function shuffle(array){
    let index = array.length, randomIndex;

    while (index > 0){
        randomIndex = Math.floor(Math.random() * index);
        index--;

        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
    return array;
}

function initialState() {

}

function quiz() {
    for (var i = 0; i < 10; i++) {
        questList.push(questions[i].N);
    }

    console.log(questList);
    questList = shuffle(questList);

    for (var i = 0; i < questList.length; i++) {
        var objectIndex = questList[i] - 1;
        console.log(questions[objectIndex].Q);
        answerList = questions[objectIndex].A;
        answerList = shuffle(answerList);
        for (var x = 0; x < answerList.length; x++) {
            console.log(answerList[x]);
        }
    }
}

function highScores() {

}

function endScreen() {

}

function Timer() {
    secondsLeft = 60;
    var time = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + "";

        if (secondsLeft === 0) {
            // endScreen();
            clearInterval(time);
            return;
        }
    }, 1000);
}

function clearScores() {
    storeScores = [];
}


Timer();