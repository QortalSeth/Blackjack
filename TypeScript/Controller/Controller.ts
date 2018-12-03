import {Game}     from "../Models/Game"
import * as html  from "./HTMLElements"
import {HtmlHand} from "./HtmlHand"
import {Card}     from "../Models/Card"

export class Controller {
    game: Game
    debug = false
    dealerHand: HtmlHand
    playerHands: HtmlHand[]
    startMoney = 10000

    constructor (public currentScore: number) {
        html.startGameButton.addEventListener("click", (event) => this.startNewGame())
        html.betTextfield.addEventListener("keyup", (event) => this.betTextFieldListener())
        html.scoreAmount.innerText = this.startMoney.toString()
    }


    startNewGame () {
        this.game = new Game(this.currentScore, Math.floor(parseInt(html.betTextfield.value)))
        this.resetGameHtmlData()
        this.updateCurrentScore()

        if (this.debug)
            html.testDiv.innerText = this.game.deck.toString()

        this.initialHits(true)
        html.startGameButton.style.display = "none"
        html.betSpan.style.display = "none"
        html.betTextfield.style.display = "none"


    }

    initialHits (debug: boolean) {
        if (debug) {
            //this.testAceBust()
            //this.testDoubleDown()
            //this.test21()
            this.testInsurance()
        }

        this.dealerHand.hit()
        this.playerHands[0].initialHit()
        this.playerHands[0].hit()

    }

    testInsurance () {
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

    testDoubleDown () {
        this.game.deck.addCard("6", "Hearts")
        this.game.deck.addCard("5", "Hearts")
        this.game.deck.addCard("8", "Hearts")
    }

    testAceBust () {
        this.game.deck.addCard("Ace", "Hearts")
        this.game.deck.addCard("King", "Hearts")

        this.game.deck.addCard("Ace", "Clubs")
        this.game.deck.addCard("8", "Diamonds")
    }

    testMaxSplits () {
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

    test21 () {
        this.game.deck.addCard("4", "Spades")
        this.game.deck.addCard("5", "Diamonds")
        this.game.deck.addCard("10", "Hearts")
        this.game.deck.addCard("Ace", "Hearts")
        this.game.deck.addCard("Ace", "Clubs")
        this.game.deck.addCard("8", "Diamonds")
    }


    resetGameHtmlData () {
        html.removeDataFromDiv(html.dealerDiv)
        html.removeDataFromDiv(html.playerDiv)
        this.betDisplay(false)
        this.dealerHand = new HtmlHand(0, this, html.dealerDiv, false)
        this.playerHands = []
        this.playerHands.push(new HtmlHand(0, this, html.playerDiv, true))

    }

    updateCurrentScore () {
        html.scoreAmount.innerText = this.game.score.toString()
    }

    betDisplay (display: boolean) {
        if (display) {
            html.betSpan.style.display = "inline"
            html.betTextfield.style.display = "inline"
        }
        else {
            html.betSpan.style.display = "none"
            html.betTextfield.style.display = "none"
        }
    }

    betTextFieldListener () {
        let textField = html.betTextfield
        let number = parseInt(textField.value)
        if (isNaN(number) || number < 20) {
            html.startGameButton.disabled = true
        }
        else
            html.startGameButton.disabled = false
    }

    dealerTurn () {
        this.game.dealerTurn()



    }

}
