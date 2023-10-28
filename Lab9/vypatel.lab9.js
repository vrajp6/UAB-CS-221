function playGame() {
    // this asks the player to enter their choice and makes it lowercase
    const playerChoice = prompt("Enter your choice: Rock, Paper, or Scissors").toLowerCase();

    // this checks if the player's choice is valid and prompts them to enter a valid choice if it is not
    if (playerChoice !== "rock" && playerChoice !== "paper" && playerChoice !== "scissors") {
        console.log("Invalid choice! Please enter Rock, Paper, or Scissors.");
        playGame();
        return;
    }

    // creating a variable for the computer's choice
    const computerChoice = generateComputerChoice();

    // this shows the choices in the browser console
    console.log("Player chose: " + playerChoice);
    console.log("Computer chose: " + computerChoice);

    // creating a variable for the winner
    const winner = chooseWinner(playerChoice, computerChoice);

    // this shows the winner in the browser console
    console.log(winner);

    // am asking if the player wants to play again and if so it starts a new round
    const playAgain = confirm("Would You Like To Play Again?");
    if (playAgain) {
        playGame();
    }
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
function chooseWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        return "Player wins!";
    } else {
        return "Computer wins!";
    }
}

// this make sure the game starts when the page loads
window.onload = playGame;
