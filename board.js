WINNING_COMBO = [["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]];

//filter and indexOf not available on old browsers
Array.prototype.diff = function(array_sub) {
    return this.filter(function(i) {return !(array_sub.indexOf(i) > -1);});
};



var game = {
  winner : 'none',
  liveBoard : true,

  winning_move : function(){
    console.log("can I win");
    for(var i=0; i < 8; i++){
      var win =$.map(WINNING_COMBO[i], function(value, key){return value;});
      var to_win = win.diff(computer_array);
      // console.log(computer_array)
      // console.log("length")
      // console.log(to_win.length)
      // console.log($.inArray(to_win[0],openBoard))
      // console.log("-------")
      if($.inArray(to_win[0],openBoard) != -1 && to_win.length == 1){
        game.move(to_win[0]);
        alert("The computer won!");
      };
    };
    return false
  },

  move : function(choice){
    $("#" + choice).append("O");
    removeSq(openBoard, choice);
    computer.push(choice);
    computer_move = true;

  },


  defend : function(){
    console.log("can the player win")
    for(var i=0; i < 8; i++){
      var defend =$.map(WINNING_COMBO[i], function(value, key){return value;});
      var to_defend = defend.diff(player_array);
      if($.inArray(to_defend[0],openBoard) != -1 && to_defend.length == 1){
        console.log("defend")
        game.move(to_defend[0])
        return true;
      };
    };
    return false;
  },

  fork : function(){
    // var possible_fork = [];
    // console.log("Is a fork possible?")
    // for(var i=0; i < 8; i++){
    //   var fork =$.map(WINNING_COMBO[i], function(value, key){return value;});
    //   var to_fork = fork.diff(computer_array);

    //   for(var j=0; j < computer_array.length; j++){
    //     if($.inArray(computer_array[j],WINNING_COMBO[i]) != -1 && $.inArray(player_array[j],WINNING_COMBO[i]) == -1 && $.inArray(player_array[j + 1],WINNING_COMBO[i]) == -1){
    //       possible_fork.push(WINNING_COMBO[i]);
    //     };
    //   };
    //   match(possible_fork);
    // };
  },

  bestMove : function(){
    console.log("Best Choice");

    var corner = ["1","3","7","9"];
    for(var i=0; i < 3; i++){
      if($.inArray(corner[i], openBoard) != -1){
        var choice = (corner[i]);
      };
    };
    // console.log(openBoard)
    // console.log()
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

  finish : function (player) {

  },

  computerMove : function (){
    // console.log("computer")
    // console.log(computer)
    computer_array = $.map(computer, function(value, key){return value;});
    // console.log(computer_array)
    console.log(computer_move)
    while(computer_move == false){
      if(game.winning_move()){break};
      if(game.defend()){break};
      if(game.fork()){break};
      if(game.bestMove()){break};
    };


  },

  sq_Click : function(player){
    $("td").click(function(event){
      $(this).append("X")
      newMove = event.target.id;
      player.push(newMove);
      removeSq(openBoard, newMove)
      // console.log(player[0]);
      player_array = $.map(player, function(value, key){return value;});
      computer_move = false;
      game.computerMove();
    });
  },



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
  game.sq_Click(player);

};



$(document).ready(function() {
  playGame();

});

function to_array(object){
  console.log("in array")
  $.map(object, function(value, key){return value;});
};

function match(object) {
  console.log("In Match")
  console.log(object)
  var array = to_array(object);
  console.log(array)
};
