'use strict';

const questions = [
  { 
    number: 1,
    text: `What potion should a witcher use to gradually heal themselves?`,
    answer1: `White Honey`,
    answer2: `Golden Oriole`, 
    answer3: `Swallow`, 
    answer4: `Cat`
  }, 

  {
    number: 2,
    text: `What sign should a witcher cast when fighting with a spirit?`,
    answer1: `Igni`, 
    answer2: `Axii`, 
    answer3: `Aard`, 
    answer4: `Yrden`
  }, 

  {
    number: 3,
    text: `Who is the king of the Wild Hunt?`,
    answer1: `Imlerith`, 
    answer2: `Eredin`, 
    answer3: `Avallac'h`, 
    answer4: `Iowerth`
  }, 
  {
    number: 4, 
    text: `What animal is Geralt of Rivia's horse named after?`,
    answer1: `A bug`, 
    answer2: `A fish`, 
    answer3: `A wolf`, 
    answer4: `A monster`
  }, 
  {
    number: 5,
    text: `In Hearts of Stone what has the Ofieri prince transformed into?`,
    answer1: `An ArchGriffin`, 
    answer2: `A Leshen`, 
    answer3: `A Giant Toad`, 
    answer4: `A Pestos`
  }, 
  {
    number: 6,
    text: `What bomb should a witcher throw to blind an opponent?`,
    answer1: `Dancing Star`, 
    answer2: `Devil's Puffball`, 
    answer3: `Grapeshot`, 
    answer4: `Samum`
  }, 
  {
    number: 7,
    text: `What Sword is given to Geralt of Rivia during Blood and Wine by the Lady of the Lake?`,
    answer1: `Zireael`, 
    answer2: `BloodSword`, 
    answer3: `Aerondight`, 
    answer4: `Azure Wrath`
  }, 
  {
    number: 8,
    text: `What is the name of the hardest difficulty mode in the Witcher 3?`,
    answer1: `Death March`, 
    answer2: `Nightmare`, 
    answer3: `Legendary`, 
    answer4: `Insane`
  }, 
  {
    number: 9,
    text: `Which Witcher school did Geralt of Rivia train at?`,
    answer1: `School of the Cat`, 
    answer2: `School of the Bear`, 
    answer3: `School of the Viper`, 
    answer4: `School of the Wolf`
  }, 
  {
    number: 10,
    text: `What is another more sinister name Gearalt of Rivia is known as?`,
    answer1: `The Butcher of Blaviken`, 
    answer2: `The Monster of Novigrad`, 
    answer3: `The Stalker of Velen`, 
    answer4: `The Beast of Toussaint`
  }
];
//The correct anwsers to the above questions
const awnsers = [ 
  `answer3`, //Swallow
  `answer4`, //Yrden
  `answer2`, //Eredin
  `answer2`, //A fish
  `answer3`, //A giant toad
  `answer4`, //Samum
  `answer3`, //Aerondight
  `answer1`, //Death March
  `answer4`, //School of the Wolf
  `answer1` //The Butcher of Blaviken
];
//Number for awnser values
let questionNum = 0;
let correctAnswers = 0;
//(parameters) for quiz
function questionPage (question,questionsAwnsered,correctAwnser){
  return `
          
  <section id="questionsPage">
    <h1 id="questions">${question.text}</h1>
      <form>
      <fieldset>
        <label>
          <input class="question" type="radio" name="option" checked></input>
          <span>${question.answer1}</span>
        </label>
  
        <label>
          <input class="question" type="radio" name="option"></input>
          <span>${question.answer2}</span>
        </label>
  
        <label>
          <input class="question" type="radio" name="option"></input>
          <span>${question.answer3}</span>
        </label>
  
        <label>
          <input class="question" type="radio" name="option"></input>
          <span>${question.answer4}</span>
        </label>
      </fieldset>  
      <button id="submitButton">Submit</button>
    </form>
    <!--
    <div id="questionDiv">
      <span id="currentQuestion">Question: ${question.number}/10</span>
      <span id="currentScore">Score: ${correctAnswer}/${questionsAnswered}</span>
    </div>
</section>
  `;
} 

//Need html #startButton
function theStartButton() {
  $('#startButton').click(function(event) {
    nextQuestion();
  });
}
//Need $('')
function theSubmitButton() {
  $('#quizForm').on('click', '#submitAnswer', function(event) {
    event.preventDefault()
    const answer = $('input:checked').siblings('span');
    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      correct();
    } else {
      incorrect();
    }
    $('quizForm').html(feedbackTemplate());
  });
}

function nextQuestion() {
  const question = questionSet[questionNum - 1];
  const questionsAnswered = questionNum - 1;
  $('#quizForm').html(questionPage(correctAnswers, question, questionsAnswered));
  }
//need $()
function theNextButton() {
  $('#quizForm').on('click', '#nextQuestion', function(event) {
    if(questionNum === 10) {
      resultsPage(correctAnswers);
    } else {
      showQuestion();
      nextQuestion();

    nextQuestion();
    }
  });
  }

function theRestartButton() {
  $('#restartButton').on('click', '#restart button', function(event) {
    questionNum = 0;
    correctAnswers = 0;
    nextQuestion();
  });
}

function submitAnswer(){
  $('#quizForm').on('submit', function(event){
    event.preventDefault();
    let currentSelectedOption = $('.option:checked').val();
    console.log("Clicked!!!", currentSelectedOption);

  });
}

function checkUserAnswer(answer) {
  if(answer.text() === awnsers[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}
//What is the correct $('')?
function rightAwnser() {
  $('#quizForm').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedbackPage" role="main">
    <h2>That's correct Witcher</h2>
    <img src="https://img.buzzfeed.com/buzzfeed-static/static/2016-02/18/19/enhanced/webdr07/enhanced-30396-1455840762-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto&output-quality=auto&output-format=auto&downsize=360:*">
    alt="Gearlt Thumbs up">
    <button id="#nextQuestion">Next</button>
  </section>
`;
//What is the correct $('')?
function wrongAwnser() {
  $('#quizForm').html(wrongAwnser(questionNum));
}

function incorrectFeedback(questionNum) {
  return `
    <section class="feedbackPage" role="main">
      <h2>Study harder Witcher! ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://i.imgur.com/mAW6Hn0.jpg" alt="Geralt Facepalm">
      <button id="#nextQuestion">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}
//7/10 or better for good results
//need $('')
function  resultsPage(correctAnswers) {
  $('#quizForm').html(`
    <section id="lastPage">
      <h2>Final Score: ${correctAnswer} out of 10</h2>
      <button id="restartButton">Try Again?</button>
    </section>
  `);
}
function handleButtons(){
$(theStartButton);
$(theSubmitButton);
$(theNextButton);
theRestartButton
}

handleButtons();
