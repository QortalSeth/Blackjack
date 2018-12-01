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

    winnerText: string

    hitButton: HTMLInputElement
    stayButton: HTMLInputElement
    splitButton: HTMLInputElement
    insuranceButton: HTMLInputElement
    doubleDownButton: HTMLInputElement
    surrenderButton: HTMLInputElement

    hand: Hand


    constructor (public index: number, public game: Game, public parent: HTMLElement, public isPlayer: boolean) {
        this.mainDiv = document.createElement("div")
        this.imageDiv = document.createElement("div")
        this.scoreDiv = document.createElement("div")
        this.buttonDiv = document.createElement("div")

        this.mainDiv.appendChild(this.imageDiv)
        this.mainDiv.appendChild(this.scoreDiv)
        this.mainDiv.appendChild(this.buttonDiv)

        this.winnerText = ""

        if (isPlayer) {
            this.hand = game.playerCards[index]
            this.createButtons()
        }
        else
            this.hand = game.dealerCards

        parent.appendChild(this.mainDiv)
    }


    createButtons () {

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
            this.buttonDisplay(this.splitButton, this.hand.checkSplit())
            this.buttonDisplay(this.insuranceButton, this.game.dealerCards.checkInsurance())
            this.buttonDisplay(this.doubleDownButton, this.hand.checkDoubleDown())
            this.buttonDisplay(this.surrenderButton, this.hand.checkSurrender())
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
    }

    public updateHand () {
        this.showAvailableButtons()
        this.updateScore()
    }

    checkEndofTurn () {

    }


    hit (card?: Card) {

        if (card == undefined) {
            html.addImageToDiv(this.imageDiv, this.game.hit(this.hand))
        }
        else {
            html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card))
        }
        this.updateHand()
        if (this.hand.checkBlackjack()) {
            this.stay()
            this.scoreDiv.innerText = `Hand Score: Blackjack`
        }

        else if (this.hand.checkBust()) {
            this.stay();
            this.scoreDiv.innerText = `Hand Score: Bust`
        }


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
    }

    insurance () {
    }

    doubleDown () {
    }

    surrender () {
    }


    /*
    checkForEndOfGame() {

      this.game.checkWinner()
      if (this.game.gameOver) {

        // display winning text reset buttons
        this.html.winnerText.innerText = this.game.winningText
        if (this.game.winnerIsPlayer)
          this.html.winnerText.style.color = 'blue'

        else
          this.html.winnerText.style.color = 'red'

        this.html.startGameButton.style.display = 'inline'
        this.html.hitButton.style.display = 'none'
        this.html.stayButton.style.display = 'none'
      }



    }
  */


}
