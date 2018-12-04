import {Controller} from "TypeScript/Controller/Controller"


/*
Cards are loaded in reverse order
The format of the added cards is the following:

Dealer final cards

player cards

dealer first card
 */


export function playerWinsByBlackjack (this: Controller) {
    this.game.deck.addCard("Jack", "Diamonds")
    this.game.deck.addCard("10", "Diamonds")

    this.game.deck.addCard("Queen", "Diamonds")
    this.game.deck.addCard("King", "Diamonds")
    this.game.deck.addCard("Ace", "Diamonds")
    this.game.deck.addCard("Ace", "Diamonds")

    this.game.deck.addCard("5", "Diamonds")
}

export function playerWinsByBlackjackAnd21 (this: Controller) {
    this.game.deck.addCard("Jack", "Diamonds")
    this.game.deck.addCard("10", "Diamonds")

    this.game.deck.addCard("5", "Diamonds")
    this.game.deck.addCard("5", "Diamonds")

    this.game.deck.addCard("King", "Diamonds")
    this.game.deck.addCard("Ace", "Diamonds")
    this.game.deck.addCard("Ace", "Diamonds")

    this.game.deck.addCard("5", "Diamonds")
}

export function playerWinsByBust (this: Controller) {
    this.game.deck.addCard("9", "Diamonds")
    this.game.deck.addCard("8", "Diamonds")

    this.game.deck.addCard("6", "Diamonds")
    this.game.deck.addCard("5", "Diamonds")
    this.game.deck.addCard("4", "Diamonds")
    this.game.deck.addCard("3", "Diamonds")
    this.game.deck.addCard("2", "Diamonds")

    this.game.deck.addCard("7", "Diamonds")
}

export function playerWinsByScore (this: Controller) {
    this.game.deck.addCard("4", "Diamonds")
    this.game.deck.addCard("8", "Diamonds")

    this.game.deck.addCard("6", "Diamonds")
    this.game.deck.addCard("5", "Diamonds")
    this.game.deck.addCard("4", "Diamonds")
    this.game.deck.addCard("3", "Diamonds")
    this.game.deck.addCard("2", "Diamonds")

    this.game.deck.addCard("7", "Diamonds")

}

export function playerWinsByDoubleDown (this: Controller) {

    this.game.deck.addCard("Queen", "Diamonds")
    this.game.deck.addCard("Jack", "Diamonds")
    this.game.deck.addCard("6", "Diamonds")
    this.game.deck.addCard("4", "Diamonds")

    this.game.deck.addCard("7", "Diamonds")
}

export function dealerWinsByBlackjack (this: Controller) {
    this.game.deck.addCard("King", "Diamonds")

    this.game.deck.addCard("5", "Diamonds")
    this.game.deck.addCard("6", "Diamonds")
    this.game.deck.addCard("10", "Diamonds")

    this.game.deck.addCard("Ace", "Diamonds")
}

export function everyoneHasBlackjack (this: Controller) {
    //decide whether player should be allowed to surrender after using insurance
}

export function dealerWinsByBust (this: Controller) {
}

export function dealerWinsByScore (this: Controller) {
    // split player hand into 4 hands, 1 21, 1 win, 1 bust, 1 lose
}

export function dealerWinsByDoubleDown (this: Controller) {
    //   ToDo
    this.game.deck.addCard("Queen", "Diamonds")
    this.game.deck.addCard("Jack", "Diamonds")
    this.game.deck.addCard("6", "Diamonds")
    this.game.deck.addCard("4", "Diamonds")

    this.game.deck.addCard("7", "Diamonds")
}

export function draw (this: Controller) {
}

export function draw21 (this: Controller) {
}