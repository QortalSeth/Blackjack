define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    Cards are loaded in reverse order
    The format of the added cards is the following:
    
    Dealer final cards
    
    player cards
    
    dealer first card
     */
    function playerWinsByBlackjack() {
        this.game.deck.addCard("Jack", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("Queen", "Diamonds");
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
    }
    exports.playerWinsByBlackjack = playerWinsByBlackjack;
    function playerWinsByBlackjackAnd21() {
        this.game.deck.addCard("Jack", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
    }
    exports.playerWinsByBlackjackAnd21 = playerWinsByBlackjackAnd21;
    function playerWinsByBust() {
        this.game.deck.addCard("9", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("3", "Diamonds");
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.playerWinsByBust = playerWinsByBust;
    function playerWinsByScore() {
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("3", "Diamonds");
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.playerWinsByScore = playerWinsByScore;
    function playerWinsByDoubleDown() {
        this.game.deck.addCard("Queen", "Diamonds");
        this.game.deck.addCard("Jack", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.playerWinsByDoubleDown = playerWinsByDoubleDown;
    function dealerWinsByBlackjack() {
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
    }
    exports.dealerWinsByBlackjack = dealerWinsByBlackjack;
    function everyoneHasBlackjack() {
        this.game.deck.addCard("King", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Diamonds");
    }
    exports.everyoneHasBlackjack = everyoneHasBlackjack;
    function dealerWinsByBust() {
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
        this.game.deck.addCard("9", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.dealerWinsByBust = dealerWinsByBust;
    function dealerWinsByScore() {
        // split player hand into 4 hands, 1 21, 1 win, 1 bust, 1 lose
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("7", "Diamonds"); //3 (Hit)
        this.game.deck.addCard("3", "Diamonds"); //1 (Hit)
        this.game.deck.addCard("5", "Diamonds"); //4
        this.game.deck.addCard("8", "Diamonds"); //1
        this.game.deck.addCard("King", "Diamonds"); //3
        this.game.deck.addCard("Queen", "Diamonds"); //1=>4
        this.game.deck.addCard("Queen", "Diamonds"); //2
        this.game.deck.addCard("Jack", "Diamonds"); //1=>3
        this.game.deck.addCard("10", "Diamonds"); // 1=>2
        this.game.deck.addCard("10", "Diamonds"); // 1
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.dealerWinsByScore = dealerWinsByScore;
    function dealerWinsByDoubleDown() {
        this.game.deck.addCard("Queen", "Diamonds");
        this.game.deck.addCard("2", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.dealerWinsByDoubleDown = dealerWinsByDoubleDown;
    function draw() {
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("7", "Diamonds");
    }
    exports.draw = draw;
    function draw21() {
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("3", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
    }
    exports.draw21 = draw21;
    function everyoneBusts() {
        this.game.deck.addCard("9", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("6", "Diamonds");
        this.game.deck.addCard("4", "Diamonds");
        this.game.deck.addCard("8", "Diamonds");
        this.game.deck.addCard("10", "Diamonds");
    }
    exports.everyoneBusts = everyoneBusts;
    function unknownFailure() {
    }
    exports.unknownFailure = unknownFailure;
});
//# sourceMappingURL=TestWins.js.map