
import { Hand } from './Hand'
import { Deck } from './Deck'
import { Card } from './Card'

export class Game {
  dealerCards: Hand
  playerCards: Hand[]
  deck: Deck
  numberOfDecks = 3

  money: number
  highScore: number


  constructor(startMoney: number, bet: number) {
    this.dealerCards = new Hand(0)
    this.playerCards = []
    this.playerCards.push(new Hand(0))
    this.money = startMoney
    this.playerCards.push(new Hand(this.applyBet(bet)))
    this.deck = new Deck(this.numberOfDecks)

  }

  applyBet(bet: number) {
    this.money -= bet
    return bet
  }
  /*
  // TODO:
  change checkWinner to only be called after dealerTurn. make it generate a list of win/lose statements for each hand
  move playerWins and dealerWins to Hand class
  */

  playerHit(handIndex: number): Card {
    let hand = this.playerCards[handIndex]
    let card = hand.addCardFromDeck(this.deck)
    return card
  }

  dealerHit(): Card {
    let card = this.dealerCards.addCardFromDeck(this.deck)
    return card
  }

  playerStay(handIndex: number) {
    this.playerCards[handIndex].stayed = true
  }


  checkWinner() {

    for (let hand of this.playerCards) {
      let winnings = hand.decideWinner(this.dealerCards)
      this.money += winnings
    }
  }


  DealerTurn() {
    while (Math.floor(this.dealerCards.getLowestScore()) < 17)
      this.dealerHit()

    this.checkWinner()
  }

  splitPlayerHand(handIndex: number) {
    let hand = this.playerCards[handIndex]
    let newHand = new Hand(this.applyBet(hand.bet))

    newHand.addCardFromCard(hand.cards.pop())
    this.playerHit(handIndex)
    this.playerCards.push(newHand)
    this.playerHit(this.playerCards.length - 1)
  }

  doubleDown(handIndex: number) {
    let hand = this.playerCards[handIndex]
    hand.bet += this.applyBet(hand.bet)
    this.playerHit(handIndex)
    this.playerStay(handIndex)
  }

  surrender(handIndex: number) {
    let hand = this.playerCards[handIndex]
    hand.surrender = true
    this.playerStay(handIndex)
  }

  insureHand(handIndex: number, insureAmount: number) {
    let hand = this.playerCards[handIndex]
    insureAmount = Math.max(insureAmount, hand.bet / 2)
    hand.insurance = insureAmount
    this.money -= insureAmount
  }

}
