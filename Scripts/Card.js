define(["require", "exports"], function (require, exports) {
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
    exports.cardTypesArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    exports.cardSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const cardTypesMap = new Map()
        .set('2', 2)
        .set('3', 3)
        .set('4', 4)
        .set('5', 5)
        .set('6', 6)
        .set('7', 7)
        .set('8', 8)
        .set('9', 9)
        .set('10', 10)
        .set('Jack', 10)
        .set('Queen', 10)
        .set('King', 10)
        .set('Ace', 1);
    class Card {
        constructor(type, suit) {
            this.type = type;
            this.suit = suit;
            this.imageSrc = `Images/${type.toLowerCase()}_of_${suit.toLowerCase()}.png`;
            console.log(this.imageSrc);
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
//# sourceMappingURL=Card.js.map