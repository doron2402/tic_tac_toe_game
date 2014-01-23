//declare global vars
function ttt_app(){
    this.painted = new Array();
    this.content = new Array();
    this.winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]];
    this.turn = 0;
    this.theCanvas;
    this.c;
    this.cxt;
    this.squaresFilled = 0;
    this.w;
    this.y;

    this.setValuesOnInit();
};

/*
    Init function
*/
ttt_app.prototype.setValuesOnInit = function() {
    for(var i=0; i<=8; i++){
        this.painted[i] = false;
        this.content[i] = '';
    } 
};


ttt_app.prototype.clickLister = function(Num) {
    console.log(Num);
    
    this.theCanvas = "canvas"+Num;
    this.c = document.getElementById(this.theCanvas);
    this.cxt = this.c.getContext("2d");

    //draw X if box is empty
    if(this.painted[Num] == false){
        if(this.turn%2==0){
            this.cxt.beginPath();
            this.cxt.moveTo(15,15);
            this.cxt.lineTo(30,30);
            this.cxt.moveTo(30,15)
            this.cxt.lineTo(15,30);
            this.cxt.stroke()
            this.cxt.closePath();
            this.content[Num] = 'X';
        }
        else{
          this.cxt.beginPath();
          this.cxt.arc(25,25,8,0,Math.PI*2,true);
          this.cxt.stroke();
          this.cxt.closePath();
          this.content[Num] = 'O';
        }

        this.turn++;
        this.painted[Num] = true;

        this.squaresFilled++;
        this.checkForWinners(this.content[Num]);

        if(this.squaresFilled == 9){
            alert("Game Over");
            location.reload(true);
        }
    }
    else{
        alert("That spot's taken!");
    }

};


/*
    Drawing the Board
*/
ttt_app.prototype.drawBoard = function(divIdName) {
    divIdName === undefined ? divIdName = 'MainBoard' : divIdName = divIdName;
    var self = this;
    var Div = document.getElementById(divIdName);
    for(var i=0; i<9; i++){
        var x = document.createElement("canvas");
        x.height = 50;
        x.width = 50;
        x.style.border = "1px solid black";
        x.id = "canvas" + i;

        var ourCanvasClickMaker = function(index){
            return function(){
                console.log ("calling canvasClicked with" + index);
                self.clickLister(index);
            };
        };

        x.onclick = ourCanvasClickMaker(i);

        Div.appendChild(x);
        
        if (i == 2 || i == 5){
          var br = document.createElement("br");
          Div.appendChild(br);
        }
    }

};

/*
    Check For Winner
*/
ttt_app.prototype.checkForWinners = function(symbol) {
     for(var i = 0; i < this.winningCombinations.length; i++){
        if(this.content[this.winningCombinations[i][0]] == symbol && 
            this.content[this.winningCombinations[i][1]] == symbol && 
            this.content[this.winningCombinations[i][2]] == symbol){
            alert(symbol+ "won!");
            location.reload(true);
        }
    }
};
