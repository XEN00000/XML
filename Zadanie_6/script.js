let playerMoney = 1000;
let currentBetSum = 0;

let dealerHand = [];
let playerHand1 = [];
let platerHand2 = [];

let dealerScore = 0;
let playerScore1 = 0;
let playerScore2 = 0;

let dealerWins = 0;
let playerrWins = 0;

let handSplited = false;
let firstHandBusted = false;
let secondHandBusted = false;

function gameInit() {
    document.getElementById('gaming-phase').style.display = 'none';
    document.getElementById('betting-phase').style.display = 'none';
    startGameButton = document.getElementById('start-game-button');
    startGameButton.addEventListener('click', startGame);
    
    
    const betButtons = document.querySelectorAll('.bet-button');
    betButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const chipValue = parseInt(event.target.getAttribute('data-value'), 10);
            if (!isNaN(chipValue) && playerMoney >= chipValue) {
                playerMoney -= chipValue;
                currentBetSum += chipValue;
                addBetButton(event.target.id, chipValue);
                updateBankDisplay();
                updateBetSumDisplay();
            } else if (playerMoney < chipValue) {
                alert('Nie masz wystarczająco pieniędzy w banku!');
            }
        });
    });
}

function startGame() {
    document.getElementById('start-game-phase').style.display = 'none';
    document.getElementById('betting-phase').style.display = 'block';

    playGameButton = document.getElementById('play-game');
    playGameButton.addEventListener('click', playGame);
}

function playGame() {
    dealerHand = [randomCard(), '2B'];
    playerHand1 = [randomCard(), randomCard()];
    //playerHand1 = ['5H', '5H'];

    document.getElementById('betting-phase').style.display = 'none';

    document.getElementById('gaming-phase').style.display = 'block';
    document.getElementById('reset-game').style.display = 'none';
    
    document.getElementById('split').addEventListener('click', splitCard);
    document.getElementById('double').addEventListener('click', doubleBet);
    document.getElementById('hit').addEventListener('click', hitCard);
    document.getElementById('stand').addEventListener('click', standStill);
    document.getElementById('reset-game').addEventListener('click', cleanUp);

    displayCard(playerHand1[0], 'hand-1', 'P1');
    displayCard(playerHand1[1], 'hand-1', 'P2');
    displayCard(dealerHand[0], 'dealer-cards', 'D1');
    displayCard(dealerHand[1], 'dealer-cards', 'D2');
    updatePlayerScoreDisplay();
    updateDealerScoreDisplay();

    if (!isSameCard(playerHand1[0], playerHand1[1])) {
        document.getElementById('split').disabled = true;
    }
}

function splitCard() {
    // Wyłącz opcję rozdzielenia po wykonaniu
    document.getElementById('split').disabled = true;
    document.getElementById('double').disabled = true;
    handSplited = true;

    // Rozdzielenie kart na dwie ręce
    playerHand2 = [playerHand1[1]];
    playerHand1 = [playerHand1[0]];

    // Tworzenie drugiej ręki
    const divSet2 = document.createElement('div');
    const divHand2 = document.createElement('div');
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Score: ';
    const span = document.createElement('span');

    span.id = 'player-score-2';
    divSet2.id = 'set-2';
    divHand2.id = 'hand-2';
    span.textContent = '0';
    
    paragraph.appendChild(span);
    divSet2.appendChild(divHand2);
    divSet2.appendChild(paragraph);
    document.getElementById('player-cards').appendChild(divSet2);

    // Reset widoku kart w obszarze gracza
    document.getElementById('hand-1').replaceChildren();
    document.getElementById('hand-2').replaceChildren();

    // Wyświetlenie kart w odpowiednich miejscach
    displayCard(playerHand1[0], 'hand-1', 'P1-1');
    displayCard(playerHand2[0], 'hand-2', 'P2-1');

    // Adaptacja menu do gry na dwie ręce
    document.getElementById('hit').textContent = "Hit(Hand1)";
    document.getElementById('stand').textContent = "Stand(Hand1)";
    
    document.getElementById('stand').removeEventListener('click', standStill);
    document.getElementById('stand').addEventListener('click', standStill2);
    updatePlayerScore2Display();

    // Rozegranie partii na pierwszej ręce
    hitCard();
    
}

