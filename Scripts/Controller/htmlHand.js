var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "./HTMLElements"], function (require, exports, html) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    class HtmlHand {
        constructor(index, game, parent, isPlayer) {
            this.index = index;
            this.game = game;
            this.parent = parent;
            this.isPlayer = isPlayer;
            this.mainDiv = document.createElement("div");
            this.imageDiv = document.createElement("div");
            this.scoreDiv = document.createElement("div");
            this.buttonDiv = document.createElement("div");
            this.mainDiv.appendChild(this.imageDiv);
            this.mainDiv.appendChild(this.scoreDiv);
            this.mainDiv.appendChild(this.buttonDiv);
            this.winnerText = "";
            if (isPlayer) {
                this.hand = game.playerCards[index];
                this.createButtons();
            }
            else
                this.hand = game.dealerCards;
            parent.appendChild(this.mainDiv);
        }
        createButtons() {
            // create button objects
            this.hitButton = html.createButton("Hit");
            this.stayButton = html.createButton("Stay");
            this.splitButton = html.createButton("Split");
            this.insuranceButton = html.createButton("Insurance");
            this.doubleDownButton = html.createButton("Double Down");
            this.surrenderButton = html.createButton("Surrender");
            //append buttons to buttonDiv
            this.buttonDiv.appendChild(this.hitButton);
            this.buttonDiv.appendChild(this.stayButton);
            this.buttonDiv.appendChild(this.splitButton);
            this.buttonDiv.appendChild(this.insuranceButton);
            this.buttonDiv.appendChild(this.doubleDownButton);
            this.buttonDiv.appendChild(this.surrenderButton);
            //add button listeners
            this.hitButton.addEventListener("click", (event) => this.hit());
            this.stayButton.addEventListener("click", (event) => this.stay());
            this.splitButton.addEventListener("click", (event) => this.split());
            this.insuranceButton.addEventListener("click", (event) => this.insurance());
            this.doubleDownButton.addEventListener("click", (event) => this.doubleDown());
            this.surrenderButton.addEventListener("click", (event) => this.surrender());
        }
        showAvailableButtons() {
            if (this.isPlayer) {
                this.buttonDisplay(this.hitButton, this.hand.checkHit());
                this.buttonDisplay(this.stayButton, this.hand.checkStay());
                this.buttonDisplay(this.splitButton, this.hand.checkSplit());
                this.buttonDisplay(this.insuranceButton, this.game.dealerCards.checkInsurance());
                this.buttonDisplay(this.doubleDownButton, this.hand.checkDoubleDown());
                this.buttonDisplay(this.surrenderButton, this.hand.checkSurrender());
            }
        }
        buttonDisplay(button, show) {
            if (show)
                button.style.display = "inline";
            else
                button.style.display = "none";
        }
        updateScore() {
            if (this.isPlayer)
                this.scoreDiv.innerText = `Hand Score: ${this.hand.getScoreText()}`;
            else
                this.scoreDiv.innerText = `Dealer Score: ${this.hand.getScoreText()}`;
        }
        updateHand() {
            this.showAvailableButtons();
            this.updateScore();
        }
        checkEndofTurn() {
        }
        hit(card) {
            if (card == undefined) {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand));
            }
            else {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card));
            }
            this.updateHand();
            if (this.hand.checkBlackjack()) {
                this.stay();
                this.scoreDiv.innerText = `Hand Score: Blackjack`;
            }
            else if (this.hand.checkBust()) {
                this.stay();
                this.scoreDiv.innerText = `Hand Score: Bust`;
            }
        }
        initialHit(card) {
            if (card == undefined) {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand));
            }
            else {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card));
            }
        }
        stay() {
            this.hand.stayed = true;
            this.updateHand();
        }
        split() {
        }
        insurance() {
        }
        doubleDown() {
        }
        surrender() {
        }
    }
    exports.HtmlHand = HtmlHand;
});
//# sourceMappingURL=HtmlHand.js.map