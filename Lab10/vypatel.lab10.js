document.getElementById('rock').addEventListener('click', function() { playGame('rock'); });
document.getElementById('paper').addEventListener('click', function() { playGame('paper'); });
document.getElementById('scissors').addEventListener('click', function() { playGame('scissors'); });

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

function chooseWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    }
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return "You win!";
    }
    return "Computer wins!";
}

function showResult(playerChoice, computerChoice, winner) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}. ${winner}`;
}
