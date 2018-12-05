// Deck: Card[], shuffle(), createDeck(), swapIndex(), displayDeck(), UpdateScores()

import {cardTypesArray, Card, cardSuits} from "./Card"

export class Deck {
    cards: Card[];


    constructor (numberOfDecks: number) {
        this.cards = []

        for (let i = 0; i < numberOfDecks; i++) {
            for (let typeIndex = 0; typeIndex < cardTypesArray.length; typeIndex++) {
                for (let suitIndex = 0; suitIndex < cardSuits.length; suitIndex++) {
                    this.cards.push(new Card(cardTypesArray[typeIndex], cardSuits[suitIndex]))
                }
            }
        }
    }

    addCard (type: string, suit: string) {
        this.cards.push(new Card(type, suit))
    }

    shuffle (): void {
        let timesToShuffle = this.getRandomInt(1, 5)

        for (let j = 0; j < timesToShuffle; j++) {
            for (let i = 0; i < this.cards.length; i++) {
                this.swapIndex(i, this.getRandomInt(0, this.cards.length))
            }

        }
    }

    private swapIndex (index: number, index2: number): void {
        let temp = this.cards[index]
        this.cards[index] = this.cards[index2]
        this.cards[index2] = temp
    }

    private getRandomInt (min: number, max: number): number {
        return Math.floor(Math.random() * max) + min
    }

    toString (): string {
        let returnValue = "";
        for (let card of this.cards) {
            returnValue += card.toString() + "\n";
        }
        return returnValue
    }

    isEmpty (): boolean {
        return this.cards.length === 0
    }

    printDeck () {
        console.log(this.toString)
    }

}
