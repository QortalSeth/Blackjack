define(["require", "exports", "./Hand", "./Deck"], function (require, exports, Hand_1, Deck_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(score, bet) {
            this.score = score;
            this.numberOfDecks = 3;
            this.dealerCards = new Hand_1.Hand(0, 0);
            this.playerCards = [];
            this.playerCards.push(new Hand_1.Hand(this.applyBet(bet), 0));
            this.deck = new Deck_1.Deck(this.numberOfDecks);
        }
        applyBet(bet) {
            this.score -= bet;
            return bet;
        }
        /*
        // TODO:
        change checkWinner to only be called after dealerTurn. make it generate a list of win/lose statements for each hand
        move playerWins and dealerWins to Hand class
        */
        hit(hand, card) {
            if (card == undefined) {
                card = hand.addCardFromDeck(this.deck);
            }
            else
                hand.addCardFromCard(card);
            return card;
        }
        playerStay(handIndex) {
            this.playerCards[handIndex].stayed = true;
        }
        checkWinner() {
            for (let hand of this.playerCards) {
                hand.decideWinner(this.dealerCards);
                this.score += hand.winnings;
            }
        }
        checkEndoPlayerTurn() {
            for (let hand of this.playerCards) {
                if (hand.stayed === false) {
                    return false;
                }
            }
            return true;
        }
        dealerTurn() {
            while (Math.floor(this.dealerCards.getLowestScore()) < 17)
                this.hit(this.dealerCards);
            this.checkWinner();
        }
        splitPlayerHand(handIndex) {
            let hand = this.playerCards[handIndex];
            let newHand = new Hand_1.Hand(this.applyBet(hand.bet), this.playerCards.length);
            newHand.addCardFromCard(hand.cards.pop());
            this.hit(hand);
            this.hit(newHand);
            this.playerCards.push(newHand);
        }
        doubleDown(handIndex) {
            let hand = this.playerCards[handIndex];
            hand.bet += this.applyBet(hand.bet);
            this.hit(hand);
            this.playerStay(handIndex);
        }
        surrender(handIndex) {
            let hand = this.playerCards[handIndex];
            hand.surrender = true;
            this.playerStay(handIndex);
        }
        insureHand(handIndex) {
            let hand = this.playerCards[handIndex];
            let insureAmount = hand.bet / 2;
            hand.insurance = insureAmount;
            this.score -= insureAmount;
        }
    }
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map