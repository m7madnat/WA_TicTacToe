const tictacGame = (() => {
    let round = 1
    playerToken = "X"

    let board = ["", "", "", "", "", "", "", "", ""]

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const boxElements = document.querySelectorAll(".box")
    const resetButton = document.getElementById("resetBtn")
    const readOut = document.getElementById("HopeWish")
    const timer = document.querySelector(".timer")

    resetButton.addEventListener("click", reset) // reset button

    boxElements.forEach(clickfunction) // click function for each box element

    function clickfunction(box) {
        box.addEventListener("click", playround ) // click function for each box element 
    }

    function removeclick(box) {
        box.removeEventListener("click", playround) // stop click for box
    }

    function setToken() { // set token for each player
        if (round % 2 === 1) {

            playerToken = "X" // player x turn
        } else {
            playerToken = "O"
        }
    }

    function playround(e) {
        if (e.target.innerHTML === "") { // if box is empty then add token               
            e.target.innerHTML = playerToken // add (X or O) to box        
            changeTurn()
            board[e.target.dataset.index] = playerToken // add token to board array for checking win conditions
            round++ // increase round number by 1          
            setToken() // set token for each player 
            console.log(board)
            winConditions.forEach(checkWin) // check win conditions each round
        }
    }


    function checkWin(wincondition) {
        let Xticker = 0
        let Oticker = 0
        let scoreBoardX = document.querySelector("#scoreboard-1");
        let scoreBoardY = document.querySelector("#scoreboard-2");

        for (let i = 0; i < wincondition.length; i++) {
            if (board[wincondition[i]] == "X") // check if X is in win condition
                Xticker++
            else if ((board[wincondition[i]] == "O"))
                Oticker++
        }
        if (Oticker == 3) {
            readOut.innerHTML = "O wins!!!"
            scoreBoardY.textContent = parseInt(scoreBoardY.textContent) + 1; // add 1 to score board           
            document.querySelectorAll(".turn").forEach((turn) => turn.innerHTML = "")
            timer.classList.add("hide2")
            boxElements.forEach(removeclick)
        } else if (Xticker == 3) {           
            readOut.innerHTML = "X wins!!!"            
            scoreBoardX.textContent = parseInt(scoreBoardX.textContent) + 1;
            document.querySelectorAll(".turn").forEach((turn) => turn.innerHTML = "")   
            timer.classList.add("hide2") 
            boxElements.forEach(removeclick)
        } else if (round == 10 && Oticker < 3 && Xticker < 3) {
            readOut.innerHTML = "DRAW!!!"
            document.querySelectorAll(".turn").forEach((turn) => turn.innerHTML = "")    
            timer.classList.add("hide2")        
        }
    }

    function reset() {
        board = ["", "", "", "", "", "", "", "", ""]
        round = 1
        playerToken = "X"
        document.querySelectorAll(".box").forEach((box) => box.innerHTML = "")
        document.querySelectorAll(".turn").forEach((turn) => turn.innerHTML = "Turn : X")
        readOut.innerHTML = "Good Luck!"
        // reset time out
        timer.classList.remove("hide2")
        totalSeconds = 0
        secondsLabel.innerHTML = "00"
        minutesLabel.innerHTML = "00"
        boxElements.forEach(clickfunction)
    }

    let minutesLabel = document.getElementById("minutes");
    let secondsLabel = document.getElementById("seconds");
    let totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        let valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    const turn = document.querySelectorAll(".turn")

    function changeTurn() {
        if (playerToken == "X") {
            turn.forEach((turn) => turn.innerHTML = "Turn : O") 
        } else {
            turn.forEach((turn) => turn.innerHTML = "Turn : X")
        }
    }
});


let buttons = document.querySelectorAll('#buttons-container button');
let h1 = document.querySelector('h1');
let rules = document.querySelector('.Rules');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        for (j = 0; j < buttons.length; j++) {
            buttons[j].style.display = 'none'; 
        }

        setTimeout(function () {
            let container = document.querySelector('#container');
            container.classList.remove("hide"); // show game board  
            h1.innerHTML = ""; // hide h1
            rules.innerHTML = ""; // hide rules
        }, 100)
    })
}

tictacGame()