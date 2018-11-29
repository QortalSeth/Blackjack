define(["require", "exports", "./Hand", "./Deck"], function (require, exports, Hand_1, Deck_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(startMoney, bet) {
            this.numberOfDecks = 3;
            this.dealerCards = new Hand_1.Hand(0);
            this.playerCards = [];
            this.playerCards.push(new Hand_1.Hand(0));
            this.money = startMoney;
            this.playerCards.push(new Hand_1.Hand(this.applyBet(bet)));
            this.deck = new Deck_1.Deck(this.numberOfDecks);
        }
        applyBet(bet) {
            this.money -= bet;
            return bet;
        }
        /*
        // TODO:
        change checkWinner to only be called after dealerTurn. make it generate a list of win/lose statements for each hand
        move playerWins and dealerWins to Hand class
        */
        hit(hand) {
            let card = hand.addCardFromDeck(this.deck);
            return card;
        }
        playerStay(handIndex) {
            this.playerCards[handIndex].stayed = true;
        }
        checkWinner() {
            for (let hand of this.playerCards) {
                let winnings = hand.decideWinner(this.dealerCards);
                this.money += winnings;
            }
        }
        DealerTurn() {
            while (Math.floor(this.dealerCards.getLowestScore()) < 17)
                this.hit(this.dealerCards);
            this.checkWinner();
        }
        splitPlayerHand(handIndex) {
            let hand = this.playerCards[handIndex];
            let newHand = new Hand_1.Hand(this.applyBet(hand.bet));
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
        insureHand(handIndex, insureAmount) {
            let hand = this.playerCards[handIndex];
            insureAmount = Math.max(insureAmount, hand.bet / 2);
            hand.insurance = insureAmount;
            this.money -= insureAmount;
        }
    }
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map