function doubleBet() {
    playerMoney -= currentBetSum;
    updateBankDisplay();
    currentBetSum *= 2;
    updateBetSumDisplay(); 
    hitCard();
    if (document.getElementById('result-box').style.display != 'block') {
        standStill();
    }
}

function hitCard() {
    document.getElementById('split').disabled = true;
    document.getElementById('double').disabled = true;    

    let controll = playerHand1.length;
    playerHand1.push(randomCard());
    updatePlayerScoreDisplay();
    if (playerScore1 <= 21) {
        displayCard(playerHand1[controll], 'hand-1', `D${controll+1}`);
        controll += 1;
    } 
    if (playerScore1 > 21) {
        displayCard(playerHand1[controll], 'hand-1', `D${controll+1}`);
        controll += 1;
        if (handSplited) {
            standStill2();
            firstHandBusted = true;
        } else {
            verdict();
        }
    }
}

function standStill() {
    if (firstHandBusted && secondHandBusted) {
        verdict();
        return;
    }

    document.getElementById('stand').disabled = true;
    dealerHand.pop();
    dealerHand.push(randomCard());
    document.getElementById("D2").remove();
    displayCard(dealerHand[1], 'dealer-cards', 'D2');
    updateDealerScoreDisplay();
    dealerPlay();
    verdict();
}

function hitCard2() {
    document.getElementById('split').disabled = true;
    document.getElementById('double').disabled = true;

    let controll = playerHand2.length;
    playerHand2.push(randomCard());
    updatePlayerScore2Display();
    if (playerScore2 <= 21) {
        displayCard(playerHand2[controll], 'hand-2', `D${controll+1}`);
        controll += 1;
    } 
    if (playerScore2 > 21) {
        displayCard(playerHand2[controll], 'hand-2', `D${controll+1}`);
        controll += 1;
        secondHandBusted = true;
        standStill();
    }
}

function standStill2() {
    hitCard2();
    document.getElementById('hit').textContent = "Hit(Hand2)";
    document.getElementById('hit').removeEventListener('click', hitCard);
    document.getElementById('hit').addEventListener('click', hitCard2);
    document.getElementById('stand').textContent = "Stand(Hand2)";
    document.getElementById('stand').removeEventListener('click', standStill2);
    document.getElementById('stand').addEventListener('click', standStill);
}

function dealerPlay() {
    let controll = 2;
    if (handSplited) {
        while (dealerScore < playerScore1 && dealerScore < playerScore2 && dealerScore < 21) {
            dealerHand.push(randomCard());
            displayCard(dealerHand[controll], 'dealer-cards', `D${controll+1}`);
            controll += 1;
            updateDealerScoreDisplay();
        }
    } else {
        while (dealerScore < playerScore1 && dealerScore < 21) {
            dealerHand.push(randomCard());
            displayCard(dealerHand[controll], 'dealer-cards', `D${controll+1}`);
            controll += 1;
            updateDealerScoreDisplay();
        }
    }
}

