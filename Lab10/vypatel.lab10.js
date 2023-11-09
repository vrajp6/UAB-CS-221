// used my code from lab 9 and modified it to work with lab 10
// removed the prompt and invalid choice alert and replaced them with buttons

// used this link to help me with understanding event listeners: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// added Event listeners to the buttons with the ids 'rock', 'paper', and 'scissors'
// When a button is clicked, they call the playGame function with the respective choice
document.getElementById('rock').addEventListener('click', function() { playGame('rock'); });
document.getElementById('paper').addEventListener('click', function() { playGame('paper'); });
document.getElementById('scissors').addEventListener('click', function() { playGame('scissors'); });

// this function takes the player's choice, generates a computer choice, determines the winner, and displays the result
function playGame(playerChoice) {
    const computerChoice = generateComputerChoice();
    const winner = chooseWinner(playerChoice, computerChoice);
    showResult(playerChoice, computerChoice, winner);
}

// this function generates a random choice for the computer by using math.random and multiplying it by 3
function generateComputerChoice() {
    // here i created an array of valid choices
    const choices = ["rock", "paper", "scissors"];
    // here i am multiplying the random number by 3 and rounding it down to the nearest whole number
    const randomChoice = Math.floor(Math.random() * 3);
    // here i am indexing the array with the random number and returning the choice
    return choices[randomChoice];
}

// this function determines the winner by comparing the player's choice to the computer's choice
function chooseWinner(player, computer) {
    if (player === computer) { //checking if the player and computer chose the same thing
        return "It's a tie!"; // if they did then print "it's a tie"
    }
    // the player wins if these conditions are met
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return "You win!"; 
    }
    return "Computer wins!"; // if none of those conditions are met then the "Computer wins!""
}

// this function shows the result of the game on the webpage
function showResult(playerChoice, computerChoice, winner) {
    // this gets the div with the id 'result'
    const resultDiv = document.getElementById('result'); 
    // setting the text of the div to the result
    resultDiv.textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}. ${winner}`; 
}
