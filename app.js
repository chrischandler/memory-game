document.addEventListener('DOMContentLoaded', () => {
    // Declared
    const cardDeck = makeDeck();
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];


    //Create the board
    function createBoard() {
        for (let i = 0; i < cardDeck.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        } 
    }


    // Check for Matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img');
        console.log(cardsChosen[0], cardsChosen[1], cardsChosen);
        if (cardsChosen[0] === cardsChosen[1]) {
            alert("You found a match!");
            // In the original example, she set the 0 and 1 as consts to evaluate.  I've tried to shorten it here.
            cards[cardsChosenId[0]].setAttribute('src', 'images/white.png');
            cards[cardsChosenId[1]].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen);
        } else {
            alert("No match, try again!");
            cards[cardsChosenId[0]].setAttribute('src', 'images/blank.png');
            cards[cardsChosenId[1]].setAttribute('src', 'images/blank.png');
        }
        // Clear out the chosen cards now that you are finished evaluating them
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        console.log("Evaluating end of game: ", cardsWon.length, cardDeck.length/2);
        if (cardsWon.length === cardDeck.length/2) {
            // Game is over
            resultDisplay.textContent = "Congratulations! You won!"
        }
    }


    //Flip the Card
    function flipCard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardDeck[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardDeck[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }


    function makeDeck() {
        randomDeck = [];
        for (i=0; i<12; i++) {
            name = Math.random().toString(36).substring(7); //  Grabbed from StackExchange
            img = "https://robohash.org/" + name;
            randomDeck[i] = { name, img } // Assign a random card
            i++;
            randomDeck[i] = { name, img } // Assign a matching card
        }
        randomDeck.sort(() => 0.5 - Math.random());
        console.log(randomDeck);
        return randomDeck;
    }

    createBoard();

})