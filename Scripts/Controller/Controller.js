var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "../Models/Game", "./HTMLElements", "./PlayerFunctions", "./HtmlHand", "./ButtonListeners"], function (require, exports, Game_1, html, playerFunctions, HtmlHand_1, listeners) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    playerFunctions = __importStar(playerFunctions);
    listeners = __importStar(listeners);
    class Controller {
        constructor() {
            this.debug = false;
            this.startMoney = 10000;
            html.startGameButton.addEventListener("click", listeners.startGameListener.bind(this));
            html.betTextfield.addEventListener("keyup", listeners.betTextFieldListener.bind(this));
        }
        startNewGame() {
            this.game = new Game_1.Game(this.startMoney, Math.floor(parseInt(html.betTextfield.innerText)));
            this.resetGameData();
            if (this.debug)
                html.testDiv.innerText = this.game.deck.toString();
            this.playerHand[0].hit();
            this.playerHand[0].hit();
            this.dealerHand.hit();
            html.startGameButton.style.display = "none";
            html.betSpan.style.display = "none";
            html.betTextfield.style.display = "none";
        }
        /*
          playerHit(handIndex: number) {
            html.addImageToDiv(html.playerDiv, this.game.playerHit(handIndex))
            this.checkForEndOfGame()
          }
        */
        resetGameData() {
            html.removeDataFromDiv(html.dealerDiv);
            html.removeDataFromDiv(html.playerDiv);
            playerFunctions.disableBetTextField;
            this.dealerHand = new HtmlHand_1.HtmlHand(0, this.game, html.dealerDiv, false);
            this.playerHand = [];
            this.playerHand.push(new HtmlHand_1.HtmlHand(0, this.game, html.playerDiv, true));
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
    }
    exports.Controller = Controller;
});
//# sourceMappingURL=Controller.js.map