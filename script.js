// Define card deck
const deck = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
];

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// Get random card from deck
function getRandomCard() {
  const index = Math.floor(Math.random() * deck.length);
  return deck.splice(index, 1)[0];
}

// Calculate score of a hand
function calculateScore(hand) {
  let score = 0;
  let hasAce = false;

  for (let card of hand) {
    if (card === 'A') {
      hasAce = true;
    } else if (card === 'J' || card === 'Q' || card === 'K') {
      score += 10;
    } else {
      score += parseInt(card);
    }
  }

  if (hasAce && score + 11 <= 21) {
    score += 11;
  } else {
    score += 1;
  }

  return score;
}

// Deal initial cards
function dealInitialCards() {
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
  playerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
}

// Display cards
function displayCards() {
  document.getElementById('player-hand').innerHTML = playerHand.map(card => `<div class="card">${card}</div>`).join('');
  
  // Display only the first card of the dealer's hand during the game
  let dealerCardsHTML = '';
  for (let i = 0; i < dealerHand.length; i++) {
    if (i === 0 || gameOver) {
      dealerCardsHTML += `<div class="card">${dealerHand[i]}</div>`;
    } else {
      dealerCardsHTML += '<div class="card">?</div>';
    }
  }
  document.getElementById('dealer-hand').innerHTML = dealerCardsHTML;
}

// Check if the game is over
function checkGameOver() {
  if (playerScore > 21 || dealerScore > 21 || playerHand.length === 5) {
    endGame();
  }
}

// Display result in a new screen
function displayResult(result) {
  document.getElementById('result').innerHTML = result;
}

// End game and display result
function endGame() {
  gameOver = true;
  let resultMessage = '';

  // Reveal all of the dealer's cards
  const dealerCards = dealerHand.map(card => `<div class="card">${card}</div>`).join('');
  document.getElementById('dealer-hand').innerHTML = dealerCards;

  if (playerScore > 21 || (dealerScore <= 21 && dealerScore > playerScore)) {
    resultMessage = 'Dealer Wins!';
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    resultMessage = 'Player Wins!';
  } else {
    resultMessage = 'Draw!';
  }

  displayResult(resultMessage);

  // Disable hit and stand buttons
  document.getElementById('hit-button').disabled = true;
  document.getElementById('stand-button').disabled = true;
}

// Initialize game
function initGame() {
  gameOver = false;
  // Reset deck
  deck.splice(0, deck.length);
  deck.push(
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
  );

  // Clear player and dealer hands
  playerHand = [];
  dealerHand = [];

  // Clear player and dealer scores
  playerScore = 0;
  dealerScore = 0;

  // Clear the result screen
  document.getElementById('result').innerHTML = '';

  // Enable hit and stand buttons
  document.getElementById('hit-button').disabled = false;
  document.getElementById('stand-button').disabled = false;

  // Deal initial cards
  dealInitialCards();

  // Display cards
  displayCards();

  // Calculate scores
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);

  // Check if the game is over
  checkGameOver();
}

// Event listeners
document.getElementById('hit-button').addEventListener('click', function() {
  playerHand.push(getRandomCard());
  playerScore = calculateScore(playerHand);
  displayCards();
  checkGameOver();
});

document.getElementById('stand-button').addEventListener('click', function() {
  while (dealerScore < 17) {
    dealerHand.push(getRandomCard());
    dealerScore = calculateScore(dealerHand);
    displayCards();
  }
  endGame();
});

document.getElementById('new-game').addEventListener('click', initGame);

// Start game
initGame();