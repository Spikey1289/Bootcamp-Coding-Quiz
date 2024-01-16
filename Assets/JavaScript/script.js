var timeEl = document.querySelector(".timer");
var cardEl = document.querySelector(".card");
var startBtnEl = document.getElementById("startBtn");
var cardBtnEl = document.querySelector(".cardBtn");

var secondsLeft;
var questNumber = 0;
var questList = [];
var answerList = [];
var storeScores = [];

//main storage object for the quiz questions
var questions = {
    0: { N: 1, Q: "one", A: [["C1", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    1: { N: 2, Q: "two", A: [["C2", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    2: { N: 3, Q: "three", A: [["C3", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    3: { N: 4, Q: "four", A: [["C4", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    4: { N: 5, Q: "five", A: [["C5", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    5: { N: 6, Q: "six", A: [["C6", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    6: { N: 7, Q: "seven", A: [["C7", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    7: { N: 8, Q: "eight", A: [["C8", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    8: { N: 9, Q: "nine", A: [["C9", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] },
    9: { N: 10, Q: "ten", A: [["C10", "Correct"], ["w", "Wrong"], ["w", "Wrong"], ["w", "Wrong"]] }
}

//when called, shuffles the input array and returns it
function shuffle(array){
    let index = array.length, randomIndex;

    while (index > 0){
        randomIndex = Math.floor(Math.random() * index);
        index--;

        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
    return array;
}

//sets the page to its initial state when called
function initialState() {
    timeEl.textContent = "60";
}

//re-populates the questList array
function populateQuestions() {
    questList = [];

    for (let i = 0; i < 10; i++) {
        questList.push(questions[i].N);
    }
    questList = shuffle(questList);


}

//starts the quiz when start button is pressed
function startQuiz() {

    //resets question number counter
    questNumber = 0;

    //start timer
    Timer();

    //removes start button
    startBtnEl.style.display = 'none';

    //randomizes the questions
    populateQuestions();

    //generates the first question
    questionGen();
}

//generates a question based off of questNumber
function questionGen() {
    //the questList is randomized, but it's 1-10, so you need to subtract 1 to get the index to match
    let objectIndex = questList[questNumber] - 1;

    if(questNumber >= 10){
        // endScreen();
        console.log("done")
        return;
    }

    //sets the H1 to the question
    document.querySelector('.cardH1').innerText = questions[objectIndex].Q;

    //sets the answers list
    answerList = questions[objectIndex].A;
    answerList = shuffle(answerList);
    // console.log(answerList);
    let buttonsEL = document.querySelectorAll("#questions li");

    //makes answer buttons based off of the answer list
    for (let i = 0; i < answerList.length; i++) {
        let letter = "";
        switch(true){
            case (i === 0):
                letter = "A - ";
            break;
            case (i === 1):
                letter = "B - ";
                break;
            case (i === 2):
                letter = "C - ";
                break;
            case (i === 3):
                letter = "D - ";
                break;
        }
        buttonsEL[i].innerHTML = letter + "<button id='"+ answerList[i][0] +"'>" + answerList[i][1] +"</button>";
    }
}

//checks if the ID fed to it is 'w'. If it is not, next question
function checkAnswer(i){
    if (i === "w"){
        secondsLeft--;
        document.querySelector("#feedback").textContent = "wrong, -1 second";
    } else {
        document.querySelector("#feedback").textContent = "correct!";
        questNumber++;
    }
}

function highScores() {

}

//displays the end screed, resets everything
function endScreen() {
    
}

function Timer() {
    secondsLeft = 60;
    var time = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            // endScreen();
            clearInterval(time);
            console.log("done");
            return;
        }
    }, 1000);
}

function clearScores() {
    storeScores = [];
}

initialState();

document.querySelector('#startBtn').addEventListener("click", function(){
    startQuiz();
})

document.querySelector("#questions").addEventListener("click", function(evt){
    var target = evt.target.id;
    // console.log(target);
    checkAnswer(target);
    questionGen();
})