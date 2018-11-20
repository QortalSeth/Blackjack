var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "./HTMLElements", "./ButtonListeners"], function (require, exports, html, listeners) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    listeners = __importStar(listeners);
    class HtmlHand {
        constructor(index, game, parent, isPlayer) {
            this.index = index;
            this.game = game;
            this.parent = parent;
            this.isPlayer = isPlayer;
            this.mainDiv = document.createElement('div');
            this.imageDiv = document.createElement('div');
            this.scoreDiv = document.createElement('div');
            this.buttonDiv = document.createElement('div');
            this.mainDiv.appendChild(this.imageDiv);
            this.mainDiv.appendChild(this.scoreDiv);
            this.mainDiv.appendChild(this.buttonDiv);
            this.winnerText = '';
            if (isPlayer)
                this.hand = game.playerCards[index];
            else
                this.hand = game.dealerCards;
            parent.appendChild(this.div);
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
            this.hitButton.addEventListener('click', listeners.hitListener);
            this.stayButton.addEventListener('click', listeners.stayListener);
            this.splitButton.addEventListener('click', listeners.splitListener);
            this.insuranceButton.addEventListener('click', listeners.insuranceListener);
            this.doubleDownButton.addEventListener('click', listeners.doubleDownListener);
            this.surrenderButton.addEventListener('click', listeners.surrenderListener);
        }
        showAvailableButtons() {
            buttonDisplay(this.hitButton, this.hand.checkHit());
            buttonDisplay(this.stayButton, this.hand.checkStay());
            buttonDisplay(this.splitButton, this.hand.checkSplit());
            buttonDisplay(this.insuranceButton, this.hand.checkInsurance());
            buttonDisplay(this.doubleDownButton, this.hand.checkDoubleDown());
            buttonDisplay(this.surrenderButton, this.hand.checkSurrender());
        }
        buttonDisplay(button, show) {
            if (show)
                button.style.display = 'inline';
            else
                button.style.display = 'none';
        }
        updateScore() {
            this.scoreDiv.innerText = `Hand Score: ${this.hand.getScoreText()}`;
        }
        updateHand() {
            this.showAvailableButtons();
            this.updateScore();
        }
        checkForEndOfGame() {
            this.game.checkWinner();
            if (this.game.gameOver) {
                // display winning text reset buttons
                this.html.winnerText.innerText = this.game.winningText;
                if (this.game.winnerIsPlayer)
                    this.html.winnerText.style.color = 'blue';
                else
                    this.html.winnerText.style.color = 'red';
                this.html.startGameButton.style.display = 'inline';
                this.html.hitButton.style.display = 'none';
                this.html.stayButton.style.display = 'none';
            }
        }
    }
    exports.HtmlHand = HtmlHand;
});
//# sourceMappingURL=htmlHand.js.map