import {Game}         from "../Models/Game"
import * as html      from "./HTMLElements"
import {HtmlHand}     from "./HtmlHand"
import * as listeners from "./ButtonListeners"

export class Controller {
    game: Game
    debug = false
    dealerHand: HtmlHand
    playerHand: HtmlHand[]
    startMoney = 10000

    constructor (public currentScore) {
        html.startGameButton.addEventListener("click", listeners.startGameListener.bind(this))
        html.betTextfield.addEventListener("keyup", listeners.betTextFieldListener.bind(this))
        html.scoreAmount.innerText = this.startMoney.toString()
    }


    startNewGame () {
        this.game = new Game(this.currentScore, Math.floor(parseInt(html.betTextfield.innerText)))
        this.resetGameHtmlData()
        this.updateCurrentScore()

        if (this.debug)
            html.testDiv.innerText = this.game.deck.toString()
        this.playerHand[0].hit()
        this.playerHand[0].hit()
        this.dealerHand.hit()
        html.startGameButton.style.display = "none"
        html.betSpan.style.display = "none"
        html.betTextfield.style.display = "none"


    }

    /*
      playerHit(handIndex: number) {
        html.addImageToDiv(html.playerDiv, this.game.playerHit(handIndex))
        this.checkForEndOfGame()
      }
    */


    resetGameHtmlData () {
        html.removeDataFromDiv(html.dealerDiv)
        html.removeDataFromDiv(html.playerDiv)
        this.betDisplay(false)
        this.dealerHand = new HtmlHand(0, this.game, html.dealerDiv, false)
        this.playerHand = []
        this.playerHand.push(new HtmlHand(0, this.game, html.playerDiv, true))

    }

    updateCurrentScore () {
        html.scoreAmount.innerText = this.game.money.toString()
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
}
