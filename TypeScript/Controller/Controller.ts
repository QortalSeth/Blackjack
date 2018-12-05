import {Game}           from "../Models/Game"
import * as html        from "./HTMLElements"
import {HtmlHand}       from "./HtmlHand"
import {Card}           from "../Models/Card"
import * as testButtons from "../Test/TestButtons"
import * as testWins    from "../Test/TestWins"
import {Deck}           from "../Models/Deck"

export class Controller {
    game: Game
    debug = true
    dealerHand: HtmlHand
    playerHands: HtmlHand[]
    startMoney = 10000
    private test: Function

    constructor (public currentScore: number) {
        html.startGameButton.addEventListener("click", (event) => this.startNewGame())
        html.betTextfield.addEventListener("keyup", (event) => this.betTextFieldListener())
        html.scoreAmount.innerText = this.startMoney.toString()
    }


    startNewGame () {
        this.game = new Game(this.currentScore, Math.floor(parseInt(html.betTextfield.value)))
        this.resetGameHtmlData()
        this.updateCurrentScore()

        if (this.debug) {
            //html.testDiv.innerText = this.game.deck.toString()
            //this.showDeck()
        }

        html.startGameButton.style.display = "none"
        this.betDisplay(false)
        this.initialHits()
    }

    initialHits () {
        if (this.debug) {
            //this.test = testButtons.testMaxSplits
            this.test = testWins.dealerWinsByBlackjack
            this.test()
        }

        this.dealerHand.hit()
        this.playerHands[0].initialHit()
        this.playerHands[0].hit()

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

        if (this.checkValidBet()) {
            html.startGameButton.disabled = false
        }
        else
            html.startGameButton.disabled = true
    }

    checkValidBet (): boolean {
        let number = parseInt(html.betTextfield.value)

        let isANumber = isNaN(number) === false
        let minCheck = number >= 20
        let maxCheck = number <= this.currentScore
        return isANumber && minCheck && maxCheck

    }

    dealerTurn () {
        this.game.dealerTurn()
        html.redrawImageDiv(this.dealerHand.imageDiv, this.dealerHand)
        this.dealerHand.updateHand()
        this.endGame()
    }

    endGame () {
        let totalWinnings = 0;
        for (let hand of this.playerHands) {
            let winnings = hand.hand.winnings - hand.hand.bet
            totalWinnings += winnings
            hand.winningsText.innerText = hand.hand.winningText

            let winningsText = ""
            if (winnings > 0)
                winningsText = `You gained: ${Math.abs(winnings)}`
            else if (winnings < 0)
                winningsText = `You lost: ${Math.abs(winnings)}`
            else {
                if (hand.hand.insurance > 0)
                    winningsText = `You lost: ${Math.abs(hand.hand.bet)}, but gained it back because of insurance`
                else {
                    winningsText = `You gained: ${Math.abs(winnings)}`
                }
            }
            hand.winningsAmount.innerText = winningsText
        }
        this.currentScore = this.game.score
        this.updateCurrentScore()
        html.startGameButton.style.display = "inline"
        this.betDisplay(true)
    }

    showDeck () {
        let deck = new Deck(1)

        while (deck.isEmpty() === false) {
            html.addImageToDiv(html.testDiv, deck.cards.pop())
        }

    }


}
