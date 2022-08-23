// Your code here
function makeBoard(){
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            let newPElement = document.createElement("p");
            newPElement.setAttribute("id", "cell");
            newPElement.setAttribute("data-row", i);
            newPElement.setAttribute("data-col", j);
            newPElement.setAttribute("data-click", "false");
            document.body.children[1].appendChild(newPElement);
        }
    }
}

function checkWin(value, array, row, col){

    // horizontal
    if (array[row][0] === array[row][1] && array[row][0] === array[row][2] && array[row][0] === value){
        return true;
    }

    // vertical
    if (array[0][col] === array[1][col] && array[1][col] === array[2][col] && array[0][col] === value){
        return true;
    }

    // diagnal
    if ((array[0][0] === array[1][1] && array[0][0] === array[2][2] && array[0][0] === value) ||
        (array[0][2] === array[1][1] && array[0][2] === array[2][0] && array[0][2] === value)){
            return true;
    }

    return false;
}

function checkTied(){
    let tied = true;

    // if there is no empty slot left, then it is determined a tie
    for (let i = 0; i < 9; i++){
        if(document.body.children[1].children[i].childElementCount === 0){
            tied = false;
        }
    }
    if (tied){
        let newDivElement = document.createElement("div");
        newDivElement.innerText = "Tied";
        document.body.children[0].appendChild(newDivElement);
        return true;
    }

    return false;
}

function createHeading(message){
    let newDivElement = document.createElement("div");
    newDivElement.innerText = message;
    document.body.children[0].appendChild(newDivElement);
    gameOver = true;
    givenUp = true;
}

window.addEventListener("DOMContentLoaded", function () {

    // Initilize
    makeBoard ();
    // start, a number, is created to alternate between Xs and Os
    let start = 0;
    // check if game is over
    let gameOver = false;
    // input, a 2D arrray, is created to store Xs and Os to be used for checking wins
    let input = [["", "", ""],["", "", ""],["", "", ""]];
    // givenUp is to see if the player has given up
    let givenUp = false

    const container = document.getElementById("container");
    const reset = document.getElementById("newGame");
    const giveUp = document.getElementById("giveUp");

    // new game
    reset.addEventListener("click", event => {
        // reset everything to the beginning state
        if (gameOver){
            start = 0;
            gameOver = false;
            input = [["", "", ""],["", "", ""],["", "", ""]];
            givenUp = false;

            // if a winner has been declared, remove the header
            if (document.body.children[0].children[0]){
                document.body.children[0].children[0].remove();
            }

            // inside each cell, set the text to empty and remove 'clicked' attribute
            for (let i = 0; i < 9; i++){
                if(document.body.children[1].children[i].childElementCount === 1){
                    document.body.children[1].children[i].children[0].remove();
                }
                document.body.children[1].children[i].setAttribute("data-click", "false");
            }
        }
        else{
            event.preventDefault();
        }
    });

    giveUp.addEventListener("click", event => {
        // when it is X's turn and 'give up' is clicked, then declare O the winner
        if (start % 2 === 0 && !givenUp){
            createHeading("O Won!");
        }
        // when it is X's turn and 'give up' is clicked, then declare X the winner
        else if (start % 2 === 1 && !givenUp){
            createHeading("X Won!");
        }
    });

    // game logic
    container.addEventListener("click", event => {
        if(!gameOver){
            let square = event.target;

            // When it is X's turn
            if (start % 2 === 0 && square.dataset.click === "false"){

                // add an image of 'X' to the cell and set the cell as 'clicked'
                square.setAttribute("data-click", true);
                input[square.dataset.row][square.dataset.col] = "X";
                let img = document.createElement("img");
                img.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
                square.appendChild(img);

                // if 3 Xs in a row found, print "O Won!" and end game
                if (checkWin("X", input, square.dataset.row, square.dataset.col)){
                    createHeading("X Won!");
                }
                // if not, then check if it is a tie game
                else{
                    givenUp = checkTied();
                    gameOver = givenUp;
                }
                start++;
            }

            // When it is O's turn
            else if (start % 2 === 1 && square.dataset.click === "false"){

                // add an image of 'O' to the cell and set the cell as 'clicked'
                square.setAttribute("data-click", true);
                input[square.dataset.row][square.dataset.col] = "O";
                let img = document.createElement("img");
                img.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";
                square.appendChild(img);

                // if 3 Os in a row found, print "O Won!" and end game
                if (checkWin("O", input, square.dataset.row, square.dataset.col)){
                    createHeading("O Won!");
                }

                // if not, then check if it is a tie game
                else{
                    givenUp = checkTied();
                    gameOver = givenUp;
                }
                start++;
            }
        }
        else{
            event.preventDefault();
        }
    });
});
