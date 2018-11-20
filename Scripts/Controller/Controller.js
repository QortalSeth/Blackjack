var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "../Models/Game", "./HTMLElements", "./PlayerFunctions", "./HtmlHand"], function (require, exports, Game_1, html, playerFunctions, HtmlHand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    html = __importStar(html);
    playerFunctions = __importStar(playerFunctions);
    class Controller {
        constructor() {
            this.debug = false;
            this.startMoney = 10000;
        }
        startNewGame() {
            this.game = new Game_1.Game(this.startMoney, Math.floor(parseInt(html.betTextfield.innerText)));
            html.removeDataFromDiv(html.dealerDiv);
            html.removeDataFromDiv(html.playerDiv);
            playerFunctions.disableBetTextField;
            this.dealerHand = new HtmlHand_1.HtmlHand(0, this.game, html.dealerDiv, false);
            this.playerHand.push(new HtmlHand_1.HtmlHand(0, this.game, html.playerDiv, true));
            if (this.debug)
                html.testDiv.innerText = this.game.deck.toString();
            this.playerHit(0);
            this.playerHit(0);
            this.dealerHit();
        }
        playerHit(handIndex) {
            html.addImageToDiv(html.playerDiv, this.game.playerHit(handIndex));
            this.checkForEndOfGame();
        }
        dealerHit() {
            html.addImageToDiv(html.dealerDiv, this.game.dealerHit());
        }
    }
    exports.Controller = Controller;
});
//# sourceMappingURL=Controller.js.map