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
export const cardTypesArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
export const cardSuits = ["Clubs", "Diamonds", "Hearts", "Spades"]

const cardTypesMap = new Map<string, number>()
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
    .set("Ace", 1)

export class Card {


    imageSrc: string;

    constructor (public type: string, public suit: string) {
        this.imageSrc = `Images/${type.toLowerCase()}_of_${suit.toLowerCase()}.png`;
        //console.log(this.imageSrc)
    }

    getScore (): number {
        return cardTypesMap.get(this.type)
    }


    toString (): string {
        return `${this.type} of ${this.suit}`;
    }
}
