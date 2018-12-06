import {Game}       from "../Models/Game"
import {Hand}       from "../Models/Hand"
import {Controller} from "./Controller"
import * as html    from "./HTMLElements"
import {Card}       from "TypeScript/Models/Card"

export class HtmlHand {
    mainDiv: HTMLElement
    imageDiv: HTMLElement
    scoreDiv: HTMLElement
    buttonDiv: HTMLElement
    betDiv: HTMLElement
    insuranceDiv: HTMLElement
    winningsDiv: HTMLElement

    winnerText: string

    hitButton: HTMLInputElement
    stayButton: HTMLInputElement
    splitButton: HTMLInputElement
    insuranceButton: HTMLInputElement
    doubleDownButton: HTMLInputElement
    surrenderButton: HTMLInputElement

    betSpan: HTMLElement
    betAmount: HTMLElement
    winningsText: HTMLElement
    winningsAmount: HTMLElement


    game: Game
    hand: Hand


    constructor (public index: number, public controller: Controller, public parent: HTMLElement, public isPlayer: boolean) {
        this.game = controller.game

        if (isPlayer)
            this.hand = this.game.playerCards[index]
        else
            this.hand = this.game.dealerCards

        this.manageDivs()
        parent.appendChild(this.mainDiv)

        this.winnerText = ""

        if (isPlayer) {
            this.hand = this.game.playerCards[index]
            this.createButtons()
        }
        else
            this.hand = this.game.dealerCards


    }

    private manageDivs () {
        this.mainDiv = document.createElement("div")
        this.imageDiv = document.createElement("div")
        this.scoreDiv = document.createElement("div")
        this.buttonDiv = document.createElement("div")
        this.betDiv = document.createElement("div")
        this.insuranceDiv = document.createElement("div")
        this.winningsDiv = document.createElement("div")

        this.mainDiv.appendChild(this.imageDiv)
        this.mainDiv.appendChild(this.scoreDiv)
        this.mainDiv.appendChild(this.betDiv)
        this.mainDiv.appendChild(this.insuranceDiv)
        this.mainDiv.appendChild(this.winningsDiv)
        this.mainDiv.appendChild(this.buttonDiv)
        this.mainDiv.appendChild(document.createElement("br"))


        if (this.isPlayer) {
            this.betSpan = document.createElement("span")
            this.betSpan.innerText = "Current Bet: "
            this.betAmount = document.createElement("span")
            this.betAmount.innerText = this.hand.bet.toString()

            this.betDiv.appendChild(this.betSpan)
            this.betDiv.appendChild(this.betAmount)

            this.winningsText = document.createElement("div")
            this.winningsAmount = document.createElement("div")

            this.winningsDiv.appendChild(this.winningsText)
            this.winningsDiv.appendChild(this.winningsAmount)

        }
    }


    private createButtons () {

        // create button objects
        this.hitButton = html.createButton("Hit")
        this.stayButton = html.createButton("Stay")
        this.splitButton = html.createButton("Split")
        this.insuranceButton = html.createButton("Insurance")
        this.doubleDownButton = html.createButton("Double Down")
        this.surrenderButton = html.createButton("Surrender")

        //append buttons to buttonDiv
        this.buttonDiv.appendChild(this.hitButton)
        this.buttonDiv.appendChild(this.stayButton)
        this.buttonDiv.appendChild(this.splitButton)
        this.buttonDiv.appendChild(this.insuranceButton)
        this.buttonDiv.appendChild(this.doubleDownButton)
        this.buttonDiv.appendChild(this.surrenderButton)


        //add button listeners
        this.hitButton.addEventListener("click", (event) => this.hit())
        this.stayButton.addEventListener("click", (event) => this.stay())
        this.splitButton.addEventListener("click", (event) => this.split())
        this.insuranceButton.addEventListener("click", (event) => this.insurance())
        this.doubleDownButton.addEventListener("click", (event) => this.doubleDown())
        this.surrenderButton.addEventListener("click", (event) => this.surrender())

    }


    showAvailableButtons () {
        if (this.isPlayer) {
            this.buttonDisplay(this.hitButton, this.hand.checkHit())
            this.buttonDisplay(this.stayButton, this.hand.checkStay())
            this.buttonDisplay(this.splitButton, this.hand.checkSplit(this.controller.playerHands.length, this.game.score))
            this.buttonDisplay(this.insuranceButton, this.hand.checkInsurance(this.game.dealerCards, this.game.score))
            this.buttonDisplay(this.doubleDownButton, this.hand.checkDoubleDown(this.game.score))
            this.buttonDisplay(this.surrenderButton, this.hand.checkSurrender(this.game.score))
        }
    }

    buttonDisplay (button: HTMLInputElement, show: boolean) {
        if (show)
            button.style.display = "inline"
        else
            button.style.display = "none"
    }

    private updateScore () {
        if (this.isPlayer)
            this.scoreDiv.innerText = `Hand Score: ${this.hand.getScoreText()}`
        else
            this.scoreDiv.innerText = `Dealer Score: ${this.hand.getScoreText()}`

        this.scoreDiv.style.backgroundColor = "rgba(0, 250, 250, 0.0);"
    }

    public updateHand () {
        this.updateScore()

        if (this.hand.checkBlackjack()) {
            this.hand.stayed = true
            this.scoreDiv.innerText = `Hand Score: Blackjack`
        }

        else if (this.hand.check21()) {
            this.hand.stayed = true
            this.scoreDiv.innerText = `Hand Score: 21`
        }
        else if (this.hand.checkBust()) {
            this.hand.stayed = true
            this.scoreDiv.innerText = `Hand Score: Bust (${this.hand.getScoreText()})`
            console.log(`Bust Score: ${this.hand.getScoreText()}`)
        }

        this.showAvailableButtons()

        if (this.game.checkEndoPlayerTurn() && this.isPlayer) {
            this.controller.dealerTurn()
        }

    }


    hit (card?: Card) {

        if (card == undefined) {
            html.addImageToDiv(this.imageDiv, this.game.hit(this.hand))
        }
        else {
            html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card))
        }
        this.updateHand()
    }


    initialHit (card?: Card) {
        if (card == undefined) {
            html.addImageToDiv(this.imageDiv, this.game.hit(this.hand))
        }
        else {
            html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card))
        }
    }

    stay () {
        this.hand.stayed = true
        this.updateHand()
    }

    split () {
        this.game.splitPlayerHand(this.index)
        let newIndex = this.controller.playerHands.length
        let newHtmlHand = new HtmlHand(newIndex, this.controller, html.playerDiv, true)

        html.redrawImageDiv(this.imageDiv, this)
        html.redrawImageDiv(newHtmlHand.imageDiv, newHtmlHand)
        this.controller.playerHands.push(newHtmlHand)

        for (let hand of this.controller.playerHands) {
            hand.updateHand()
        }
        this.controller.updateCurrentScore()
    }

    insurance () {
        this.game.insureHand(this.index)

        this.insuranceDiv.innerText = `Insurance: ${this.hand.insurance}`
        this.controller.updateCurrentScore()
        this.updateHand()
    }

    doubleDown () {
        this.game.doubleDown(this.index)
        this.betAmount.innerText = this.hand.bet.toString()
        html.redrawImageDiv(this.imageDiv, this)
        this.updateHand()
    }

    surrender () {
        this.game.surrender(this.index)
        this.updateHand()
    }

    clear () {
        html.removeDataFromDiv(this.mainDiv)
    }


}
