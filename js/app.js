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
    "X", "O","O",
    "X", "X", "X", 
    "X", "X", "X" 

];
let turn = "X";
let winner = false;
let tie = false;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');;
const messageEl = document.getElementById("message");
const boardEl = document.querySelector('.board');




/*-------------------------------- Functions --------------------------------*/
function render(){
    updateBoard()
    updateMessage()
    placePiece()
};
function init(){
    console.log("init");
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

function handleClick(e) {
    const clickedEl = e.target;
    console.log(clickedEl)
    const squareIndex = parseInt(clickedEl.id);
    if(board[squareIndex]=== "X" || board[squareIndex === "O" || winner]){
        return}
    placePiece(squareIndex);
    checkForWinner();

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
        }
    });
    
}


console.log(updateBoard())
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener("click", handleClick);
});

init()