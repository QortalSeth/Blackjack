import {Game}     from "../Models/Game"
import * as html  from "./HTMLElements"
import {HtmlHand} from "./HtmlHand"
import {Card}     from "../Models/Card"

export class Controller {
    game: Game
    debug = false
    dealerHand: HtmlHand
    playerHand: HtmlHand[]
    startMoney = 10000

    constructor (public currentScore) {
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
            this.dealerHand.hit(new Card("8", "Diamonds"))
            this.playerHand[0].initialHit(new Card("Ace", "Hearts"))
            this.playerHand[0].hit(new Card("Ace", "Clubs"))
        }

        else {
            this.dealerHand.hit()
            this.playerHand[0].initialHit()
            this.playerHand[0].hit()
        }
    }


    resetGameHtmlData () {
        html.removeDataFromDiv(html.dealerDiv)
        html.removeDataFromDiv(html.playerDiv)
        this.betDisplay(false)
        this.dealerHand = new HtmlHand(0, this.game, html.dealerDiv, false)
        this.playerHand = []
        this.playerHand.push(new HtmlHand(0, this.game, html.playerDiv, true))

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
}
