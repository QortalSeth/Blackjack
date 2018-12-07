define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hand {
        constructor(bet, index) {
            this.bet = bet;
            this.index = index;
            this.cards = [];
            this.score = [];
            this.stayed = false;
            this.surrender = false;
            this.insurance = 0;
        }
        addCardFromDeck(deck) {
            let cardToAdd = deck.cards.pop();
            this.cards.push(cardToAdd);
            this.calculateScore();
            return cardToAdd;
        }
        addCardFromCard(cardToAdd) {
            this.cards.push(cardToAdd);
            this.calculateScore();
            return cardToAdd;
        }
        calculateScore() {
            this.score = [];
            let baseScore = 0;
            let aces = 0;
            for (let card of this.cards) {
                baseScore += card.getScore();
                if (card.type === "Ace") {
                    aces++;
                }
            }
            this.score.push(baseScore);
            while (aces-- > 0) {
                baseScore += 10;
                if (baseScore <= 21) {
                    this.score.push(baseScore);
                }
            }
        }
        getScoreText() {
            if (this.score.length > 0) {
                let text = `${this.score[0]}`;
                for (let i = 1; i < this.score.length; i++) {
                    text += ` or ${this.score[i]}`;
                }
                return text;
            }
            else
                return "0";
        }
        getHighestScore() {
            if (this.score.length > 0) {
                let max = this.score[0];
                for (let score of this.score) {
                    max = Math.max(max, score);
                }
                return max;
            }
            return 0;
        }
        getLowestScore() {
            if (this.score.length > 0) {
                let min = this.score[0];
                for (let score of this.score) {
                    min = Math.min(min, score);
                }
                return min;
            }
            return 0;
        }
        checkBlackjack() {
            let scoreCheck = this.getHighestScore() === 21;
            let cardCountCheck = this.cards.length === 2;
            return scoreCheck && cardCountCheck;
        }
        check21() {
            for (let score of this.score) {
                if (score === 21) {
                    return true;
                }
            }
            return false;
        }
        checkBust() {
            return this.getLowestScore() > 21;
        }
        checkDoubleDown(currentScore) {
            let scoreCheck = this.getHighestScore() < 11;
            let cardCountCheck = this.cards.length <= 2;
            let playerCanPayForDoubleDown = currentScore >= this.bet;
            return scoreCheck && cardCountCheck && playerCanPayForDoubleDown && this.checkStay();
        }
        checkHit() {
            return this.getLowestScore() <= 21 && this.checkStay();
        }
        checkStay() {
            return !this.stayed;
        }
        checkInsurance(dealerCards, currentScore) {
            let dealerHasAce = dealerCards.cards[0].type === "Ace";
            let notAlreadyInsured = this.insurance === 0;
            let playerHasNoBlackjack = this.getHighestScore() < 21;
            let playerCanPayForInsurance = (currentScore - this.bet / 2) > 0;
            return dealerHasAce && this.checkStay() && notAlreadyInsured && playerHasNoBlackjack && playerCanPayForInsurance;
        }
        checkSplit(handsNum, currentScore) {
            let cardTypeCheck = this.cards[0].getScore() === this.cards[1].getScore();
            let cardCountCheck = this.cards.length === 2;
            let handCountCheck = handsNum < 4;
            let playerCanPayForSplit = currentScore >= this.bet;
            return cardTypeCheck && cardCountCheck && handCountCheck && playerCanPayForSplit && this.checkStay();
        }
        checkSurrender(currentScore) {
            let cardLengthCheck = this.cards.length === 2;
            let noInsuranceCheck = this.insurance === 0;
            let playerCanPayForSurrender = currentScore >= this.bet / 2;
            return cardLengthCheck && this.checkStay() && noInsuranceCheck && playerCanPayForSurrender;
        }
        checkTurnOver() {
            return this.checkBust() || this.checkStay();
        }
        decideWinner(dealerHand) {
            let dealerScore = dealerHand.getHighestScore();
            let playerScore = this.getHighestScore();
            if (this.surrender === true) {
                this.winningText = "Surrendered";
                this.winnings = this.bet / 2;
            }
            else if (this.checkBlackjack() === true && dealerHand.checkBlackjack() === false) {
                this.winningText = "Player Wins by Blackjack :D";
                this.winnings = this.bet * 3 / 2 + this.bet;
            }
            else if (dealerHand.checkBlackjack() === true) {
                this.winningText = "Dealer Wins by Blackjack :(";
                this.winnings = 0;
            }
            else if (playerScore > 21) {
                this.winningText = "Dealer Wins";
                this.winnings = 0;
            }
            else if (dealerScore > 21) {
                this.winningText = "Player Wins";
                this.winnings = this.bet * 2;
            }
            else if (dealerScore > playerScore) {
                this.winningText = "Dealer Wins";
                this.winnings = 0;
            }
            else if (dealerScore === playerScore) {
                this.winningText = "We'll call it a draw @_@";
                this.winnings = this.bet;
            }
            else if (dealerScore < playerScore) {
                this.winningText = "Player Wins";
                this.winnings = this.bet * 2;
            }
        }
    }
    exports.Hand = Hand;
});
//# sourceMappingURL=Hand.js.map