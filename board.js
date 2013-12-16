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
      if($.inArray(to_win[0],openBoard) != -1 && to_win.length == 1){
        game.move(to_win[0]);
        alert("The computer won!");
      };
    };
  },

  move : function(choice){
    $("#" + choice).append("O");
    removeSq(openBoard, choice);
  },


  defend : function(){
    console.log("can the player win")
    for(var i=0; i < 8; i++){
      var defend =$.map(WINNING_COMBO[i], function(value, key){return value;});
      var to_defend = defend.diff(player_array);
      if($.inArray(to_defend[0],openBoard) != -1 && to_defend.length == 1){
        game.move(to_defend[0])
        break
      };
    };
  },

  finish : function (player) {

  },

  computerMove : function (){
    // computer.push("3");
    // computer.push("2");
    // $("#3").append("O");
    computer_array = $.map(computer, function(value, key){return value;});
    game.winning_move();
    game.defend();
    console.log(computer[0]);

  },

  sq_Click : function(player){
    $("td").click(function(event){
      $(this).append("X")
      newMove = event.target.id;
      player.push(newMove);
      removeSq(openBoard, newMove)
      console.log(player[0]);
      player_array = $.map(player, function(value, key){return value;});
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