function verdict() {
    document.getElementById('split').disabled = true;
    document.getElementById('double').disabled = true;
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;

    document.getElementById('reset-game').style.display = 'flex';

    if (handSplited) {
        // Obie ręce przekroczyły 21
        if (playerScore1 > 21 && playerScore2 > 21) {
            showResult("Defeat! Both hands exceeded 21.", 0);
            updateDealerWinsDisplay();
        } 
        // Dealer przekroczył 21
        else if (dealerScore > 21) {
            showResult("Victory! The dealer exceeded 21.", 1);
            updatePlayerWinsDisplay();
            playerMoney += currentBetSum * 2;
            updateBankDisplay();
        } 
        // Jedna z rąk gracza wygrywa z dealerem
        else if ((playerScore1 > dealerScore && playerScore1 <= 21) || (playerScore2 > dealerScore && playerScore2 <= 21)) {
            showResult("Victory! One of your hands has more points than the dealer.", 1);
            updatePlayerWinsDisplay();
            playerMoney += currentBetSum * 2;
            updateBankDisplay();
        } 
        // Obie ręce gracza przegrały z dealerem
        else if ((playerScore1 <= 21 && playerScore1 < dealerScore) && (playerScore2 <= 21 && playerScore2 < dealerScore)) {
            showResult("Defeat! Both hands have fewer points than the dealer.", 0);
            updateDealerWinsDisplay();
        } 
        // Przypadek mieszany: jedna ręka przegrała, druga przekroczyła 21
        else if ((playerScore1 > 21 && playerScore2 < dealerScore) || (playerScore2 > 21 && playerScore1 < dealerScore)) {
            showResult("Defeat! One hand exceeded 21, the other has fewer points than the dealer.", 0);
            updateDealerWinsDisplay();
        } 
        // Obie ręce remisują
        else if ((playerScore1 === dealerScore && playerScore1 <= 21) || (playerScore2 === dealerScore && playerScore2 <= 21)) {
            showResult("Draw! At least one hand has the same points as the dealer.", 2);
            playerMoney += currentBetSum;
            updateBankDisplay();
        } 
        // Domyślnie
        else {
            showResult("Defeat! No hand has more points than the dealer.", 0);
            updateDealerWinsDisplay();
        }
    } else {
        // Standardowa logika dla jednej ręki
        if (playerScore1 > 21) {
            showResult("Defeat! You exceeded 21.", 0);
            updateDealerWinsDisplay();
        } else if (dealerScore > 21) {
            showResult("Victory! The dealer exceeded 21.", 1);
            updatePlayerWinsDisplay();
            playerMoney += currentBetSum * 2;
            updateBankDisplay();
        } else if (playerScore1 > dealerScore) {
            showResult("Victory! You have more points than the dealer.", 1);
            updatePlayerWinsDisplay();
            playerMoney += currentBetSum * 2;
            updateBankDisplay();
        } else if (playerScore1 < dealerScore) {
            showResult("Defeat! The dealer has more points.", 0);
            updateDealerWinsDisplay();
        } else {
            showResult("Draw! You have the same points as the dealer.", 2);
            playerMoney += currentBetSum;
            updateBankDisplay();
        }
    }
}

function cleanUp() {
    document.getElementById('gaming-phase').style.display = 'none';
    document.getElementById('betting-phase').style.display = 'block';

    document.getElementById('split').disabled = false;
    document.getElementById('double').disabled = false;
    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;

    document.getElementById('hit').removeEventListener('click', hitCard2);
    document.getElementById('stand').removeEventListener('click', standStill2);

    document.getElementById('hit').addEventListener('click', hitCard);
    document.getElementById('stand').addEventListener('click', standStill);

    currentBetSum = 0;
    updateBetSumDisplay();
    document.getElementById('current-bet').replaceChildren();

    dealerHand = [];
    playerHand1 = [];
    playerHand2 = [];

    document.getElementById('dealer-cards').replaceChildren();
    document.getElementById('hand-1').replaceChildren();

    // Usuń set-2, jeśli istnieje
    const set2 = document.getElementById('set-2');
    if (set2) {
        set2.remove();
    }

    dealerScore = 0;
    playerScore1 = 0;
    playerScore2 = 0;

    updateDealerScoreDisplay();
    updatePlayerScoreDisplay();

    startGame();
}

