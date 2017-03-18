// While it may not seem imperative for smaller programs, you should get in the habit
// linking to a separate js file and also wrapping your js code in either a 
// $(document).ready(function(){
//  // code goes here
// })
// or an IIFE (immediately invoked function expression)
// ;(function(){
//  // code goes here
// })()
// One of the most important reasons for that is security - because right now your global variables
// can be tampered with through the console by a malicious visitor to your trivia game 😮

var quizBody = $('#quiz');

$(document).on('click', '#start', function(e){
  game.start();
});

$(document).on('click', '#done', function(e){
  game.done();
});

//question set

var questions = [{
  question: "Where is Manila?",
  answers: ['Romania', 'Mexico', 'Guatemala', 'Phillipines'],
  correctAnswer: "Phillipines"
}, {
  question: "What's the capital of Venezuela?",
  answers: ['Caracas', 'Lima', 'Havana', 'Rio De Janeiro'],
  correctAnswer: "Caracas"
}, {
  question: "Where the 2002 film 'City of God' was filmed?",
  answers: ['Mexico City', 'Haiti', "Cartagena", "Miami"],
  correctAnswer: "Haiti"
},  {
  question: "Which country is best known for its delicious seafood paella?",
  answers: ['Spain', 'Ghana', 'New Zealand', "Bolivia"],
  correctAnswer: "Spain"
},  {
  question: "What's the name of architect Richard Rogers' famous project in London?",
  answers: ['London Eye', 'The Lloyds Building', 'Heron Tower'],
  correctAnswer: "Heron Tower"
},  {
  question: "What country has the deepestLake In the World?",
  answers: ['Egypt', 'USA', 'England','Russia'],
  correctAnswer: "Russia"
}];

var game = {
  correct: 0,
  incorrect: 0,
  counter: 20,
  timer: null,

  countdown: function(){
    this.counter--;
    $('#counter-number').html(this.counter);

    if (this.counter === 0){
      console.log('TIME UP');
      this.done();
    }
  },

  start: function() {
    // binding the context here allows you to use `this` throughout your other methods
    // which is useful because it decouples it from the name of the containing object.
    // You also should generally avoid setting global variables, which you were doing
    // by not declaring timer anywhere with var. Since it is a part of the game, I
    // would suggest just making it a property like I did above.
    this.timer = setInterval(this.countdown.bind(this), 1000);
    $('#container').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
    $('#start').remove();

    for (var i = 0; i < questions.length; i++) {
    quizBody.append('<h2>' + questions[i].question + '</h2>');
    for (var j = 0; j < questions[i].answers.length; j++){
    quizBody.append('<input type="radio" name ="question' + '-' + i + '"value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
      }
    }
    quizBody.append('<button id="done">Done</button>');
  },
  
  done: function(){
    // There's only every going to be one checked radio button, so there's no need to
    // put this logic in a .each iterator. However, you could instead iterate over the 
    // questions array and DRY up this code a bit. Like so:

    questions.forEach(function (question, index) {

      if ( $("input[name='question-" + index + "']:checked").val() === questions[index].correctAnswer ) {
        this.correct++;
      }
      else {
        this.incorrect++;
      }

    }, this); // you need to pass the context in order for the `correct` and `incorrect` incrementers to work

    this.results();
  },

  // always try to keep your indentation consistent
  results: function(){
    clearInterval(this.timer);

    $('#subwrapper h2').remove();
    quizBody.html('<h2>Results!</h2>');
    quizBody.append('<h3>Correct Answers: ' + this.correct + '</h3>');
    quizBody.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
    quizBody.append('<h3>Unanswered: ' + (questions.length - (this.incorrect + this.correct)) + '</h3>');

  }
};