var numberSelected = null;
var tilesSelected = null;
var position = true;

var seconds = 0;
var minutes = 0;
var hours = 0;

var won;
var errors = 0;
document.getElementById("errors").innerText = "تعداد خطا : " + errors;
document.getElementById("start").addEventListener('click' , startGame);


window.onload = function() {
    setGame();
}

var board = [
    "--3--8---",
    "-4----8--",
    "-8-35-9--",
    "8-5--6---",
    "1--732--8",
    "---8--3-1",
    "--8-14-7-",
    "-----7-5-",
    "51-9--2--"
]

var solution= [
    "953428716",
    "241679853",
    "786351942",
    "835196427",
    "194732568",
    "672845391",
    "328514679",
    "469287153",
    "517963284"
]

function startGame(){
    errors = 0
    seconds = 0;
    minutes = 0;
    hours = 0;
    setInterval(function() {
        if(position){
            timer();
            document.getElementById("time").innerText = "تایمر " + hours + ":" + minutes + ":" + seconds++;
        }
    }, 1000);
    document.getElementById("start").removeEventListener('click' , startGame)
}


function setGame() {
        for (let i = 1; i <= 9; i++) {
            let number = document.createElement("div");
            number.id = i;
            number.innerText = i;
            number.addEventListener("click" ,selectNumber);
            number.classList.add("number");
            document.getElementById("digits").appendChild(number);
        }
    
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let tile = document.createElement("div");
                tile.classList.add("bgcolor");
                tile.id = r.toString() + "-" + c.toString();
                
                if (board[r][c] != "-") {
                    tile.innerText = board[r][c];
                    tile.classList.add("tile-start");
                }
    
                if (r == 2 || r == 5) {
                    tile.classList.add("horizontal-line");
                }
                if (c == 2 || c == 5) {
                    tile.classList.add("vertical-line");
                }
                tile.addEventListener("click", selectTile);
                tile.classList.add("tile");
                document.getElementById("board").append(tile);
            }
        }
    }

function selectNumber() {
    if (numberSelected != null) {
        numberSelected.classList.remove("number-selected");
    }
    numberSelected = this;
    numberSelected.classList.add("number-selected");
}

function selectTile() {
    if(position){
        if (numberSelected) {
            if (this.innerText != ""){
                return;
            }
            let coords = this.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
    
            if (solution[r][c] == numberSelected.id) {
                this.innerText = numberSelected.id;
                
            } else {
                errors += 1;
                document.getElementById("errors").innerText = "تعداد خطا: " + errors;
                setTimeout(() => {
                    this.classList.remove("danger");
                }, 1500);
            }
            endGame();
            }
    }
    }
    
function checkDone(){
    let tiles = document.querySelectorAll(".tile");
    for(let i = 0; i < tiles.length ; i++){
        if(tiles[i].textContent === "") return false;
    }
    return true;
}

function endGame() {
    if(checkDone()) {
        document.getElementById("win").innerText = "مـوفق شـدی";
        position = false;
    }
    if(errors === 10) {
        position = false;
        document.getElementById("lose").innerText = "باختی :)";
        document.getElementById("start").addEventListener('click' , startGame);
    }
}


function timer() {
    if(seconds === 60) {
        seconds = 0;
        minutes++;
    }else if(minutes === 60) {
        minutes = 0;
        hours++;
    }
}

















