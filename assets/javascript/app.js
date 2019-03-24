var QAArr = [
    {
        Question:"Every one play Atari game, what does Atari means in Japanese ?",
        Answers:["Fun","Success","Action","Hairy"],
        CorrectIndex:1,
        imageUrl:"./assets/images/sucsess.jpg"
    },
    {
        Question:"Which PC game was delayed in the released because of a hidden picture of a developer ass ?",
        Answers:["Oblivion","Half-life 2","Halo 2","Dude Nukem 3D"],
        CorrectIndex:2,
        imageUrl:"./assets/images/halo-2.jpg"
    },
    {
        Question:"Which game is the all-time highest grossing ?",
        Answers:["World of Warcraft","Dota","Fortnight","Mario"],
        CorrectIndex:0,
        imageUrl:"./assets/images/wow.jpg"
    },
    {
        Question:"Which year Fallout 3 released ?",
        Answers:["2009","2011","2010","2008"],
        CorrectIndex:3,
        imageUrl:"./assets/images/2018.jpg"
    },
    {
        Question:"Homefront was a game about war with which country ?",
        Answers:["Germany","Russia","North Korea","Alien"],
        CorrectIndex:2,
        imageUrl:"./assets/images/33.jpg"
    }
]

var pageCounter = 0;
var score = 0
var isCorrect = false;
var timerIntervalID = 0;
var nTimeOutID
var oTimeOutID

function startTimer() {
    var counter = 8;
    if(timerIntervalID) {
        clearInterval(timerIntervalID)
    }
    timerIntervalID = setInterval(function() {
        counter --;
        $("#timer").text(counter)
        if (counter === 0) {
            console.log("should be stopping")
            stopTimer();
            changePageTo("result",pageCounter);
        }
    },1000)
}

function stopTimer() {
    clearInterval(timerIntervalID);
}
//setTimeout function for display page change
function changePageTo(nextPage,time) {
    if(nTimeOutID) {
        clearTimeout(nTimeOutID);
    }
    nTimeOutID = setTimeout(() => {
        $("#screen").empty();
        if(nextPage === "result") {
            displayResult(pageCounter)
        } else {
            if(pageCounter === QAArr.length){
                displayScore();
            } else {
                displayNextQuestion(pageCounter)
                startTimer()
            }
        }
    },time*1000);
}

function displayNextQuestion(QAIndex) {
    isCorrect = false;
    var QAObject = QAArr[QAIndex];
    var questionDiv = $("<div>");
    $(questionDiv).attr('id','question');
    questionDiv.text(QAObject["Question"]);
    $("#screen").append(questionDiv)

    QAObject["Answers"].forEach(function(answer,index) {
        var answerDiv = $("<div>");
        $(answerDiv).addClass("answer");
        $(answerDiv).attr("data-index",index);
        $(answerDiv).text(answer);
        $("#screen").append(answerDiv)
    })
    changePageTo("result",7);
}

function displayResult(QAIndex) {
    var QAObject = QAArr[QAIndex];
    var corIndex = QAObject["CorrectIndex"];
    var correctAns = QAObject["Answers"][corIndex];
    var imgLink = QAObject["imageUrl"];
    if (isCorrect) {
        var messageDiv = $("<h2> Congrats </h2>");
        $("#screen").append(messageDiv)
    } else {
        var messageDiv = $("<h2> Nope </h2>");
        $("#screen").append(messageDiv)
    }
    $("#screen").append("<div>"+correctAns+"</div>")
    $("#screen").append("<img src="+imgLink+" width='200'>")
    pageCounter+=1;
    changePageTo("next",3);
}

function displayScore() {
    if(nTimeOutID) {
        clearTimeout(nTimeOutID);
    }
    if(timerIntervalID) {
        clearInterval(timerIntervalID);
    }
    //Score message
    $("#screen").append("<div>Congratulation</div>");
    $("#screen").append("<div>Your score is:</div>");
    $("#screen").append("<div>"+score+"</div>");
    //reset button
    var resetButton = $("<button>");
    resetButton.attr('id','reset');
    resetButton.text("Play again?");
    $("#screen").append(resetButton);
}

$("#start").on("click",function(){
    startTimer();
    changePageTo("next",0);
})

$(document).on("click",".answer",function() {
    var choice = parseInt($(this).attr("data-index")); //Jquerry return a string, not number, need parseInt to do compare
    var correctAns = QAArr[pageCounter]["CorrectIndex"];
    stopTimer();
    if(choice === correctAns) {
        isCorrect = true;
        score++;
    } else {
        console.log("This is wrong choice");
        isCorrect = false;
    }
    changePageTo("result",0);
})

$(document).on("click","#reset",function() {
    pageCounter = 0;
    score = 0;
    changePageTo("next");
})