function showResult(message, status) {
    const resultBox = document.getElementById('result-box');

    // Ustaw treść i pokaż kwadrat
    resultBox.textContent = message;
    resultBox.style.display = 'block';

    // Dodaj niestandardowy atrybut zamiast nadpisywania id
    resultBox.setAttribute('data-status', status);

    // Ukryj kwadrat po kliknięciu
    resultBox.addEventListener('click', () => {
        resultBox.style.display = 'none';
        resultBox.removeAttribute('data-status'); // Usuń niestandardowy atrybut
    });
}

function displayCard(cardName, where = 'hand-1', cardId) {
    const cardFolder = 'cards'; // Ścieżka do folderu z kartami
    const cardImage = document.createElement('img');
    cardImage.src = `${cardFolder}/${cardName}.svg`; // Generowanie pełnej ścieżki do pliku
    cardImage.id = cardId;
    cardImage.alt = `Card ${cardName}`;
    cardImage.classList.add('card');

    // Dodanie obrazu do kontenera
    const container = document.getElementById(where);
    container.appendChild(cardImage);
}

function randomCard() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

    const suits = ['C', 'D', 'H', 'S']; // C = Clubs, D = Diamonds, H = Hearts, S = Spades

    const randomValue = values[Math.floor(Math.random() * values.length)];

    const randomSuit = suits[Math.floor(Math.random() * suits.length)];

    return `${randomValue}${randomSuit}`;
}

function isSameCard(card1, card2) {
    const value1 = card1[0];
    const value2 = card2[0];

    return value1 === value2;
}

function calculateScore(cards) {
    let score = 0;
    let aces = 0;

    // Iteruj przez każdą kartę w liście
    cards.forEach(card => {
        const value = card[0]; // Pobierz wartość karty (pierwszy znak)

        if (value === 'A') {
            aces += 1; // Licz Asy osobno
            score += 11; // As jest liczony jako 11 na początku
        } else if (['K', 'Q', 'J', 'T'].includes(value)) {
            score += 10; // Figury i 10 liczą się jako 10
        } else if (card[1] === 'B') {
            score += 0;
        } else {
            score += parseInt(value, 10); // Dodaj wartość liczbową karty
        }
    });

    // Zamień wartość Asa na 1, jeśli wynik przekracza 21
    while (score > 21 && aces > 0) {
        score -= 10; // Odejmij 10 od wyniku
        aces -= 1;   // Zmniejsz liczbę Asów
    }

    return score;
}

function updatePlayerScoreDisplay(hand = playerHand1) {
    score = calculateScore(hand);
    playerScore1 = score;
    document.getElementById('player-score').textContent = score;
}

function updatePlayerScore2Display(hand = playerHand2) {
    score = calculateScore(hand);
    playerScore2 = score;
    document.getElementById('player-score-2').textContent = score;
}

function updateDealerScoreDisplay() {
    score = calculateScore(dealerHand);
    dealerScore = score;
    document.getElementById('dealer-score').textContent = score;
}

function updatePlayerWinsDisplay() {
    playerrWins += 1;
    document.getElementById('player-wins').textContent = playerrWins;
}

function updateDealerWinsDisplay() {
    dealerWins += 1;
    document.getElementById('dealer-wins').textContent = dealerWins;
}

function updateBankDisplay() {
    document.getElementById('player-money').textContent = playerMoney;
}

function updateBetSumDisplay() {
    document.getElementById('bet-sum').textContent = currentBetSum;
    document.getElementById('bet-sum-val').textContent = currentBetSum;
    
    if (currentBetSum > 0) {
        document.getElementById('play-game').disabled = false;
    } else {
        document.getElementById('play-game').disabled = true;
    }
}

function addBetButton(target, value) {
    const button = document.createElement('button');
    button.textContent = `${value}$`;
    button.className = 'bet-button';
    button.setAttribute('id', target);
    button.addEventListener('click', () => {
        currentBetSum -= value;
        playerMoney += value;
        updateBankDisplay();
        updateBetSumDisplay();
        button.remove();
    });
    document.getElementById('current-bet').appendChild(button);
}

gameInit();