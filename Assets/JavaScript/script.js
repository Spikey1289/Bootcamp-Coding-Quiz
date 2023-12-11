function shuffle(array){
    let index = array.length, randomIndex;

    while (index > 0){
        randomIndex = Math.floor(Math.random() * index);
        index--;

        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
    return array;
}

var questions = {
    0: { N: 1, Q: "one", A: ["w", "c", "w", "w"] },
    1: { N: 2, Q: "two", A: ["w", "c", "w", "w"] },
    2: { N: 3, Q: "three", A: ["w", "c", "w", "w"] },
    3: { N: 4, Q: "four", A: ["w", "c", "w", "w"] },
    4: { N: 5, Q: "five", A: ["w", "c", "w", "w"] },
    5: { N: 6, Q: "six", A: ["w", "c", "w", "w"] },
    6: { N: 7, Q: "seven", A: ["w", "c", "w", "w"] },
    7: { N: 8, Q: "eight", A: ["w", "c", "w", "w"] },
    8: { N: 9, Q: "nine", A: ["w", "c", "w", "w"] },
    9: { N: 10, Q: "ten", A: ["w", "c", "w", "w"] }
}

var questList = [];
var answerList = [];
for (var i = 0; i < 10; i++) {
    questList.push(questions[i].N);
}

console.log(questList);
questList = shuffle(questList);

for (var i = 0; i < questList.length; i++) {
    var objectIndex = questList[i]-1;
    questList[i] = questions[objectIndex].Q;
    for (var i = 0; i < questions[objectIndex].A.length(); i++){
        
    }
    
}

console.log(questList);

var storeScores = [];

function initialState(){

}

function highScores(){

}

function quiz(){
    var questList = [];
    for (var i = 0; i < 10; i++) {
        questList.push(questions[i].N);
    }

}

function endScreen(){

}

function clearScores(){
    storeScores = [];
}