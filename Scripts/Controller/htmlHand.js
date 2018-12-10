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
        constructor(index, controller, parent, isPlayer) {
            this.index = index;
            this.controller = controller;
            this.parent = parent;
            this.isPlayer = isPlayer;
            this.game = controller.game;
            if (isPlayer)
                this.hand = this.game.playerCards[index];
            else
                this.hand = this.game.dealerCards;
            this.manageDivs();
            parent.appendChild(this.mainDiv);
            this.winnerText = "";
            if (isPlayer) {
                this.hand = this.game.playerCards[index];
                this.createButtons();
            }
            else
                this.hand = this.game.dealerCards;
        }
        manageDivs() {
            this.mainDiv = document.createElement("div");
            this.imageDiv = document.createElement("div");
            this.scoreDiv = document.createElement("div");
            this.buttonDiv = document.createElement("div");
            this.betDiv = document.createElement("div");
            this.insuranceDiv = document.createElement("div");
            this.winningsDiv = document.createElement("div");
            this.scoreSpan = document.createElement("span");
            this.scoreDiv.appendChild(this.scoreSpan);
            this.mainDiv.appendChild(this.imageDiv);
            this.mainDiv.appendChild(this.scoreDiv);
            this.mainDiv.appendChild(this.betDiv);
            this.mainDiv.appendChild(this.insuranceDiv);
            this.mainDiv.appendChild(this.winningsDiv);
            this.mainDiv.appendChild(this.buttonDiv);
            this.mainDiv.appendChild(document.createElement("br"));
            this.mainDiv.style.display = "inline-block";
            this.mainDiv.style.marginLeft = "10%";
            if (this.isPlayer) {
                this.betSpan = document.createElement("span");
                this.betSpan.innerText = "Current Bet: ";
                this.betAmount = document.createElement("span");
                this.betAmount.innerText = this.hand.bet.toString();
                this.betDiv.appendChild(this.betSpan);
                this.betDiv.appendChild(this.betAmount);
                this.insuranceSpan = document.createElement("span");
                this.insuranceDiv.appendChild(this.insuranceSpan);
                this.winningsSpan = document.createElement("span");
                let space = document.createElement("br");
                this.winningsAmount = document.createElement("span");
                this.winningsDiv.appendChild(this.winningsSpan);
                this.winningsDiv.appendChild(space);
                this.winningsDiv.appendChild(this.winningsAmount);
            }
        }
        createButtons() {
            // create button objects
            this.hitButton = html.createButton("Hit");
            this.stayButton = html.createButton("Stay");
            this.splitButton = html.createButton("Split");
            this.insuranceButton = html.createButton("Insurance");
            this.doubleDownButton = html.createButton("Double Down");
            this.surrenderButton = html.createButton("Surrender");
            let invisibleButton = html.createButton("invis");
            invisibleButton.style.visibility = "hidden";
            //append buttons to buttonDiv
            this.buttonDiv.appendChild(this.hitButton);
            this.buttonDiv.appendChild(this.stayButton);
            this.buttonDiv.appendChild(this.splitButton);
            this.buttonDiv.appendChild(this.insuranceButton);
            this.buttonDiv.appendChild(this.doubleDownButton);
            this.buttonDiv.appendChild(this.surrenderButton);
            this.buttonDiv.appendChild(invisibleButton);
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
                this.buttonDisplay(this.splitButton, this.hand.checkSplit(this.controller.playerHands.length, this.game.score));
                this.buttonDisplay(this.insuranceButton, this.hand.checkInsurance(this.game.dealerCards, this.game.score));
                this.buttonDisplay(this.doubleDownButton, this.hand.checkDoubleDown(this.game.score));
                this.buttonDisplay(this.surrenderButton, this.hand.checkSurrender(this.game.score));
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
                this.scoreSpan.innerText = `Hand Score: ${this.hand.getScoreText()}`;
            else
                this.scoreSpan.innerText = `Dealer Score: ${this.hand.getScoreText()}`;
            //this.scoreDiv.style.backgroundColor = "rgba(0, 250, 250, 0.5);"
        }
        updateHand() {
            this.updateScore();
            let startText = "";
            if (this.isPlayer)
                startText = "Hand";
            else
                startText = "Dealer";
            if (this.hand.checkBlackjack()) {
                this.hand.stayed = true;
                this.scoreSpan.innerText = `${startText} Score: Blackjack`;
            }
            else if (this.hand.check21()) {
                this.hand.stayed = true;
                this.scoreSpan.innerText = `${startText} Score: 21`;
            }
            else if (this.hand.checkBust()) {
                this.hand.stayed = true;
                this.scoreSpan.innerText = `${startText} Score: Bust (${this.hand.getScoreText()})`;
                console.log(`Bust Score: ${this.hand.getScoreText()}`);
            }
            this.showAvailableButtons();
            if (this.game.checkEndoPlayerTurn() && this.isPlayer) {
                this.controller.dealerTurn();
            }
        }
        hit(card) {
            if (card == undefined) {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand));
            }
            else {
                html.addImageToDiv(this.imageDiv, this.game.hit(this.hand, card));
            }
            this.updateHand();
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
            this.game.splitPlayerHand(this.index);
            let newIndex = this.controller.playerHands.length;
            let newHtmlHand = new HtmlHand(newIndex, this.controller, html.playerDiv, true);
            html.redrawImageDiv(this.imageDiv, this);
            html.redrawImageDiv(newHtmlHand.imageDiv, newHtmlHand);
            this.controller.playerHands.push(newHtmlHand);
            for (let hand of this.controller.playerHands) {
                hand.updateHand();
            }
            this.controller.updateCurrentScore();
        }
        insurance() {
            this.game.insureHand(this.index);
            this.insuranceSpan.innerText = `Insurance: ${this.hand.insurance}`;
            this.controller.updateCurrentScore();
            this.updateHand();
        }
        doubleDown() {
            this.game.doubleDown(this.index);
            this.betAmount.innerText = this.hand.bet.toString();
            html.redrawImageDiv(this.imageDiv, this);
            this.updateHand();
        }
        surrender() {
            this.game.surrender(this.index);
            this.updateHand();
        }
        clear() {
            html.removeDataFromDiv(this.mainDiv);
        }
    }
    exports.HtmlHand = HtmlHand;
});
//# sourceMappingURL=HtmlHand.js.map