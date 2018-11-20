import { Game } from '../Models/Game'
import { Card } from '../Models/Card'
import { Hand } from '../Models/Hand'
import * as dealerFunctions from './DealerFunctions'
import * as html from './HTMLElements'
import * as playerFunctions from './PlayerFunctions'
import { HtmlHand } from './HtmlHand'

export class Controller {
  game: Game
  debug = false
  startMoney = 10000
  dealerHand: HtmlHand
  playerHand: HtmlHand[]

  startNewGame() {
    this.game = new Game(this.startMoney, Math.floor(parseInt(html.betTextfield.innerText)))

    html.removeDataFromDiv(html.dealerDiv)
    html.removeDataFromDiv(html.playerDiv)
    playerFunctions.disableBetTextField
    this.dealerHand = new HtmlHand(0, this.game, html.dealerDiv, false)
    this.playerHand.push(new HtmlHand(0, this.game, html.playerDiv, true))


    if (this.debug)
      html.testDiv.innerText = this.game.deck.toString()

    this.playerHit(0)
    this.playerHit(0)
    this.dealerHit()

  }


  playerHit(handIndex: number) {
    html.addImageToDiv(html.playerDiv, this.game.playerHit(handIndex))
    this.checkForEndOfGame()
  }

  dealerHit() {
    html.addImageToDiv(html.dealerDiv, this.game.dealerHit())
  }




















}
