document.addEventListener('DOMContentLoaded', () => {
    // Declared
    const cardDeck = makeDeck();
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];
    var url = "https://robohash.org/"
    let tries = 0;

    
    // Create the board
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
        
        // Increment the number of tries
        tries ++;
        console.log(cardsChosen[0], cardsChosen[1], cardsChosen);
        
        // Do they match?
        if (cardsChosen[0] === cardsChosen[1]) {
            
            // In the original example, she set the 0 and 1 as consts to evaluate.  I've tried to shorten it here.
            cards[cardsChosenId[0]].setAttribute('src', 'images/white.png');
            cards[cardsChosenId[1]].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen);
            
            // Display how many matches so far
            resultDisplay.textContent = cardsWon.length + " You found a match!";
        } else {
            
            // alert("No match, try again!");
            cards[cardsChosenId[0]].setAttribute('src', 'images/blank.png');
            cards[cardsChosenId[1]].setAttribute('src', 'images/blank.png');
        }
        
        // Clear out the chosen cards now that you are finished evaluating them
        cardsChosen = [];
        cardsChosenId = [];
        
        // If the gameis over, change the display
        if (cardsWon.length === cardDeck.length/2) {
            resultDisplay.textContent = `You won with ${tries} tries!`
        }
    }
    
    
    //Flip the Card
    function flipCard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardDeck[cardId].name);
        cardsChosenId.push(cardId);
        // Edited this to see if we can reduce the object
       this.setAttribute('src', url + cardDeck[cardId].name);

        // Check for match if 2 cards are picked
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
    
    
    function buildImage(name) {
        var url = "https://robohash.org/"
        var img = new Image();
        img.onerror = function() {
          console.log("could not load image on URL " + url);
        };
        img.src = url + name;
        console.log(url + name);
        return img;
    }


    function makeDeck() {
        randomDeck = [];
        for (i=0; i<17; i++) {
            // Sets name using random string generator grabbed from StackExchange
            name = Math.random().toString(36).substring(7);
            isRevealed = false;
            randomDeck[i] = { name, isRevealed } // Assign a random card
            randomDeck[i].image = buildImage(name);
            i++;
            randomDeck[i] = { name, isRevealed } // Assign a matching card
            randomDeck[i].image = buildImage(name);

        }

        // Not sure yet how this random generator works
        randomDeck.sort(() => 0.5 - Math.random());

        // Display the final game deck
        console.log(randomDeck);
        return randomDeck;
    }

    // Only function called -- kicks off the game
    createBoard();

})