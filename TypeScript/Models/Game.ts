import {Hand} from "./Hand"
import {Deck} from "./Deck"
import {Card} from "./Card"

export class Game {
    dealerCards: Hand
    playerCards: Hand[]
    deck: Deck
    numberOfDecks = 3
    highScore: number


    constructor (public score: number, bet: number) {
        this.dealerCards = new Hand(0, 0)
        this.playerCards = []
        this.playerCards.push(new Hand(this.applyBet(bet), 0))
        this.deck = new Deck(this.numberOfDecks)
    }

    applyBet (bet: number) {
        this.score -= bet
        return bet
    }

    /*
    // TODO:
    change checkWinner to only be called after dealerTurn. make it generate a list of win/lose statements for each hand
    move playerWins and dealerWins to Hand class
    */

    hit (hand: Hand, card?: Card): Card {

        if (card == undefined) {
            card = hand.addCardFromDeck(this.deck)
        }

        else hand.addCardFromCard(card)

        return card
    }


    playerStay (handIndex: number) {
        this.playerCards[handIndex].stayed = true
    }


    checkWinner () {

        for (let hand of this.playerCards) {
            let winnings = hand.decideWinner(this.dealerCards)
            this.score += winnings
        }
    }


    DealerTurn () {
        while (Math.floor(this.dealerCards.getLowestScore()) < 17)
            this.hit(this.dealerCards)
        this.checkWinner()
    }

    splitPlayerHand (handIndex: number) {
        let hand = this.playerCards[handIndex]
        let newHand = new Hand(this.applyBet(hand.bet), hand.index + 1)

        newHand.addCardFromCard(hand.cards.pop())
        this.hit(hand)
        this.hit(newHand)
        this.playerCards.push(newHand)
    }

    doubleDown (handIndex: number) {
        let hand = this.playerCards[handIndex]
        hand.bet += this.applyBet(hand.bet)
        this.hit(hand)
        this.playerStay(handIndex)
    }

    surrender (handIndex: number) {
        let hand = this.playerCards[handIndex]
        hand.surrender = true
        this.playerStay(handIndex)
    }

    insureHand (handIndex: number, insureAmount: number) {
        let hand = this.playerCards[handIndex]
        insureAmount = Math.max(insureAmount, hand.bet / 2)
        hand.insurance = insureAmount
        this.score -= insureAmount
    }

}
