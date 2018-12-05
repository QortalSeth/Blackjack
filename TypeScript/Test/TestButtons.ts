import {Controller} from "TypeScript/Controller/Controller"

/*
Cards are loaded in reverse order
The format of the added cards is the following:

Dealer final cards

player cards

dealer first card
 */

export function testInsurance (this: Controller) {

    //     this.game.deck.addCard("Ace", "Clubs")
    //     this.game.deck.addCard("Queen", "Hearts")
    this.game.deck.addCard("Ace", "Hearts")

    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("9", "Spades")
    this.game.deck.addCard("Ace", "Spades")
    this.game.deck.addCard("Ace", "Diamonds")
    this.game.deck.addCard("Ace", "Hearts")
    this.game.deck.addCard("Ace", "Hearts")
    this.game.deck.addCard("Ace", "Clubs")
    this.game.deck.addCard("Ace", "Diamonds")

}

export function testDoubleDown (this: Controller) {
    this.game.deck.addCard("6", "Hearts")
    this.game.deck.addCard("5", "Hearts")
    this.game.deck.addCard("8", "Hearts")
}

export function testAceBust (this: Controller) {
    this.game.deck.addCard("Ace", "Hearts")
    this.game.deck.addCard("King", "Hearts")

    this.game.deck.addCard("Ace", "Clubs")
    this.game.deck.addCard("8", "Diamonds")
}

export function testMaxSplits (this: Controller) {
    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("King", "Spades")
    this.game.deck.addCard("9", "Spades")
    this.game.deck.addCard("Ace", "Spades")
    this.game.deck.addCard("Ace", "Diamonds")
    this.game.deck.addCard("Ace", "Hearts")
    this.game.deck.addCard("Ace", "Hearts")
    this.game.deck.addCard("Ace", "Clubs")
    this.game.deck.addCard("8", "Diamonds")
}

export function test21 (this: Controller) {
    this.game.deck.addCard("4", "Spades")
    this.game.deck.addCard("5", "Diamonds")
    this.game.deck.addCard("10", "Hearts")
    this.game.deck.addCard("Ace", "Hearts")
    this.game.deck.addCard("Ace", "Clubs")
    this.game.deck.addCard("8", "Diamonds")
}
