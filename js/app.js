/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]


/*---------------------------- Variables (state) ----------------------------*/
let board = [
    "", "","",
    "", "", "", 
    "", "", "" 

];
let turn = "X";
let winner = false;
let tie = false;
let scoreX = 0;
let scoreO = 0;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');;
const messageEl = document.getElementById("message");
const boardEl = document.querySelector('.board');
const resetBtnEl = document.getElementById("reset");
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');



/*-------------------------------- Functions --------------------------------*/
function render(){
    updateBoard()
    updateMessage()
};
function init(){
    
    board = [
    "", "","",
    "", "", "", 
    "", "", "" ]
    winner = false;
    tie = false;

    squareEls.forEach((squ) => {
        squ.classList.remove("winner");
        squ.classList.remove("draw");
    })
    render();
};

function updateBoard(){
    board.forEach((tile, index) => {
       squareEls[index].textContent = tile;

    })
};

function updateMessage(){
    if ((winner === false) && (tie === false)){
        messageEl.textContent = `${turn}'s turn`
        console.log (`${turn}'s turn'`)
    }
    else if((winner === false) && (tie === true)){
        messageEl.textContent = "Draw!";
    }
    else{
        messageEl.textContent = `Congratulations, ${turn} won!!!!`
    }
};

function updateScore(){
    if(!winner) return;
    else if (turn === "X"){
        scoreX++
        scoreXEl.textContent = scoreX
    }
    else{scoreO++}
    scoreOEl.textContent = scoreO
}

function handleClick(e) {
    const clickedEl = e.target;
    console.log(clickedEl)
    const squareIndex = parseInt(clickedEl.id);
    if(board[squareIndex]=== "X" || board[squareIndex] === "O" || winner){
        return}
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    updateScore()
    switchPlayerTurn();
    render();

}

function placePiece(index){
board[index] = turn;
console.log(board)
}

function checkForWinner(){
    winningCombos.forEach((combo) => {
        const valA = board[combo[0]];
        const valB = board[combo[1]];
        const valC = board[combo[2]];

        if (valA !== "" && valA === valB && valA === valC) {
            winner = true;
            let winningSquares = combo;

            combo.forEach(index => {
                squareEls[index].classList.add("winner")
            })
        }

    });
    
}

function checkForTie(){
    if(winner){
        return;
    }
    else if(board.includes("")){
        tie = false;
        }
    else{
        tie = true;
         squareEls.forEach(square => {
      square.classList.add("draw");
      });
    }
   
}

function switchPlayerTurn(){
    if(winner === true){return}
    else {
       turn = turn === "X" ? "O" : "X";
    }
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);

init()