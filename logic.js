function Game() {

  this.textArr = ["blue", "red", "yellow", "orange", "green", "pink", "purple", "brown"];
  this.pigmentArr = ["#2f8bbe", "#E80000", "#FEF200", "#FF6700", "#0EAD69", "#EE4266", "#540D6E", "#A87332", ]
  //----------------------blue-------red-------yellow-----orange-----green-------pink-----------purple-------brown
  this.checkColorFinalArr = new Array(); //array to check the answer
  this.textDisplay = new Array(); //arr to display text colors (p)
  this.pigmentDisplay = new Array(); //arr to display pigment colors (background)
  this.colorIndexDisplay = 0; //index of colors
  this.myTimer;
  this.seconds = 0;
  this.isOver = false;

  //-----------DOM Mainpulation---------

}

// generate new arrays for not having problems when reseting the game

Game.prototype.generateNewArrs = function() {
  this.transitTextArr = this.textArr.map(function(a) {
    return a
  });
  this.transitPigmentArr = this.pigmentArr.map(function(a) {
    return a
  });
  this.checkColorTempArr = this.textArr.map(function(a) {
    return a
  })
}

// randomizing the colors and creating the final check array

Game.prototype.randomColors = function() {

  this.generateNewArrs();

  for(i = 0; i < 8; i++) {

      var num1 = Math.floor(Math.random() * this.transitTextArr.length);

      this.textDisplay.push(this.transitTextArr[num1]);
      this.transitTextArr.splice(num1, 1);

      var num2 = Math.floor(Math.random() * this.transitPigmentArr.length);

      this.pigmentDisplay.push(this.transitPigmentArr[num2]);
      this.transitPigmentArr.splice(num2, 1);
      this.checkColorFinalArr.push(this.checkColorTempArr[num2]);
      this.checkColorTempArr.splice(num2, 1);
  }
}

//Display color question in the DOM

Game.prototype.showColors = function() {

  this.onlyPigment = this.pigmentDisplay[this.colorIndexDisplay];
  this.onlyText = this.textDisplay[this.colorIndexDisplay];

  $("#display").css("background", this.onlyPigment)
  $("#display p").text(this.onlyText);
}

//timer

Game.prototype.startTimer = function() {
  // let that = this;
  this.myTimer = setInterval(() => {
    this.seconds ++;
    // console.log(this.seconds);
  }, 1000)
}

//Check the answer

Game.prototype.checkAnswer = function() {
  $("#colorInput").on("keyup", () => {
    if($("#colorInput").val() === this.checkColorFinalArr[this.colorIndexDisplay]) {
      this.colorIndexDisplay ++;
      // console.log("correct")
      // console.log(this.colorIndexDisplay)
      $("#colorInput").val("")
      if(this.colorIndexDisplay < this.textArr.length) {
        this.showColors();
      } else {
        this.finishGame();
      }
    }
  })
}

//emoticon reaction

Game.prototype.emotiReaction = function() {
  if(this.seconds < 11) {
    $("#reaction").html("<i class='em em-mortar_board'></i>")
  } else if (this.seconds < 12) {
    $("#reaction").html("<i class='em em-muscle'></i>")
  } else if (this.seconds >= 12) {
    $("#reaction").html("<i class='em em-wink'></i>")
  } else if (this.secongs > 15){
    $("#reaction").html("<i class='em em-confused'></i>")
  }
}

//hide game and show message

Game.prototype.finishGame = function() {
  if (this.colorIndexDisplay === this.textArr.length) {
    clearInterval(this.myTimer);

    $("#display").hide()
    $("#colorInput").hide();
    $("#actionHeader").hide();
    $("#finishText").show();
    $("#time span").text(this.seconds);
    $("#time").show();
    this.emotiReaction();

    this.isOver = true;
  }
}

// reset variables

Game.prototype.resetLogic = function() {
  this.checkColorFinalArr = []; //array to check the answer
  this.textDisplay = []; //arr to display text colors (p)
  this.pigmentDisplay = []; //arr to display pigment colors (background)
  this.colorIndexDisplay = 0; //index of colors
  clearInterval(this.myTimer);
  this.seconds = 0;
  // console.log(this.seconds);
  this.isOver = false;

}

//reset DOM

Game.prototype.resetDOM = function() {
  $("#finishText").hide();
  $("#displayBox").hide();
  $("#display").show();
  $("#colorInput").show();
  $("#colorListBox").show();
  $("#actionHeader").show();
  $("#time").hide();
  $("#actionBtn").text("Start");
}

//Controling the input focus

Game.prototype.inputFocus = function() {
  $("input[type='text']").focus(function() {
    $(this).attr("placeholder", "");
  }).blur(function() {
    $(this).attr("placeholder", "Type Color")
  })
}

// where the magic happens

$(document).ready(function() {

  let myGame = new Game();

  Game.prototype.startGame = function() {
    myGame.inputFocus();
    $("#displayBox").hide();
    $("#finishText").hide();
    $("#time").hide();

    $("#actionBtn").on("click", function() {
      if($("#actionBtn").text() === "Start") {
        myGame.randomColors();
        myGame.showColors();
        myGame.startTimer();
        $("#colorListBox").hide();
        $("#displayBox").show();
        $("#colorInput").focus();
        $("#actionBtn").text("Reset");
        myGame.checkAnswer();
        myGame.finishGame();
      } else {
        myGame.resetDOM();
        myGame.resetLogic();
      }

    })
  };

    myGame.startGame();
});
