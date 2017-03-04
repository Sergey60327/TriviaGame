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

  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);
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

    $.each($("input[name='question-0']:checked"), function(){
       if ($(this).val() == questions[0].correctAnswer) {
        console.log(this);
          game.correct++;
      } else {
          game.incorrect++;
      }

    });
    $.each($("input[name='question-1']:checked"), function(){
       if ($(this).val() == questions[1].correctAnswer) {
          game.correct++;
      } else {
          game.incorrect++;
      }

    });
    $.each($("input[name='question-2']:checked"), function(){
       if ($(this).val() == questions[2].correctAnswer) {
          game.correct++;
      } else {
          game.incorrect++;
      }
    });
     $.each($("input[name='question-3']:checked"), function(){
       if ($(this).val() == questions[3].correctAnswer) {
          game.correct++;
      } else {
        game.incorrect++;
      }
    });
    $.each($("input[name='question-4']:checked"), function(){
       if ($(this).val() == questions[4].correctAnswer) {
          game.correct++;
      } else {
        game.incorrect++;
      }
    });
   $.each($("input[name='question-5']:checked"), function(){
       if ($(this).val() == questions[5].correctAnswer) {
          game.correct++;
      } else {
        game.incorrect++;
      }

    });

    this.results();
  },


     results: function(){
      clearInterval(timer);

    $('#subwrapper h2').remove();
    quizBody.html('<h2>Results!</h2>');
    quizBody.append('<h3>Correct Answers: ' + this.correct + '</h3>');
    quizBody.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
    quizBody.append('<h3>Unanswered: ' + (questions.length - (this.incorrect + this.correct)) + '</h3>');

    }
};