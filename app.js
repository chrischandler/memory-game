document.addEventListener('DOMContentLoaded', () => {
    // Declared
    const cardDeck = makeDeck();
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const triesDisplay = document.querySelector('#tries');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];
    let tries = 0;


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
        tries ++;
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

        // Display how many matches so far
        resultDisplay.textContent = cardsWon.length;
        triesDisplay.textContent = tries;
        if (cardsWon.length === cardDeck.length/2) {
            // Game is over
            resultDisplay.textContent = "You won!"
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
            // Sets name using random string generator grabbed from StackExchange
            name = Math.random().toString(36).substring(7);
            img = "https://robohash.org/" + name;
            randomDeck[i] = { name, img } // Assign a random card
            i++;
            randomDeck[i] = { name, img } // Assign a matching card
        }
        // Not sure yet how this random generator works
        randomDeck.sort(() => 0.5 - Math.random());
        console.log(randomDeck);
        return randomDeck;
    }

    createBoard();

})