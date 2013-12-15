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
    for(var i=0; i < 9; i++){
      win =$.map(WINNING_COMBO[i], function(value, key){return value;});
      console.log("difference")
      to_win = win.diff(computer_array)
      console.log("openBoard")
      console.log($.inArray(to_win,openBoard))

      if($.inArray(to_win,openBoard) == -1 && to_win == 1){
        game.move(to_win[0])
        alert("The computer won!")

      }
    };
  },

  move : function(choice){
    $("#" + choice).append("O");
  },


  defend : function(player){
    console.log("can the player win")
  },

  finish : function (player) {

  },

  computerMove : function (player){
    computer.push("3");
    computer.push("2");
    $("#3").append("O");
    computer_array = $.map(computer, function(value, key){return value;});
    game.winning_move(player);
    game.defend(player);

    removeSq(openBoard, "3");
    console.log(computer[0]);
    console.log(openBoard[1]);
  },

  sq_Click : function(player){
    $("td").click(function(event){
      $(this).append("X")
      newMove = event.target.id;
      player.push(newMove);
      removeSq(openBoard, newMove)
      console.log(player[0]);
      console.log(openBoard[0]);
      game.computerMove(player);
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
