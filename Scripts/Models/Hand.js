define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hand {
        constructor(bet) {
            this.bet = bet;
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
                return '0';
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
        checkDoubleDown() {
            let scoreCheck = this.getHighestScore() < 11;
            let cardCountCheck = this.cards.length <= 2;
            return scoreCheck && cardCountCheck;
        }
        checkSplit() {
            let scoreCheck = this.getHighestScore() < 11;
            let cardCountCheck = this.cards.length === 2;
            return scoreCheck && cardCountCheck;
        }
        checkHit() { return this.getLowestScore() <= 21 && this.stayed === false; }
        checkStay() { return this.stayed; }
        checkInsurance() {
            return this.cards[0].type === 'Ace';
        }
        checkBlackjack() {
            let scoreCheck = this.getHighestScore() === 21;
            let cardCountCheck = this.cards.length === 2;
            return scoreCheck && cardCountCheck;
        }
        checkSurrender() {
            return this.cards.length === 2;
        }
        decideWinner(dealerHand) {
            let dealerScore = dealerHand.getHighestScore();
            let playerScore = this.getHighestScore();
            if (this.surrender === true) {
                this.winningText = "Surrendered";
                return this.bet / 2;
            }
            if (this.checkBlackjack() === true) {
                this.winningText = "Player Wins by Blackjack :D";
                return this.bet * 3 / 2 + this.bet;
            }
            if (dealerHand.checkBlackjack() === true) {
                this.winningText = "Dealer Wins by Blackjack :(";
                return this.insurance * 2;
            }
            if (playerScore > 21) {
                this.winningText = "Dealer Wins";
                return 0;
            }
            if (dealerScore > 21) {
                this.winningText = "Player Wins";
                return this.bet * 2;
            }
            if (dealerScore > playerScore) {
                this.winningText = "Dealer Wins";
                return 0;
            }
            if (dealerScore === playerScore) {
                this.winningText = "Well call it a draw @_@";
                return this.bet;
            }
            if (dealerScore < playerScore) {
                this.winningText = "Player Wins";
                return this.bet * 2;
            }
        }
    }
    exports.Hand = Hand;
});
//# sourceMappingURL=Hand.js.map