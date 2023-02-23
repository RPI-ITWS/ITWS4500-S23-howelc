let getURL = "https://howelc.eastus.cloudapp.azure.com/node/trivia";
let category;
let triviaItems = document.getElementsByClassName("game-link");
let startQuiz = document.getElementById("start-btn");
let triviaData;
let nextBtn;
let questionTimer;
let currentTimer = 15;
let postBtn = document.getElementById("post");
let putBtn = document.getElementById("put");
let deleteBtn = document.getElementById("delete");

for (let i = 0; i < triviaItems.length; i++) {
    triviaItems[i].addEventListener("click", function () {
        category = triviaItems[i].getAttribute("data-id");
        window.localStorage.setItem("category", category);
    });
}

if (localStorage.getItem("category") != undefined) {
    category = window.localStorage.getItem("category");
}

function getTrivia() {
    let url = getURL;
    if (category != "null") {
        url += "/" + category;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let triviaHead = document.getElementById("trivia-h2");
            if (category == "null") {
                triviaHead.textContent = `Trivia - All`;
            } else {
                triviaHead.textContent = `Trivia - ${data.results[0].category}`;
            }
            let scoreContainer = document.getElementById("score-container");
            let score = document.getElementById("score");
            let timer = document.getElementById("timer");
            window.localStorage.setItem("score", 0);
            scoreContainer.style.fontSize = "var(--fs-body-lg)";
            currentTimer = 15;
            score.textContent = `Score: ${window.localStorage.getItem("score")}/20`;
            let timerHTML = `
            <i class="bi bi-stopwatch-fill"></i>
            ${currentTimer}
            `;
            timer.insertAdjacentHTML("beforeend", timerHTML);
            let index = 0;
            nextQuestion(index, data);
            questionTimer = setInterval(function () {
                if (index == data.results.length) {
                    clearInterval(questionTimer);
                    let scoreLine = document.getElementById("score-line");
                    scoreLine.style.display = "none";
                    scoreContainer.style.display = "none";
                    let triviaContainer = document.getElementById("trivia-container");
                    triviaContainer.replaceChildren();
                    if (window.localStorage.getItem("highscore") == null) {
                        window.localStorage.setItem("highscore", window.localStorage.getItem("score"));
                    } else if (window.localStorage.getItem("score") > window.localStorage.getItem("highscore")) {
                        window.localStorage.setItem("highscore", window.localStorage.getItem("score"));
                    }
                    let highscore = window.localStorage.getItem("highscore");
                    let scoreHTML = `
                    <div class="text-center pt-5">
                    <h2 class="mb-4 end-score">Your Score</h2>
                    <h3 class="mb-4 end-score">${window.localStorage.getItem("score")}/20</h3>
                    <h2 class="mb-4 end-score">Your High Score</h2>
                    <h3 class="mb-4 end-score">${highscore}/20</h3>
                    </div>
                    `;
                    let startButton = document.getElementById("start-btn");
                    startButton.style.display = "none";
                    triviaContainer.insertAdjacentHTML("beforeend", scoreHTML);
                    let buttonsDiv = document.getElementById("button-container");
                    buttonsDiv.style.display = "flex";
                    let buttonLine = document.getElementById("button-line");
                    buttonLine.style.display = "flex";
                    buttonsDiv.insertAdjacentHTML("beforeend", `<button id="restart-btn" class="btn btn-trivia">Restart</button>`);
                    let restartBtn = document.getElementById("restart-btn");
                    restartBtn.addEventListener("click", function () {
                        let category = window.localStorage.getItem("category");
                        window.localStorage.setItem("category", category );
                        window.localStorage.setItem("score", 0);
                        window.location.reload();
                    });

                }
                currentTimer--;
                timerHTML = `
                <i class="bi bi-stopwatch-fill"></i>
                ${currentTimer}
                `;
                timer.replaceChildren();
                timer.insertAdjacentHTML("beforeend", timerHTML);
                if (currentTimer == 0) {
                    index++;
                    currentTimer = 16;
                    nextQuestion(index, data);
                }
            }, 1000);
        });
}

startQuiz.addEventListener("click", function () {
    let buttonsDiv = document.getElementById("button-container");
    buttonsDiv.style.display = "none";
    let buttonLine = document.getElementById("button-line");
    buttonLine.style.display = "none";
    getTrivia();
});

function nextQuestion(index, data) {
    if(index == data.results.length) {
        return;
    }
    let triviaContainer = document.getElementById("trivia-container");
    triviaContainer.replaceChildren();
    triviaContainer.insertAdjacentHTML("beforeend", `<div id="question" class="ps-2"></div>`);
    let question = document.getElementById("question");
    let currentQuestion = data.results[index].question;
    question.insertAdjacentHTML("beforeend", currentQuestion);
    if (index == data.results.length) {
        clearInterval(questionTimer);
    }
    //clear the trivia container

    let randomAnswers = [];
    let correctAnswer = data.results[index].correct_answer;
    randomAnswers.push(correctAnswer);
    for (let i = 0; i < data.results[index].incorrect_answers.length; i++) {
        randomAnswers.push(data.results[index].incorrect_answers[i]);
    }
    randomAnswers.sort(() => Math.random() - 0.5);
    let triviaHTML = "";
    for (let i = 0; i < randomAnswers.length; i++) {
        triviaHTML += `
        <div class="answer-pill" data-id="${randomAnswers[i]}">
            ${randomAnswers[i]}
        </div>
        `;
    }
    triviaContainer.insertAdjacentHTML("beforeend", triviaHTML);
    let answerPills = document.getElementsByClassName("answer-pill");
    for (let i = 0; i < answerPills.length; i++) {
        //on click, check if the answer is correct
        answerPills[i].addEventListener("click", function () {
            currentScore = window.localStorage.getItem("score");
            if (answerPills[i].getAttribute("data-id") == data.results[index].correct_answer) {
                window.localStorage.setItem("score", parseInt(currentScore) + 1);
                document.getElementById("score").textContent = `Score: ${window.localStorage.getItem("score")}/20`;
                answerPills[i].classList.add("correct");
                currentTimer = 1;
            } else {
                answerPills[i].classList.add("incorrect");
                currentTimer = 1;
            }
        });
    }

}

postBtn.addEventListener("click", function () {
    fetch("https://howelc.eastus.cloudapp.azure.com/node/game/post", {
        method: "POST",
    })
    .then(response => response.json())
    .then(data => alert(data["response"]));
});

putBtn.addEventListener("click", function () {
    fetch("https://howelc.eastus.cloudapp.azure.com/node/game/put", {
        method: "PUT",
    })
    .then(response => response.json())
    .then(data => alert(data["response"]));
});

deleteBtn.addEventListener("click", function () {
    fetch("https://howelc.eastus.cloudapp.azure.com/node/game/delete", {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => alert(data["response"]));
});
