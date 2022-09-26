
let correctWord;
let guess = "";
let guessGrid = [];
let gridCount = 1;
let guessed = false;
let currRow = 0;
let currCol = 0;


const getWord = async () => {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const data = await response.json();
    console.log(data[0]);
    // correctWord = data[0];
    return data[0];
}

const createGame = async () => {
    correctWord = await getWord();
    console.log("testing: "+correctWord);

    for(let i=0; i<6; i++) {
        guessGrid[i] = [];
        for(let j=0; j<5; j++) {
            guessGrid[i].push(document.querySelector("#s"+gridCount));
            console.log(guessGrid[i]);
            gridCount++;
        }
    }


    // Keys
    // Storing keys a-z in an array
    let keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 
                "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", 
                "w", "x", "y", "z"];

    // All keys besides enter and backspace
    for(let i=0; i<keys.length; i++) {
        console.log("#"+keys[i]+" Key");
        const key = document.querySelector("#"+keys[i]+"Key");
        console.log(key);
        key.addEventListener("click", e => {
            if(!guessed) {
                console.log(keys[i]+"Key pressed!");
                if(currCol!=5 && currRow!=6) {
                    guessGrid[currRow][currCol].innerHTML = `<p class="squareText"> `+keys[i].toUpperCase()+`</p>`;
                    currCol++;
                    guess = guess+keys[i];
                    console.log(guess);
                }       
            }
        })
        document.addEventListener("keyup", e => {
            if(!guessed) {
                if(currCol!=5 && currRow!=6 && e.keyCode == (i+65)) {
                    console.log(keys[i]+"Key pressed!");
                    guessGrid[currRow][currCol].innerHTML = `<p class="squareText"> `+keys[i].toUpperCase()+`</p>`;
                    currCol++;
                    guess = guess+keys[i];
                    console.log(guess);
                } 
            }

            console.log("col: " + currCol);
        })
    }

    // Enter key
    const enterKey = document.querySelector("#enterKey");
    enterKey.addEventListener("click", e => {
        if(!guessed) {
            console.log("Enter key pressed!");
            if(currCol==5 && currRow!=6) {
                checkGuess(guess);
                currRow++;
                currCol = 0;
                console.log(currRow);
            }
        }
    });
    document.addEventListener("keyup", e => {
        if(!guessed) {
            if(currCol==5 && currRow!=6 && e.keyCode == 13) {
                checkGuess(guess);
                currRow++;
                currCol = 0;
                console.log(currRow);
            }    
        }
    });

    // Backspace
    const backKey = document.querySelector("#backKey");
    backKey.addEventListener("click", e => {
        if(!guessed) {
            console.log("Back key pressed!");
            if(currCol>0) {
                currCol--;
                guessGrid[currRow][currCol].innerHTML = `<p class="squareText"> `+" "+`</p>`;
                guess = guess.substring(0, guess.length-1);
                console.log(guess);
            }
        }
    });
    document.addEventListener("keydown", e => {
        if(!guessed) {
            if(currCol>0 && e.keyCode == 8) {
                console.log("Back key pressed!");
                currCol--;
                guessGrid[currRow][currCol].innerHTML = `<p class="squareText"> `+" "+`</p>`;
                guess = guess.substring(0, guess.length-1);
                console.log(guess);
            }
        }
    });


}

createGame();

const checkGuess = async(userGuess) => {
    console.log(correctWord);
    // var stays true at first
    guessed = true;
    for(let i=0; i<userGuess.length; i++) {
        if(correctWord.indexOf(userGuess.charAt(i))===-1) { // The letter is not in the word
            guessGrid[currRow][i].style.backgroundColor = `#B8B8B8`;
            guessed = false;
            console.log("letter not in word");
        }
        else if(userGuess.charAt(i)===correctWord.charAt(i)) { // The letter is in the correct position
            guessGrid[currRow][i].style.backgroundColor = `#F386AC`;
            console.log("letter in word and position");
        }
        else { // The letter is in the word but not in the correct position
            guessGrid[currRow][i].style.backgroundColor = `#B5B9FF`;
            guessed = false;
            console.log("letter in word not position");
        }
        guessGrid[currRow][i].style.color = `white`;
    }
    // If the current letter isnt in the string at all, square turns grey

    // If the current letter doesn't match the corresponding letter, but is in the string, turns yellow

    // If the current letter matches the corresponding letter, it turns green
    // userGuess.charAt(i)===correctWord.charAt(i)
    guess = ""; // resetting guess
}
