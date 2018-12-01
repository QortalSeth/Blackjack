var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "../Models/Game", "./HTMLElements", "./HtmlHand", "../Models/Card"], function (require, exports, Game_1, html, HtmlHand_1, Card_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    class Controller {
        constructor(currentScore) {
            this.currentScore = currentScore;
            this.debug = false;
            this.startMoney = 10000;
            html.startGameButton.addEventListener("click", (event) => this.startNewGame());
            html.betTextfield.addEventListener("keyup", (event) => this.betTextFieldListener());
            html.scoreAmount.innerText = this.startMoney.toString();
        }
        startNewGame() {
            this.game = new Game_1.Game(this.currentScore, Math.floor(parseInt(html.betTextfield.value)));
            this.resetGameHtmlData();
            this.updateCurrentScore();
            if (this.debug)
                html.testDiv.innerText = this.game.deck.toString();
            this.initialHits(true);
            html.startGameButton.style.display = "none";
            html.betSpan.style.display = "none";
            html.betTextfield.style.display = "none";
        }
        initialHits(debug) {
            if (debug) {
                this.dealerHand.hit(new Card_1.Card("8", "Diamonds"));
                this.playerHand[0].initialHit(new Card_1.Card("Ace", "Hearts"));
                this.playerHand[0].hit(new Card_1.Card("Ace", "Clubs"));
            }
            else {
                this.dealerHand.hit();
                this.playerHand[0].initialHit();
                this.playerHand[0].hit();
            }
        }
        resetGameHtmlData() {
            html.removeDataFromDiv(html.dealerDiv);
            html.removeDataFromDiv(html.playerDiv);
            this.betDisplay(false);
            this.dealerHand = new HtmlHand_1.HtmlHand(0, this.game, html.dealerDiv, false);
            this.playerHand = [];
            this.playerHand.push(new HtmlHand_1.HtmlHand(0, this.game, html.playerDiv, true));
        }
        updateCurrentScore() {
            html.scoreAmount.innerText = this.game.score.toString();
        }
        betDisplay(display) {
            if (display) {
                html.betSpan.style.display = "inline";
                html.betTextfield.style.display = "inline";
            }
            else {
                html.betSpan.style.display = "none";
                html.betTextfield.style.display = "none";
            }
        }
        betTextFieldListener() {
            let textField = html.betTextfield;
            let number = parseInt(textField.value);
            if (isNaN(number) || number < 20) {
                html.startGameButton.disabled = true;
            }
            else
                html.startGameButton.disabled = false;
        }
    }
    exports.Controller = Controller;
});
//# sourceMappingURL=Controller.js.map