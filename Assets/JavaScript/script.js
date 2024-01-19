var timeEl = document.querySelector(".timer");
var cardEl = document.querySelector(".card");
var startBtnEl = document.getElementById("startBtn");
var cardBtnEl = document.querySelector(".cardBtn");
var feedBackEl = document.querySelector("#feedback");
var highScoreDisplayEl = document.querySelector("#highScoreContainer");

var secondsLeft;
var questNumber = 0;
var questList = [];
var answerList = [];
var storeScores = [];

//main storage object for the quiz questions
var questions = {
    0: { N: 1, Q: "What does HTML stand for?", A: [["C1", "Hyper Text Markup Language"], ["w", "Home Tool Markdown Language"], ["w", "Hyperlinks and Text Markup Language"], ["w", "HTML"]] },
    1: { N: 2, Q: "What does CSS stand for", A: [["C2", "Cascading Style Sheets"], ["w", "Computer Style Sheets"], ["w", "Colorful Style Sheets"], ["w", "Creative Style Sheets"]] },
    2: { N: 3, Q: "what is the proper way to comment in JavaScript?", A: [["C3", "//"], ["w", "<!--"], ["C3", "'/*'"], ["w", "!="]] },
    3: { N: 4, Q: "how do you write javascript in an html file?", A: [["C4", "script tag"], ["w", "You can just write in the file with no specific tags"], ["w", "scr tag"], ["w", "you can't"]] },
    4: { N: 5, Q: "What is bootstrap?", A: [["C5", "A way of quickly making basic styling in HTML"], ["w", "A way of making quick variables in HTML"], ["w", "A way of making your website super fancy in the CSS file"], ["w", "I dunno, sounds like a strap on a boot"]] },
    5: { N: 6, Q: "how do you reference a class in CSS", A: [["C6", ".'class'{}"], ["w", "#'class'{}"], ["w", "'class'{}"], ["w", "you can't"]] },
    6: { N: 7, Q: "how do you write a loop?", A: [["C7", "for(){}"], ["C7", "while(){}"], ["w", "loop(){}"], ["w", "goto(){}"]] },
    7: { N: 8, Q: "how many H elements are there?", A: [["C8", "6"], ["w", "5"], ["w", "10"], ["w", "27.5"]] },
    8: { N: 9, Q: "How does one declare a variable in JavaScript?", A: [["C9", "var x = 0;"], ["w", "x = 0;"], ["w", "var(x) = 0"], ["w", "x = 0: var"]] },
    9: { N: 10, Q: "What is a Turbo Encabulator?", A: [["C10", "A machine that had a base-plate of prefabulated aluminite, surmounted by a malleable logarithmic casing"], ["C10", "A non-existent machine"], ["C10", "a fictional electromechanical machine with a satirical technobabble"], ["C10", "a famous in-joke among engineers"]] }
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
    highScoreDisplayEl.style.display = 'none';

    document.querySelector("#questions").style.display = 'none';
    timeEl.textContent = "60";

    if(JSON.parse(localStorage.getItem('highScores')) !== null){
        storeScores = JSON.parse(localStorage.getItem('highScores'));
    }

    document.querySelector('.cardH1').innerText = 'Coding Quiz!';
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
    document.querySelector("#questions").style.display = 'inline';

    //the questList is randomized, but it's 1-10, so you need to subtract 1 to get the index to match
    let objectIndex = questList[questNumber] - 1;

    if(questNumber >= 10){
        // endScreen();
        // console.log("done")
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
        feedBackEl.textContent = "wrong, -1 second";
    } else {
        feedBackEl.textContent = "correct!";
        questNumber++;
    }
}

function highScores() {

}

//displays the end screed, resets 
function endScreen() {
    startBtnEl.style.display = 'inline';
    document.querySelector("#questions").style.display = 'none';

    //pushes the new score into the array, sorts them, then if there are more than 10 elements, remove the last one.
    storeScores.push(parseInt(secondsLeft));
    storeScores.sort(function (a, b) { return b - a });
    if(storeScores.length > 10){
        storeScores.pop();
    }

    localStorage.setItem('highScores', JSON.stringify(storeScores));

    feedBackEl.textContent = "Congratulations! you got a score of " + secondsLeft;
}

function Timer() {
    secondsLeft = 60;
    var time = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft <= 0 || questNumber >= 10) {
            endScreen();
            clearInterval(time);
            // console.log("done");
            return;
        }
    }, 1000);
}

function clearScores() {
    storeScores = [];
    localStorage.setItem('highScores', JSON.stringify(storeScores));
}

initialState();

document.querySelector('#startBtn').addEventListener("click", function(){
    startQuiz();
});

document.querySelector("#questions").addEventListener("click", function(evt){
    var target = evt.target.id;
    // console.log(target);
    checkAnswer(target);
    questionGen();
});

document.querySelector("#highScoreBtn").addEventListener("click", function(){
    highScoreDisplayEl.style.display = 'inline';
    for(let i = 0; i < storeScores.length; i++){
        document.querySelector("#hs" + i).innerText = storeScores[i];
    }
});

document.querySelector("#highScoreBack").addEventListener('click', function(){
    highScoreDisplayEl.style.display = 'none';
});