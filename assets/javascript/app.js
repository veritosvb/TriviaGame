var fail = new Audio("assets/images/fail.mp3");
var trivia = [
  {
    question: "assets/images/1.png",
    answers: ["Kiribati", "Danneborg ", "Manitoba", "Yemen"],
    correctAnswer:"0",
  },  
  {
    question: "assets/images/2.png",
    answers: ["Somalia", "Ethiopia", "Kenya", "Mozambique"],
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
    question: "assets/images/5.jpg",
    answers: ["Guinea", "Nigeria", " Ghana", "Chad"],
    correctAnswer:"1",
},
{
    question: "assets/images/6.jpg",
    answers: ["Libya", "Jordan", "Lebanon", "Cyprus"],
    correctAnswer:"3",
},
{
    question: "assets/images/7.jpg",
    answers: ["Birmania", "Turkmenistan", "Tajikistan", "Nepal"],
    correctAnswer:"0",
},
{
  question: "assets/images/8.png",
  answers: ["Guyana", " Suriname", "Paramaribo", "Bioku"],
  correctAnswer:"0",
}
];
  
  var intervalId;
  var intervalId2;
  var clockRunning = false;
  
  var stopwatch = {
    time: 6,
    start: function() {
        intervalId = setInterval(stopwatch.count, 1000);
    },
    stop: function() {
      stopwatch.time = 6;
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
    time: 2,
    start: function() {
      $(document).off("click", ".respuesta");

        intervalId2 = setInterval(showanswer.count, 1000);
    },
    stop: function() {
      showanswer.time = 2;
      clearInterval(intervalId2);
    },
    count: function() {
      showanswer.time--;
      if(showanswer.time <=  0){
        console.log("here");
        showanswer.stop();
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
        var p = $('<img id ="pregunta">');
        p.attr("src",a.question);
        $("#board").html(p);
        console.log("question to print " + questions.questionNumber);
        for (var i = 0; i < 4 ; i++){
          var respuesta =$("<a class='btn-ans btn-light btn-xl'>");
          respuesta.attr("id",i );
          respuesta.addClass("respuesta")
          respuesta.text(a.answers[i]);
          $("#myList").append(respuesta);
          }
          console.log("printed questions");
      }
      else{
        $("#score").text("Score: " + questions.score);
        $(document).off("click", ".respuesta");
        $("#display").text("Flag quiz");
        $("#board").empty();
        $("#myList").empty();
        $("#score").addClass("final");
        clockRunning = false;
      }  
    }
  };

  function selectedAnswer() {
    stopwatch.stop();
      var h = trivia[questions.questionNumber].correctAnswer;
      var answerSelected = $(this).attr("id");
      //if the selected answer is correct
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
      fail.play();
      $("#score").text("Score: " + questions.score);
      // Change the background of the  wrong answer and select the correct one.
      $("#" + answerSelected).attr("id", "incorrect");
      $("#" + h).addClass("active show");
      $("#" + h).attr("id", "correct");
      showanswer.start();
    }
  }

  $(document).ready(function(){
    $('#start').click(function(){
          // increase the question number counter
      if(!clockRunning){
        clockRunning=true;
        questions.questionNumber = 0;
        questions.score = 0;
        questions.display();
        $('#preguntas').show();
        $('#score').show();
      }

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
