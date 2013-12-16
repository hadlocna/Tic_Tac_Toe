WINNING_COMBO = [["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]];

//filter and indexOf not available on old browsers
Array.prototype.diff = function(array_sub) {
    return this.filter(function(i) {return !(array_sub.indexOf(i) > -1);});
};



var game = {
  winner : 'none',
  liveBoard : true,

  finished : function(){
    if(openBoard.length < 1){
      alert("Tie Game!");
      game.liveBoard = false;
    };
  },

  winning_move : function(){
    console.log("can I win");
    for(var i=0; i < 8; i++){
      var win =$.map(WINNING_COMBO[i], function(value, key){return value;});
      var to_win = win.diff(computer_array);
      if($.inArray(to_win[0],openBoard) != -1 && to_win.length == 1){
        game.move(to_win[0]);
        alert("The computer won!");
        game.liveBoard = false;

        return true
      };
    };
    return false
  },

  move : function(choice){
    $("#" + choice).append("O");
    removeSq(openBoard, choice);
    computer.push(choice);
    computer_move = true;
    game.finished();

  },


  defend : function(){
    console.log("can the player win")
    for(var i=0; i < 8; i++){
      var defend =$.map(WINNING_COMBO[i], function(value, key){return value;});
      var to_defend = defend.diff(player_array);
      if($.inArray(to_defend[0],openBoard) != -1 && to_defend.length == 1 ){
        console.log("defend")
        game.move(to_defend[0])
        return true;
      };
    };
    return false;
  },

  fork : function(){
    var possible_fork = [];
    console.log("Is a fork possible?")
    for(var i=0; i < 8; i++){
      var fork =$.map(WINNING_COMBO[i], function(value, key){return value;});


      for(var j=0; j <= computer_array.length; j++){
        if($.inArray(computer_array[j],WINNING_COMBO[i]) != -1 && $.inArray(player_array[j],WINNING_COMBO[i]) == -1 && $.inArray(player_array[j + 1],WINNING_COMBO[i]) == -1){
          possible_fork.push(WINNING_COMBO[i]);
          console.log("possible fork")
        };
      };
    };

    if(possible_fork[0] != null){
      var array = match(possible_fork);
      if(array != null){
        var to_fork = array.diff(player_array)

        if(to_fork[0] != null){
          console.log("fork Options")
          console.log(to_fork);
          game.move(to_fork[0]);
          return true
        };
      };
    };
  },

  bestMove : function(){
    console.log("Best Choice");

    var side = ["2","4","6","8"];
    for(var i=0; i < 3; i++){
      if($.inArray(side[i], openBoard) != -1){
        var choice = (side[i]);
      };
    };
    if($.inArray("5", openBoard) != -1){
      console.log("middle")
      game.move("5");
      return true;
    }
    else if(choice){
      console.log("corner")
      game.move(choice);
      return true;
    }
    else if(true){
      console.log("open")
      game.move(openBoard[0]);
      return true;

    };
  },

  computerMove : function (){
    computer_array = $.map(computer, function(value, key){return value;});
      while(computer_move == false){
      if(game.winning_move()){break};
      if(game.defend()){break};
      if(game.fork()){break};
      if(game.bestMove()){break};
    };
  },

  sq_Click : function(){
    $("td").click(function(event){
      if(game.liveBoard==true){
        console.log("what is in this spot?")
        if($(this).text() == ""){
          $(this).append("X")
          newMove = event.target.id;
          player.push(newMove);
          removeSq(openBoard, newMove)
          game.finished();
          player_array = $.map(player, function(value, key){return value;});
          win_check(player_array);
          if(game.liveBoard == true){
            computer_move = false;
            game.computerMove();
          };
        };
      };
    });
  },



};

function win_check(moves){
  for(var i=0; i < 8; i++){
    var win =$.map(WINNING_COMBO[i], function(value, key){return value;});
    var to_win = win.diff(moves);
    if(to_win.length == 0){
      alert("The player won!");
      game.liveBoard = false;
    };
  };
};

function removeSq(openBoard, newMove){
  for(var i in openBoard){
    if(openBoard[i]==newMove){
      openBoard.splice(i,1);
      break;
    };
  };
};


var playGame = function(){
  player = [];
  computer = [];
  openBoard = ["1","2","3","4","5","6","7","8","9"];
  if((Math.floor(Math.random() * 2) + 1) == 2){
    player_array = $.map(player, function(value, key){return value;});
    computer_move = false;
    game.computerMove();
  };
  game.sq_Click();

};



$(document).ready(function() {
  playGame();

});

function to_array(object){
  return $.map(object, function(value, key){return value;});
};

function match(object) {
  console.log("In Match")
  console.log(to_array(object).diff(computer_array))
  var array = to_array(object).diff(computer_array)
  var sorted_array = array.sort();
  var results = [];
  for (var i = 0; i < array.length - 1; i++) {
    if (sorted_array[i + 1] == sorted_array[i]) {
      results.push(sorted_array[i]);
    };
  };
  console.log("results")
  console.log(results)
  if(results.length > 0){
    return results
  };

};
