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
    function testInsurance() {
        //     this.game.deck.addCard("Ace", "Clubs")
        //     this.game.deck.addCard("Queen", "Hearts")
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("9", "Spades");
        this.game.deck.addCard("Ace", "Spades");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("Ace", "Diamonds");
    }
    exports.testInsurance = testInsurance;
    function testDoubleDown() {
        this.game.deck.addCard("6", "Hearts");
        this.game.deck.addCard("5", "Hearts");
        this.game.deck.addCard("8", "Hearts");
    }
    exports.testDoubleDown = testDoubleDown;
    function testAceBust() {
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("King", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.testAceBust = testAceBust;
    function testMaxSplits() {
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("King", "Spades");
        this.game.deck.addCard("9", "Spades");
        this.game.deck.addCard("Ace", "Spades");
        this.game.deck.addCard("Ace", "Diamonds");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.testMaxSplits = testMaxSplits;
    function test21() {
        this.game.deck.addCard("4", "Spades");
        this.game.deck.addCard("5", "Diamonds");
        this.game.deck.addCard("10", "Hearts");
        this.game.deck.addCard("Ace", "Hearts");
        this.game.deck.addCard("Ace", "Clubs");
        this.game.deck.addCard("8", "Diamonds");
    }
    exports.test21 = test21;
});
//# sourceMappingURL=TestButtons.js.map