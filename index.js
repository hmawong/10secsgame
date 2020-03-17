var generateRandomInteger = function (max) {
  return Math.floor(Math.random() * (max) + 1);
}

var generateEquation = function (max, operator) {
  var firstQ = generateRandomInteger (max);
  var secondQ = generateRandomInteger (max);
  // make it easier
  var answer = ''
  if (firstQ < secondQ) {
    $('#equation').text(secondQ + ' ' + operator + ' ' + firstQ);
    answer = secondQ + operator + firstQ;
  } else {
    $('#equation').text(firstQ + ' ' + operator + ' ' + secondQ);
    answer = firstQ + operator + secondQ;
  }
  return eval(answer)
}

var minusArray = function(operator, operatorArray) {
  var newOperatorArray;
  var checkIndex = operatorArray.indexOf(operator);
  switch (checkIndex) {
    case 0:
      newOperatorArray = operatorArray.slice(1, operatorArray.length);
      operatorArray = newOperatorArray;
      break;
    case 1:
      if (operatorArray.length == 4) {
        newOperatorArray = operatorArray.slice(0, 1).concat(operatorArray[2], operatorArray[operatorArray.length-1]);
        operatorArray = newOperatorArray;
      } else if (operatorArray.length == 3) {
        newOperatorArray = operatorArray.slice(0,1).concat(operatorArray[2]);;
        operatorArray = newOperatorArray;
      } else {
        newOperatorArray = operatorArray.slice(0,1);
        operatorArray = newOperatorArray;
      }
      break;
    case 2:
      if (operatorArray.length == 4) {
        newOperatorArray = operatorArray.slice(0, 2).concat(operatorArray[3]);
        operatorArray = newOperatorArray;
      } else {
        newOperatorArray = operatorArray.slice(0, 2);
        operatorArray = newOperatorArray;
      }
      break;
    case 3:
      newOperatorArray = operatorArray.slice(0, 3);
      operatorArray = newOperatorArray;
      break;
  }
  return operatorArray
}

var generateOperator = function (arr) {
  var operator = Math.floor(Math.random() * (arr.length))
  return arr[operator];
}

//game start function
var start = function (ans, max, operator, operatorArray) {
  $('#start').on('click', function () {
    $('#start').off('click');
    var initialTime = 10;
    $('#timer').text(initialTime);
    $('#correct').text('');
    var answer = ans;
    var timeout;
    var score = 0;
    var maxNumber = max;
    //initial Score
    var highScore = Number($('#highScore').text());
    $('#score').text(score);
    //Change max number function
    $('#submit').on('click', function () {
      maxNumber = (Number($('#maxNumber').val()));
    });
    // Countdown function
    var countDown = setInterval(function(){
      initialTime--;
      if (initialTime === 0) {
        clearInterval(countDown);
        $('#answer').off('keyup');
        $('#start.game').text('Restart');
        $('#correct').text('Time\'s up!');
        operator = generateOperator(operatorArray);
        var ans = generateEquation (maxNumber, operator);
        start(ans, maxNumber, operator, operatorArray);
      }
      $('#timer').text(initialTime);
    }, 1000);
    //answer checking function
    $('#answer').on('keyup', 'input', function () {
      var playerAns = $('input').val();
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        if (answer == playerAns) {
          operator = generateOperator(operatorArray);
          answer = generateEquation (maxNumber, operator);
          $('#answerBox').val('');
          score++;
          if (score > highScore) {
            $('#highScore').text(score);
          }
          $('#score').text(score);
          $('#correct').text('Correct!');
          if (initialTime != 0) {
            initialTime++;
            $('#timer').text(initialTime);
          }
        } else {
          $('#answerBox').val('');
          $('#correct').text('Incorrect :( Try again!');
        }
      }, 500);
    })
  })
    // change operator
    $('#add').on('click', function() {
      if ($('#add').is(":checked")) {
        $('#chooseOneOperator').text('');
        if (!operatorArray.includes('+')){
          operatorArray.push('+');
        }
      } else {
        if (operatorArray.length !== 1) {
          var newOperatorArray = minusArray('+', operatorArray);
          operatorArray = newOperatorArray;
        } else {
          $('#chooseOneOperator').text('You must choose at least 1!')
          $('#add').prop("checked", true);
        }
      }
    })

    $('#minus').on('click', function() {
      if ($('#minus').is(":checked")) {
        $('#chooseOneOperator').text('');
        if (!operatorArray.includes('-')){
          operatorArray.push('-');
        }
      } else {
        if (operatorArray.length !== 1) {
          var newOperatorArray = minusArray('-', operatorArray);
          operatorArray = newOperatorArray;
        } else {
          $('#chooseOneOperator').text('You must choose at least 1!')
          $('#minus').prop("checked", true);
        }
      }
    })

    $('#multiply').on('click', function() {
      if ($('#multiply').is(":checked")) {
        $('#chooseOneOperator').text('');
        if (!operatorArray.includes('*')){
          operatorArray.push('*');
        }
      } else {
        if (operatorArray.length !== 1) {
          var newOperatorArray = minusArray('*', operatorArray);
          operatorArray = newOperatorArray;
        } else {
          $('#chooseOneOperator').text('You must choose at least 1!')
          $('#multiply').prop("checked", true);
        }
      }
    })
    $('#divide').on('click', function() {
      if ($('#divide').is(":checked")) {
        $('#chooseOneOperator').text('');
        if (!operatorArray.includes('/')){
          operatorArray.push('/');
        }
      } else {
        if (operatorArray.length !== 1) {
          var newOperatorArray = minusArray('/', operatorArray);
          operatorArray = newOperatorArray;
        } else {
          $('#chooseOneOperator').text('You must choose at least 1!')
          $('#divide').prop("checked", true);
        }
      }
    })
};

$(document).ready(function(){
  var operatorArray = ['+'];
  var operator = '+';
  var max = 10;
  var ans = generateEquation (max, operator);
  start(ans, max, operator, operatorArray);
});
