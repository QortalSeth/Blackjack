// Deck: Card[], shuffle(), createDeck(), swapIndex(), displayDeck(), UpdateScores()
define(["require", "exports", "./Card"], function (require, exports, Card_1) {
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
//# sourceMappingURL=Deck.js.map