import {Deck} from "./Deck"
import {Card} from "./Card"

export class Hand {
    cards: Card[]
    score: number[]
    stayed: boolean
    winningText: string
    surrender: boolean
    insurance: number
    winnings: number


    constructor (public bet: number, public index: number) {
        this.cards = []
        this.score = []
        this.stayed = false
        this.surrender = false
        this.insurance = 0
    }

    addCardFromDeck (deck: Deck): Card {
        let cardToAdd = deck.cards.pop()
        this.cards.push(cardToAdd)
        this.calculateScore()
        return cardToAdd
    }

    addCardFromCard (cardToAdd: Card): Card {
        this.cards.push(cardToAdd)
        this.calculateScore()
        return cardToAdd
    }

    private calculateScore () {
        this.score = []
        let baseScore = 0
        let aces = 0
        for (let card of this.cards) {
            baseScore += card.getScore()
            if (card.type === "Ace") {
                aces++
            }
        }

        this.score.push(baseScore)
        while (aces-- > 0) {
            baseScore += 10
            if (baseScore <= 21) {
                this.score.push(baseScore)
            }

        }
    }

    getScoreText () {
        if (this.score.length > 0) {
            let text = `${this.score[0]}`
            for (let i = 1; i < this.score.length; i++) {
                text += ` or ${this.score[i]}`
            }
            return text
        }
        else return "0"
    }

    getHighestScore (): number {
        if (this.score.length > 0) {

            let max = this.score[0]

            for (let score of this.score) {
                max = Math.max(max, score)
            }
            return max
        }
        return 0
    }

    getLowestScore (): number {
        if (this.score.length > 0) {
            let min = this.score[0]

            for (let score of this.score) {
                min = Math.min(min, score)
            }
            return min;
        }
        return 0
    }


    checkBlackjack (): boolean {
        let scoreCheck = this.getHighestScore() === 21
        let cardCountCheck = this.cards.length === 2

        return scoreCheck && cardCountCheck
    }

    check21 (): boolean {
        for (let score of this.score) {
            if (score === 21) {
                return true
            }
        }
        return false
    }

    checkBust (): boolean {
        return this.getLowestScore() > 21
    }


    checkDoubleDown (): boolean {
        let scoreCheck = this.getHighestScore() < 11
        let cardCountCheck = this.cards.length <= 2

        return scoreCheck && cardCountCheck && this.checkStay()
    }

    checkHit () {
        return this.getLowestScore() <= 21 && this.checkStay()
    }

    checkStay () {
        return !this.stayed
    }

    checkInsurance (dealerCards: Hand): boolean {
        return dealerCards.cards[0].type === "Ace" && this.checkStay() && this.insurance === 0 && this.getHighestScore() < 21
    }

    checkSplit (handsNum: number): boolean {
        let cardTypeCheck = this.cards[0].getScore() === this.cards[1].getScore()
        let cardCountCheck = this.cards.length === 2
        let handCountCheck = handsNum < 4
        return cardTypeCheck && cardCountCheck && handCountCheck && this.checkStay()
    }

    checkSurrender (): boolean {
        return this.cards.length === 2 && this.checkStay()
    }

    checkTurnOver (): boolean {
        return this.checkBust() || this.checkStay()
    }

    decideWinner (dealerHand: Hand) {
        let dealerScore = dealerHand.getHighestScore()
        let playerScore = this.getHighestScore()

        if (this.surrender === true) {
            this.winningText = "Surrendered"
            this.winnings = this.bet / 2
        }

        else if (this.checkBlackjack() === true && dealerHand.checkBlackjack() === false) {
            this.winningText = "Player Wins by Blackjack :D"
            this.winnings = this.bet * 3 / 2 + this.bet
        }

        else if (dealerHand.checkBlackjack() === true) {
            this.winningText = "Dealer Wins by Blackjack :("
            this.winnings = this.insurance * 2
        }

        else if (playerScore > 21) {
            this.winningText = "Dealer Wins"
            this.winnings = 0
        }

        else if (dealerScore > 21) {
            this.winningText = "Player Wins"
            this.winnings = this.bet * 2
        }

        else if (dealerScore > playerScore) {
            this.winningText = "Dealer Wins"
            this.winnings = 0
        }

        else if (dealerScore === playerScore) {
            this.winningText = "We'll call it a draw @_@"
            this.winnings = this.bet
        }
        else if (dealerScore < playerScore) {
            this.winningText = "Player Wins"
            this.winnings = this.bet * 2
        }
    }

}
