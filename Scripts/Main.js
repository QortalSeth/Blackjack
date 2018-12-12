var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define("Models/Card", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // export enum cardSuit { Clubs = 'Clubs', Diamonds = 'Diamonds', Hearts = 'Hearts', Spades = 'Spades' }
    /*
    export enum cardType {
      Two = '2',
      Three = '3',
      Four = '4',
      Five = '5',
      Six = '6',
      Seven = '7',
      Eight = '8',
      Nine = '9',
      Ten = '10',
      Jack = 'Jack',
      Queen = 'Queen',
      King = 'King',
      Ace = 'Ace'
    }
    */
    exports.cardTypesArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
    exports.cardSuits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const cardTypesMap = new Map()
        .set("2", 2)
        .set("3", 3)
        .set("4", 4)
        .set("5", 5)
        .set("6", 6)
        .set("7", 7)
        .set("8", 8)
        .set("9", 9)
        .set("10", 10)
        .set("Jack", 10)
        .set("Queen", 10)
        .set("King", 10)
        .set("Ace", 1);
    class Card {
        constructor(type, suit) {
            this.type = type;
            this.suit = suit;
            this.imageSrc = `Images/${type.toLowerCase()}_of_${suit.toLowerCase()}.png`;
            //console.log(this.imageSrc)
        }
        getScore() {
            return cardTypesMap.get(this.type);
        }
        toString() {
            return `${this.type} of ${this.suit}`;
        }
    }
    exports.Card = Card;
});
// Deck: Card[], shuffle(), createDeck(), swapIndex(), displayDeck(), UpdateScores()
define("Models/Deck", ["require", "exports", "Models/Card"], function (require, exports, Card_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Deck {
        constructor(numberOfDecks) {
            this.cards = [];
            for (let i = 0; i < numberOfDecks; i++) {
                for (let typeIndex = 0; typeIndex < Card_1.cardTypesArray.length; typeIndex++) {
                    for (let suitIndex = 0; suitIndex < Card_1.cardSuits.length; suitIndex++) {
                        this.cards.push(new Card_1.Card(Card_1.cardTypesArray[typeIndex], Card_1.cardSuits[suitIndex]));
                    }
                }
            }
        }
        addCard(type, suit) {
            this.cards.push(new Card_1.Card(type, suit));
        }
        shuffle() {
            let timesToShuffle = this.getRandomInt(1, 5);
            for (let j = 0; j < timesToShuffle; j++) {
                for (let i = 0; i < this.cards.length; i++) {
                    this.swapIndex(i, this.getRandomInt(0, this.cards.length));
                }
            }
        }
        swapIndex(index, index2) {
            let temp = this.cards[index];
            this.cards[index] = this.cards[index2];
            this.cards[index2] = temp;
        }
        getRandomInt(min, max) {
            return Math.floor(Math.random() * max) + min;
        }
        toString() {
            let returnValue = "";
            for (let card of this.cards) {
                returnValue += card.toString() + "\n";
            }
            return returnValue;
        }
        isEmpty() {
            return this.cards.length === 0;
        }
        printDeck() {
            console.log(this.toString);
        }
    }
    exports.Deck = Deck;
});
define("Models/Hand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hand {
        constructor(bet, index) {
            this.bet = bet;
            this.index = index;
            this.cards = [];
            this.score = [];
            this.stayed = false;
            this.surrender = false;
            this.insurance = 0;
        }
        addCardFromDeck(deck) {
            let cardToAdd = deck.cards.pop();
            this.cards.push(cardToAdd);
            this.calculateScore();
            return cardToAdd;
        }
        addCardFromCard(cardToAdd) {
            this.cards.push(cardToAdd);
            this.calculateScore();
            return cardToAdd;
        }
        calculateScore() {
            this.score = [];
            let baseScore = 0;
            let aces = 0;
            for (let card of this.cards) {
                baseScore += card.getScore();
                if (card.type === "Ace") {
                    aces++;
                }
            }
            this.score.push(baseScore);
            while (aces-- > 0) {
                baseScore += 10;
                if (baseScore <= 21) {
                    this.score.push(baseScore);
                }
            }
        }
        getScoreText() {
            if (this.score.length > 0) {
                let text = `${this.score[0]}`;
                for (let i = 1; i < this.score.length; i++) {
                    text += ` or ${this.score[i]}`;
                }
                return text;
            }
            else
                return "0";
        }
        getHighestScore() {
            if (this.score.length > 0) {
                let max = this.score[0];
                for (let score of this.score) {
                    max = Math.max(max, score);
                }
                return max;
            }
            return 0;
        }
        getLowestScore() {
            if (this.score.length > 0) {
                let min = this.score[0];
                for (let score of this.score) {
                    min = Math.min(min, score);
                }
                return min;
            }
            return 0;
        }
        checkBlackjack() {
            let scoreCheck = this.getHighestScore() === 21;
            let cardCountCheck = this.cards.length === 2;
            return scoreCheck && cardCountCheck;
        }
        check21() {
            for (let score of this.score) {
                if (score === 21) {
                    return true;
                }
            }
            return false;
        }
        checkBust() {
            return this.getLowestScore() > 21;
        }
        checkDoubleDown(currentScore) {
            let scoreCheck = this.getHighestScore() < 11;
            let cardCountCheck = this.cards.length <= 2;
            let playerCanPayForDoubleDown = currentScore >= this.bet;
            return scoreCheck && cardCountCheck && playerCanPayForDoubleDown && this.checkStay();
        }
        checkHit() {
            return this.getLowestScore() <= 21 && this.checkStay();
        }
        checkStay() {
            return !this.stayed;
        }
        checkInsurance(dealerCards, currentScore) {
            let dealerHasAce = dealerCards.cards[0].type === "Ace";
            let notAlreadyInsured = this.insurance === 0;
            let playerHasNoBlackjack = this.getHighestScore() < 21;
            let playerCanPayForInsurance = (currentScore - this.bet / 2) > 0;
            return dealerHasAce && this.checkStay() && notAlreadyInsured && playerHasNoBlackjack && playerCanPayForInsurance;
        }
        checkSplit(handsNum, currentScore) {
            let cardTypeCheck = this.cards[0].getScore() === this.cards[1].getScore();
            let cardCountCheck = this.cards.length === 2;
            let handCountCheck = handsNum < 4;
            let playerCanPayForSplit = currentScore >= this.bet;
            return cardTypeCheck && cardCountCheck && handCountCheck && playerCanPayForSplit && this.checkStay();
        }
        checkSurrender(currentScore) {
            let cardLengthCheck = this.cards.length === 2;
            let noInsuranceCheck = this.insurance === 0;
            let playerCanPayForSurrender = currentScore >= this.bet / 2;
            return cardLengthCheck && this.checkStay() && noInsuranceCheck && playerCanPayForSurrender;
        }
        checkTurnOver() {
            return this.checkBust() || this.checkStay();
        }
        decideWinner(dealerHand) {
            let dealerScore = dealerHand.getHighestScore();
            let playerScore = this.getHighestScore();
            if (this.surrender === true) {
                this.winningText = "Surrendered";
                this.winnings = this.bet / 2;
            }
            else if (this.checkBlackjack() === true && dealerHand.checkBlackjack() === false) {
                this.winningText = "Player Wins by Blackjack :D";
                this.winnings = this.bet * 3 / 2 + this.bet;
            }
            else if (dealerHand.checkBlackjack() === true) {
                this.winningText = "Dealer Wins by Blackjack :(";
                this.winnings = 0;
            }
            else if (playerScore > 21) {
                this.winningText = "Dealer Wins";
                this.winnings = 0;
            }
            else if (dealerScore > 21) {
                this.winningText = "Player Wins";
                this.winnings = this.bet * 2;
            }
            else if (dealerScore > playerScore) {
                this.winningText = "Dealer Wins";
                this.winnings = 0;
            }
            else if (dealerScore === playerScore) {
                this.winningText = "We'll call it a draw @_@";
                this.winnings = this.bet;
            }
            else if (dealerScore < playerScore) {
                this.winningText = "Player Wins";
                this.winnings = this.bet * 2;
            }
        }
    }
    exports.Hand = Hand;
});
define("Models/Game", ["require", "exports", "Models/Hand", "Models/Deck"], function (require, exports, Hand_1, Deck_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(score, bet) {
            this.score = score;
            this.numberOfDecks = 3;
            this.dealerCards = new Hand_1.Hand(0, 0);
            this.playerCards = [];
            this.playerCards.push(new Hand_1.Hand(this.applyBet(bet), 0));
            this.deck = new Deck_1.Deck(this.numberOfDecks);
            this.deck.shuffle();
        }
        applyBet(bet) {
            this.score -= bet;
            return bet;
        }
        hit(hand, card) {
            if (card == undefined) {
                card = hand.addCardFromDeck(this.deck);
            }
            else
                hand.addCardFromCard(card);
            return card;
        }
        playerStay(handIndex) {
            this.playerCards[handIndex].stayed = true;
        }
        checkWinner() {
            for (let hand of this.playerCards) {
                hand.decideWinner(this.dealerCards);
                this.score += hand.winnings;
            }
        }
        checkEndoPlayerTurn() {
            for (let hand of this.playerCards) {
                if (hand.stayed === false) {
                    return false;
                }
            }
            return true;
        }
        dealerTurn() {
            while (Math.floor(this.dealerCards.getLowestScore()) < 17 && this.dealerCards.getHighestScore() != 21)
                this.hit(this.dealerCards);
            this.checkWinner();
        }
        splitPlayerHand(handIndex) {
            let hand = this.playerCards[handIndex];
            let newHand = new Hand_1.Hand(this.applyBet(hand.bet), this.playerCards.length);
            newHand.addCardFromCard(hand.cards.pop());
            this.hit(hand);
            this.hit(newHand);
            this.playerCards.push(newHand);
        }
        doubleDown(handIndex) {
            let hand = this.playerCards[handIndex];
            hand.bet += this.applyBet(hand.bet);
            this.hit(hand);
            this.playerStay(handIndex);
        }
        surrender(handIndex) {
            let hand = this.playerCards[handIndex];
            hand.surrender = true;
            this.playerStay(handIndex);
        }
        insureHand(handIndex) {
            let hand = this.playerCards[handIndex];
            let insureAmount = hand.bet / 2;
            hand.insurance = insureAmount;
            this.score -= insureAmount;
        }
    }
    exports.Game = Game;
});
define("Controller/HtmlHand", ["require", "exports", "Controller/HTMLElements"], function (require, exports, html) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    class HtmlHand {
        constructor(index, controller, parent, isPlayer) {
            this.index = index;
            this.controller = controller;
            this.parent = parent;
            this.isPlayer = isPlayer;
            this.game = controller.game;
            if (isPlayer)
                this.hand = this.game.playerCards[index];
            else
                this.hand = this.game.dealerCards;
            this.manageDivs();
            parent.appendChild(this.mainDiv);
            this.winnerText = "";
            if (isPlayer) {
                this.hand = this.game.playerCards[index];
                this.createButtons();
            }
            else
                this.hand = this.game.dealerCards;
        }
        manageDivs() {
            this.mainDiv = document.createElement("div");
            this.imageDiv = document.createElement("div");
            this.scoreDiv = document.createElement("div");
            this.buttonDiv = document.createElement("div");
            this.betDiv = document.createElement("div");
            this.insuranceDiv = document.createElement("div");
            this.winningsDiv = document.createElement("div");
            this.scoreSpan = document.createElement("span");
            this.scoreDiv.appendChild(this.scoreSpan);
            this.mainDiv.appendChild(this.imageDiv);
            this.mainDiv.appendChild(this.scoreDiv);
            this.mainDiv.appendChild(this.betDiv);
            this.mainDiv.appendChild(this.insuranceDiv);
            this.mainDiv.appendChild(this.winningsDiv);
            this.mainDiv.appendChild(this.buttonDiv);
            this.mainDiv.appendChild(document.createElement("br"));
            this.mainDiv.style.display = "inline-block";
            this.mainDiv.style.marginLeft = "10%";
            if (this.isPlayer) {
                this.betSpan = document.createElement("span");
                this.betSpan.innerText = "Current Bet: ";
                this.betAmount = document.createElement("span");
                this.betAmount.innerText = this.hand.bet.toString();
                this.betDiv.appendChild(this.betSpan);
                this.betDiv.appendChild(this.betAmount);
                this.insuranceSpan = document.createElement("span");
                this.insuranceDiv.appendChild(this.insuranceSpan);
                this.winningsSpan = document.createElement("span");
                let space = document.createElement("br");
                this.winningsAmount = document.createElement("span");
                this.winningsDiv.appendChild(this.winningsSpan);
                this.winningsDiv.appendChild(space);
                this.winningsDiv.appendChild(this.winningsAmount);
            }
        }
        createButtons() {
            // create button objects
            this.hitButton = html.createButton("Hit");
            this.stayButton = html.createButton("Stay");
            this.splitButton = html.createButton("Split");
            this.insuranceButton = html.createButton("Insurance");
            this.doubleDownButton = html.createButton("Double Down");
            this.surrenderButton = html.createButton("Surrender");
            let invisibleButton = html.createButton("invis");
            invisibleButton.style.visibility = "hidden";
            //append buttons to buttonDiv
            this.buttonDiv.appendChild(this.hitButton);
            this.buttonDiv.appendChild(this.stayButton);
            this.buttonDiv.appendChild(this.splitButton);
            this.buttonDiv.appendChild(this.insuranceButton);
            this.buttonDiv.appendChild(this.doubleDownButton);
            this.buttonDiv.appendChild(this.surrenderButton);
            this.buttonDiv.appendChild(invisibleButton);
            //add button listeners
            this.hitButton.addEventListener("click", (event) => this.hit());
            this.stayButton.addEventListener("click", (event) => this.stay());
            this.splitButton.addEventListener("click", (event) => this.split());
            this.insuranceButton.addEventListener("click", (event) => this.insurance());
            this.doubleDownButton.addEventListener("click", (event) => this.doubleDown());
            this.surrenderButton.addEventListener("click", (event) => this.surrender());
        }
        showAvailableButtons() {
            if (this.isPlayer) {
                this.buttonDisplay(this.hitButton, this.hand.checkHit());
                this.buttonDisplay(this.stayButton, this.hand.checkStay());
                this.buttonDisplay(this.splitButton, this.hand.checkSplit(this.controller.playerHands.length, this.game.score));
                this.buttonDisplay(this.insuranceButton, this.hand.checkInsurance(this.game.dealerCards, this.game.score));
                this.buttonDisplay(this.doubleDownButton, this.hand.checkDoubleDown(this.game.score));
                this.buttonDisplay(this.surrenderButton, this.hand.checkSurrender(this.game.score));
            }
        }
        buttonDisplay(button, show) {
            if (show)
                button.style.display = "inline";
            else
                button.style.display = "none";
        }
        updateScore() {
            if (this.isPlayer)
                this.scoreSpan.innerText = `Hand Score: ${this.hand.getScoreText()}`;
            else
                this.scoreSpan.innerText = `Dealer Score: ${this.hand.getScoreText()}`;
            //this.scoreDiv.style.backgroundColor = "rgba(0, 250, 250, 0.5);"
        }
        updateHand() {
            this.updateScore();
            let startText = "";
            if (this.isPlayer)
                startText = "Hand";
            else
                startText = "Dealer";
            if (this.hand.checkBlackjack()) {
                this.hand.stayed = true;
                this.scoreSpan.innerText = `${startText} Score: Blackjack`;
            }
            else if (this.hand.check21()) {
                this.hand.stayed = true;
                this.scoreSpan.innerText = `${startText} Score: 21`;
            }
            else if (this.hand.checkBust()) {
                this.hand.stayed = true;
                this.scoreSpan.innerText = `${startText} Score: Bust (${this.hand.getScoreText()})`;
                console.log(`Bust Score: ${this.hand.getScoreText()}`);
            }
            this.showAvailableButtons();
            if (this.game.checkEndoPlayerTurn() && this.isPlayer) {
                this.controller.dealerTurn();
            }
        }
        hit(card) {
            if (card == undefined) {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand));
            }
            else {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card));
            }
            this.updateHand();
        }
        initialHit(card) {
            if (card == undefined) {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand));
            }
            else {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card));
            }
        }
        stay() {
            this.hand.stayed = true;
            this.updateHand();
        }
        split() {
            this.game.splitPlayerHand(this.index);
            let newIndex = this.controller.playerHands.length;
            let newHtmlHand = new HtmlHand(newIndex, this.controller, html.playerDiv, true);
            html.redrawImageDiv(this.imageDiv, this);
            html.redrawImageDiv(newHtmlHand.imageDiv, newHtmlHand);
            this.controller.playerHands.push(newHtmlHand);
            for (let hand of this.controller.playerHands) {
                hand.updateHand();
            }
            this.controller.updateCurrentScore();
        }
        insurance() {
            this.game.insureHand(this.index);
            this.insuranceSpan.innerText = `Insurance: ${this.hand.insurance}`;
            this.controller.updateCurrentScore();
            this.updateHand();
        }
        doubleDown() {
            this.game.doubleDown(this.index);
            this.betAmount.innerText = this.hand.bet.toString();
            html.redrawImageDiv(this.imageDiv, this);
            this.updateHand();
        }
        surrender() {
            this.game.surrender(this.index);
            this.updateHand();
        }
        clear() {
            html.removeDataFromDiv(this.mainDiv);
        }
    }
    exports.HtmlHand = HtmlHand;
});
define("Controller/HTMLElements", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.betDiv = document.getElementById("betDiv");
    exports.betSpan = document.getElementById("betSpan");
    exports.betTextfield = document.getElementById("betTextfield");
    exports.dealerDiv = document.getElementById("dealerHandDiv");
    exports.playerDiv = document.getElementById("playerHandDiv");
    exports.buttonsDiv = document.getElementById("buttonsDiv");
    exports.testDiv = document.getElementById("testDiv");
    exports.scoreSpan = document.getElementById("scoreSpan");
    exports.scoreAmount = document.getElementById("scoreAmount");
    exports.startGameButton = document.getElementById("startGameButton");
    function addImageToDiv(div, card) {
        var imageTag = document.createElement("img");
        imageTag.setAttribute("src", card.imageSrc);
        imageTag.setAttribute("height", "100");
        imageTag.setAttribute("width", "100");
        imageTag.setAttribute("alt", "Error: Card Not Found");
        imageTag.style.marginRight = "10px";
        div.appendChild(imageTag);
    }
    exports.addImageToDiv = addImageToDiv;
    function redrawImageDiv(div, hand) {
        removeDataFromDiv(div);
        for (let card of hand.hand.cards) {
            addImageToDiv(div, card);
        }
    }
    exports.redrawImageDiv = redrawImageDiv;
    function createButton(name) {
        var button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("width", "100px");
        button.setAttribute("height", "25px");
        button.setAttribute("value", name);
        return button;
    }
    exports.createButton = createButton;
    function removeDataFromDiv(div) {
        while (div.hasChildNodes())
            div.removeChild(div.firstChild);
    }
    exports.removeDataFromDiv = removeDataFromDiv;
});
define("Test/TestButtons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    Cards are loaded in reverse order
    The format of the added cards is the following:
    
    Dealer final cards
    
    player cards
    
    dealer first card
     */
    function testInsurance() {
        //     this.game.deck.addCard("Ace", "Clubs")
        //     this.game.deck.addCard("Queen", "Hearts")
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("9", "Spades");
        this.game.deck.addCard("Ace", "Spades");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("Ace", "Diamonds");
    }
    exports.testInsurance = testInsurance;
    function testDoubleDown() {
        this.game.deck.addCard("6", "Hearts");
        this.game.deck.addCard("5", "Hearts");
        this.game.deck.addCard("8", "Hearts");
    }
    exports.testDoubleDown = testDoubleDown;
    function testAceBust() {
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("King", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.testAceBust = testAceBust;
    function testMaxSplits() {
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("9", "Spades");
        this.game.deck.addCard("Ace", "Spades");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.testMaxSplits = testMaxSplits;
    function test21() {
        this.game.deck.addCard("4", "Spades");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("10", "Hearts");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.test21 = test21;
});
define("Test/TestWins", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    Cards are loaded in reverse order
    The format of the added cards is the following:
    
    Dealer final cards
    
    player cards
    
    dealer first card
     */
    function playerWinsByBlackjack() {
        this.game.deck.addCard("Jack", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("Queen", "Diamonds");
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
    }
    exports.playerWinsByBlackjack = playerWinsByBlackjack;
    function playerWinsByBlackjackAnd21() {
        this.game.deck.addCard("Jack", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
    }
    exports.playerWinsByBlackjackAnd21 = playerWinsByBlackjackAnd21;
    function playerWinsByBust() {
        this.game.deck.addCard("9", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("3", "Diamonds");
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.playerWinsByBust = playerWinsByBust;
    function playerWinsByScore() {
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("3", "Diamonds");
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.playerWinsByScore = playerWinsByScore;
    function playerWinsByDoubleDown() {
        this.game.deck.addCard("Queen", "Diamonds");
        this.game.deck.addCard("Jack", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.playerWinsByDoubleDown = playerWinsByDoubleDown;
    function dealerWinsByBlackjack() {
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
    }
    exports.dealerWinsByBlackjack = dealerWinsByBlackjack;
    function everyoneHasBlackjack() {
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
    }
    exports.everyoneHasBlackjack = everyoneHasBlackjack;
    function dealerWinsByBust() {
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
        this.game.deck.addCard("9", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.dealerWinsByBust = dealerWinsByBust;
    function dealerWinsByScore() {
        // split player hand into 4 hands, 1 21, 1 win, 1 bust, 1 lose
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("7", "Diamonds"); //3 (Hit)
        this.game.deck.addCard("3", "Diamonds"); //1 (Hit)
        this.game.deck.addCard("5", "Diamonds"); //4
        this.game.deck.addCard("8", "Diamonds"); //1
        this.game.deck.addCard("King", "Diamonds"); //3
        this.game.deck.addCard("Queen", "Diamonds"); //1=>4
        this.game.deck.addCard("Queen", "Diamonds"); //2
        this.game.deck.addCard("Jack", "Diamonds"); //1=>3
        this.game.deck.addCard("10", "Diamonds"); // 1=>2
        this.game.deck.addCard("10", "Diamonds"); // 1
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.dealerWinsByScore = dealerWinsByScore;
    function dealerWinsByDoubleDown() {
        this.game.deck.addCard("Queen", "Diamonds");
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.dealerWinsByDoubleDown = dealerWinsByDoubleDown;
    function draw() {
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.draw = draw;
    function draw21() {
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("3", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
    }
    exports.draw21 = draw21;
    function everyoneBusts() {
        this.game.deck.addCard("9", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
    }
    exports.everyoneBusts = everyoneBusts;
    function unknownFailure() {
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("4", "Spades");
        this.game.deck.addCard("4", "Hearts");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("Ace", "Spades");
    }
    exports.unknownFailure = unknownFailure;
});
define("Controller/Controller", ["require", "exports", "Models/Game", "Controller/HTMLElements", "Controller/HtmlHand", "Test/TestWins", "Models/Deck"], function (require, exports, Game_1, html, HtmlHand_1, testWins, Deck_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    testWins = __importStar(testWins);
    class Controller {
        constructor() {
            this.debug = false;
            this.currentScore = 1000;
            this.minimumBet = 20;
            html.startGameButton.addEventListener("click", (event) => this.startNewGame());
            html.betTextfield.addEventListener("keyup", (event) => this.betTextFieldListener());
            html.scoreAmount.innerText = this.currentScore.toString();
        }
        startNewGame() {
            this.game = new Game_1.Game(this.currentScore, Math.floor(parseInt(html.betTextfield.value)));
            this.resetGameHtmlData();
            this.updateCurrentScore();
            if (this.debug) {
                //html.testDiv.innerText = this.game.deck.toString()
                //this.showDeck()
            }
            html.startGameButton.style.display = "none";
            this.betDisplay(false);
            this.initialHits();
        }
        initialHits() {
            if (this.debug) {
                //this.test = testButtons.testMaxSplits
                this.test = testWins.dealerWinsByScore;
                this.test();
            }
            this.dealerHand.hit();
            this.playerHands[0].initialHit();
            this.playerHands[0].hit();
        }
        resetGameHtmlData() {
            html.removeDataFromDiv(html.dealerDiv);
            html.removeDataFromDiv(html.playerDiv);
            this.betDisplay(false);
            this.dealerHand = new HtmlHand_1.HtmlHand(0, this, html.dealerDiv, false);
            this.playerHands = [];
            this.playerHands.push(new HtmlHand_1.HtmlHand(0, this, html.playerDiv, true));
        }
        updateCurrentScore() {
            html.scoreAmount.innerText = this.game.score.toString();
        }
        betDisplay(display) {
            if (display) {
                html.betSpan.style.display = "inline";
                html.betTextfield.style.display = "inline";
            }
            else {
                html.betSpan.style.display = "none";
                html.betTextfield.style.display = "none";
            }
        }
        betTextFieldListener() {
            let textField = html.betTextfield;
            let number = parseInt(textField.value);
            if (this.checkValidBet()) {
                html.startGameButton.disabled = false;
            }
            else
                html.startGameButton.disabled = true;
        }
        checkValidBet() {
            let number = parseInt(html.betTextfield.value);
            let isANumber = isNaN(number) === false;
            let minCheck = number >= this.minimumBet;
            let maxCheck = number <= this.currentScore;
            return isANumber && minCheck && maxCheck;
        }
        dealerTurn() {
            this.game.dealerTurn();
            html.redrawImageDiv(this.dealerHand.imageDiv, this.dealerHand);
            this.dealerHand.updateHand();
            this.endGame();
        }
        endGame() {
            let totalWinnings = 0;
            for (let hand of this.playerHands) {
                let winnings = hand.hand.winnings - hand.hand.bet;
                let winningsText = "";
                if (winnings > 0)
                    winningsText = `You gained: ${Math.abs(winnings)}`;
                else if (winnings < 0) {
                    if (hand.hand.insurance > 0 && this.dealerHand.hand.checkBlackjack()) {
                        winningsText = `You lost: ${Math.abs(hand.hand.bet)}, but gained it back because of insurance.`;
                        this.game.score += hand.hand.insurance * 3;
                    }
                    else
                        winningsText = `You lost: ${Math.abs(winnings)}`;
                }
                else {
                    winningsText = `You gained: ${Math.abs(winnings)}`;
                }
                totalWinnings += winnings;
                hand.winningsSpan.innerText = hand.hand.winningText;
                hand.winningsAmount.innerText = winningsText;
            }
            this.currentScore = this.game.score;
            this.updateCurrentScore();
            html.startGameButton.style.display = "inline";
            this.betDisplay(true);
            this.betTextFieldListener();
            if (this.currentScore < this.minimumBet) {
                html.startGameButton.style.display = "none";
                let span = document.createElement("span");
                span.innerText = "You don't have enough to continue. Game Over :(";
                span.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
                span.style.fontSize = "xx-large";
                html.testDiv.appendChild(span);
            }
        }
        showDeck() {
            let deck = new Deck_2.Deck(1);
            while (deck.isEmpty() === false) {
                html.addImageToDiv(html.testDiv, deck.cards.pop());
            }
        }
    }
    exports.Controller = Controller;
});
define("Main", ["require", "exports", "Controller/Controller"], function (require, exports, Controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let controller = new Controller_1.Controller();
});
define("Controller/DealerFunctions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
/*
export let DealerTurn = function(controller: Controller) {
  let lowChanceToLose = Math.floor(controller.game.dealerCards.getLowestScore()) < 17
  let dealerScore = controller.game.dealerCards.getHighestScore()

  while (lowChanceToLose) {
    controller.html.addImageToDiv(controller.html.dealerDiv, controller.game.dealerHit())
    dealerScore = controller.game.dealerCards.getHighestScore()
  }

  controller.updateScores()
  controller.checkForEndOfGame()
}

*/
/*
let DealerTurn = function(this: Controller) {
  let mustHitToWin = game.playerStayed && game.playerCards.getHighestScore > game.dealerCards.getHighestScore
  let lowChanceToLose = Math.floor(game.dealerCards.getHighestScore()) < 17
  let dealerScore = game.dealerCards.getHighestScore()
  let playerScore = game.playerCards.getHighestScore()

  if (game.DealerStayed == false) {
    if (game.playerStayed === true && playerScore > dealerScore) {
      while (dealerScore < playerScore) {
        addImageToDiv(dealerDiv, game.DealerHit())
        dealerScore = game.dealerCards.getHighestScore()
      }
    }

    else if (mustHitToWin || lowChanceToLose) {
      addImageToDiv(dealerDiv, game.DealerHit())
    }
    else { game.DealerStay() }

  }
  updateScores()
  checkForEndOfGame()
}*/
//# sourceMappingURL=Main.js.map