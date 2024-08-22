var buttonBox = document.querySelector(".btns"),
    btns = document.querySelectorAll(".btns .btn"),
    x_turn = document.querySelector(".x_turn"),
    o_turn = document.querySelector(".o_turn"),
    showChange = document.querySelector(".showChange"),
    choose = document.querySelectorAll(".choose"),
    startingPage = document.querySelector(".starting_page"),
    mainPage = document.querySelector(".main_page"),
    winnerName = document.querySelector(".winnerName"),
    winner_Page = document.querySelector(".winner_Page"),
    playAgainBtn = document.querySelector(".playAgainBtn"),
    timerAnimation = document.querySelector(".timer")

let changeTurn = false;
let hasWinner = false;
let turnTimer;

function startTimer(){
    clearTimeout(turnTimer);
    resetAnimation();
    turnTimer = setTimeout(() => {
        changeTurn = !changeTurn;
        updateTurnIndicator();
        startTimer();
        
    }, 4000);

}

function resetAnimation(){
    timerAnimation.style.animation = "none";
    timerAnimation.offsetHeight;
    timerAnimation.style.animation = "animate 4s linear forwards";
}



function updateTurnIndicator(){
    if (changeTurn) {
        buttonBox.classList.remove("x");
        buttonBox.classList.add("o");
        timerAnimation.style.backgroundColor = "rgb(133, 3, 3)";
        showChange.style.left = "155px";
        showChange.style.backgroundColor = "rgb(133, 3, 3)";
        o_turn.style.color = "#fff";
        x_turn.style.color = "#000"; 
    } else {
        buttonBox.classList.add("x");
        buttonBox.classList.remove("o");
        timerAnimation.style.backgroundColor = "rgb(97, 115, 133)";
        showChange.style.left = "o";
        showChange.style.backgroundColor = "rgb(97, 115, 133)";
        o_turn.style.color = "#000";
        x_turn.style.color = "#fff";

    }
      
}

choose.forEach(chooseNow => {
    chooseNow.addEventListener("click", () => {
        if (chooseNow.id == "playerx"){
            changeTurn = false;
            updateTurnIndicator();
        } else {
            changeTurn = true;
            updateTurnIndicator();
        }
        startingPage.style.display = "none";
        mainPage.style.display = "block";
        
        

    });
});

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.innerHTML === "") {
            if (!changeTurn) {
                btn.innerHTML = "x";
                btn.style.backgroundColor = "rgb(97, 115, 133)";
                btn.id = "x";
                btn.style.pointerEvents = "none";
                changeTurn = true;

            } else {
                btn.innerHTML = "o";
                btn.style.backgroundColor = "rgb(133, 3, 3)";
                btn.id = "o";
                btn.style.pointerEvents = "none";
                changeTurn = false;
            }
            updateTurnIndicator();
            startTimer();
            winningFunc();
            if (!hasWinner) {
                drawFunc()    
                
            }
            
        }
    })
})

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function winningFunc() {
    for (let a = 0; a <= 7; a++) {
        let b = winningCombinations[a];

        if(btns[b[0]].id == ""|| btns[b[1]].id == ""|| btns[b[2]].id == "" ) {
            continue    
        } 
        
        else if(btns[b[0]].id == "x" && btns[b[1]].id == "x" && btns[b[2]].id == "x" ) {

            winnerName.innerHTML = 'Player <span class="winnerText"> x </span>Winner of the game!';

            let winnerText = document.querySelector(".winnerText");
            winnerText.style.color = "rgb(97, 115, 133)";
            playAgainBtn.style.backgroundColor = "rgb(97, 115, 133)";
            hasWinner = true;

            incrementWincount("x");

            setTimeout(() => {
                mainPage.style.display = "none";
                winner_Page.style.display = "block";
            }, 300);
            clearTimeout(turnTimer);
            break

        }

        else if(btns[b[0]].id == "o" && btns[b[1]].id == "o" && btns[b[2]].id == "o" ) {

            winnerName.innerHTML = 'Player <span class="winnerText"> o </span>Winner of the game!';

            let winnerText = document.querySelector(".winnerText");
            winnerText.style.color = "rgb(133, 3, 3)";
            playAgainBtn.style.backgroundColor = "rgb(133, 3, 3)";
            hasWinner = true;

            incrementWincount("o");

            setTimeout(() => {
                mainPage.style.display = "none";
                winner_Page.style.display = "block";
            }, 300);
            clearTimeout(turnTimer);
            break

        }
        
    }

}

function drawFunc() {
    if (!hasWinner && Array.from(btns).every(box => box.id != "")) {

        winnerName.innerHTML = "Match has been drawn";
        setTimeout(() => {
            
            mainPage.style.display = "none";
            winner_Page.style.display = "block";
            
        }, 300)
        clearTimeout(turnTimer);
        
    }
}

function incrementWincount(player){
    if (player === "x") {
        let xwins = document.getElementById("x_wins_count");
        xwins.innerHTML = parseInt(xwins.innerHTML) + 1;
    } else if(player === "o"){
        let owins = document.getElementById("o_wins_count");
        owins.innerHTML = parseInt(owins.innerHTML) + 1;
    }   
        
}

function resetGame(){
    changeTurn = false;
    hasWinner = false;

    winnerName.innerHTML = "";

    btns.forEach(btn => {
        btn.innerHTML = "";
        btn.id = "";

        btn.style.backgroundColor = "";
        btn.style.pointerEvents = "auto";
    })

    startingPage.style.display = "block";
    mainPage.style.display = "none";
    winner_Page.style.display = "none";
}

playAgainBtn.addEventListener("click",  ()=> {
    resetGame();
})