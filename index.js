var start = function (ans) { $('#start').on('click', function () {
  $('#start').off('click');
  var initialTime = 10;
  $('#timer').text(initialTime);
  //var answer = generateEquation ();
  var answer = ans;
  var timeout;
  var score = 0;
  var highScore = Number($('#highScore').text());
  console.log('highscore is ' + highScore);
  $('#score').text(score);
  var countDown = setInterval(function(){
    initialTime--;
    if (initialTime === 0) {
      clearInterval(countDown);
      $('#answer').off('keyup');
      $('#start.game').text('Restart');
      //alert('Gameover! Your score is ' + score + '! Please try again!');
      var ans = generateEquation ();
      start(ans);
    }
    $('#timer').text(initialTime);
    console.log(initialTime);
  }, 1000);

  $('#answer').on('keyup', 'input', function () {
    var playerAns = $('input').val();
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (answer == playerAns) {
        console.log('correct');
        answer = generateEquation ();
        score++;
        if (score > highScore) {
          $('#highScore').text(score);
        }
        $('#score').text(score);
        $('#correct').text('Correct!');
        initialTime++;
        $('#timer').text(initialTime);
      } else {
        console.log('incorrect');
        $('#correct').text('Incorrect :( Try again!');
      }
    }, 500);
  })

})
};


$(document).ready(function(){
  console.log('ready');
  var ans = generateEquation ();
  start(ans);
});


var generateRandomInteger = function (max) {
  return Math.floor(Math.random() * (max));
}

var generateEquation = function () {
  var firstQ = generateRandomInteger (10);
  var secondQ = generateRandomInteger (10);
  $('#firstQ').text(firstQ);
  $('#secondQ').text(secondQ);
  return firstQ + secondQ
}
