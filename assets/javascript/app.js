
var trivia = [
  {
    question: "assets/images/1.png",
    answers: ["Kiribati", "Danneborg ", "Manitoba", "Yemen"],
    correctAnswer:"0",
  },  
  {
    question: "assets/images/2.png",
    answers: ["answer 1", "Ethiopia", "answer 3", "answer 4"],
    correctAnswer:"1",
  },
  {
    question: "assets/images/3.png",
    answers: ["Aruba", "Barbados", "Bahamas", "Cuba"],
    correctAnswer:"2",
  },
  {
    question: "assets/images/4.png",
    answers: ["Jamaica", "Haiti", "Grenada", "St. Lucia"],
    correctAnswer:"0",
},
{
    question: "pregunta 5",
    answers: ["answer 1", "Nigeria", "answer 3", "answer 4"],
    correctAnswer:"11",
},
{
    question: "pregunta 6",
    answers: ["answer 1", "", "answer 3", "Cyprus"],
    correctAnswer:"3",
},
{
    question: "pregunta 7",
    answers: [" Ultimo answer 1", " ultimoanswer 2", "ultimoanswer 3", "answer 4"],
    correctAnswer:"0",
}
];
  
  var intervalId;
  var intervalId2;
  var clockRunning = false;
  
  var stopwatch = {
    time: 11,
    start: function() {
        intervalId = setInterval(stopwatch.count, 1000);
    },
    stop: function() {
      stopwatch.time = 11;
      clearInterval(intervalId);
    },
    count: function() {
      stopwatch.time--;
      if(stopwatch.time > 0){
        var converted = stopwatch.timeConverter(stopwatch.time);
        $("#display").text("Time left: " + converted);
      } else{
        selectedAnswer();
      }
    },
    timeConverter: function(t) {
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
  
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return minutes + ":" + seconds;
    }
  };

  var showanswer = {
    time: 3,
    start: function() {
      $(document).off("click", ".respuesta");

        intervalId2 = setInterval(showanswer.count, 1000);
    },
    stop: function() {
      showanswer.time = 3;
      clearInterval(intervalId2);
    },
    count: function() {
      showanswer.time--;
      if(showanswer.time <=  0){
        console.log("here");
        showanswer.stop();
+       // increase the score
        // display the next question
        questions.display();
        $(document).on("click", ".respuesta",selectedAnswer);

      }
    }
  };

  var questions = {
    score: 0,
    questionNumber: 0,
    display: function() {
      stopwatch.stop();
      if(questions.questionNumber < trivia.length){
        stopwatch.start();
        $("#myList").empty();
        var a = trivia[questions.questionNumber];
        $("#pregunta").attr("src",a.question);
        console.log("question to print " + questions.questionNumber);

        for (var i = 0; i < 4 ; i++){
          var respuesta =$("<a class='btn-ans btn-light btn-xl'>");
          respuesta.attr("id",i );
          respuesta.addClass("respuesta")
          respuesta.text(a.answers[i]);
          $("#myList").append(respuesta);
          }
      }
      else{
        $("#score").text("Score: " + questions.score);
        $(document).off("click", ".respuesta");
        $("#display").text("Flag quiz");
        $("")
      }  
    }
  };

  function selectedAnswer() {
    console.log("question number " + questions.questionNumber);
    stopwatch.stop();

    //It will run for the amount of questions in the array
    if(questions.questionNumber < trivia.length){
      var h = trivia[questions.questionNumber].correctAnswer;
      var answerSelected = $(this).attr("id");
      //if the selected answer is correct
      console.log("answer " + h);
      console.log("selected answer " +answerSelected);
      questions.questionNumber++;

      if(answerSelected == h){
          $("#display").text("Correct!! ");
          $("#" + answerSelected).attr("id", "correct");
          showanswer.start();
          questions.score++;
          $("#score").text("Score: " + questions.score);

      }   
      // the answer is incorrect 
      else {
        $("#display").text("Wrong answer!!");
        questions.score--;
        $("#score").text("Score: " + questions.score);
        // Change the background of the  wrong answer and select the correct one.
        $("#" + answerSelected).attr("id", "incorrect");
        $("#" + h).addClass("active show");
        $("#" + h).attr("id", "correct");
        $("#" + h).prepend('<i class="fas fa-check-circle"></i>');
        showanswer.start();
      }
    }
    else{
      $("#score").text("Score: " + questions.score);
      $(document).off("click", ".respuesta");
    }
  }

   $(document).ready(function(){
    
    $('#start').click(function(){
          // increase the question number counter
      questions.display();
      $('#preguntas').show();
      $('#score').show();
    });

    $(document).on("click", ".respuesta", selectedAnswer);
   
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1500, "easeInOutExpo");
        return false;
      }
    }
  });
 
  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });
