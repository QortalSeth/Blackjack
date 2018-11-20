define(["require", "exports", "./Game", "./HTMLElements"], function (require, exports, Game_1, HTMLElements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Controller {
        constructor() {
            this.debug = false;
            this.html = new HTMLElements_1.HTMLElements();
            this.startMoney = 10000;
        }
        startNewGame() {
            this.game = new Game_1.Game(this.startMoney);
            this.html.startGameButton.style.display = 'none';
            this.html.hitButton.style.display = 'inline';
            this.html.winnerText.innerText = '';
            this.html.stayButton.style.display = 'inline';
            this.removeDataFromDiv(this.html.dealerDiv);
            this.removeDataFromDiv(this.html.playerDiv);
            if (this.debug)
                this.html.deckDivOutput.innerText = this.game.deck.toString();
            this.playerHit(0);
            this.playerHit(0);
            this.dealerHit();
        }
        playerHit(handIndex) {
            this.html.addImageToDiv(this.html.playerDiv, this.game.playerHit(handIndex));
            this.checkForEndOfGame();
        }
        dealerHit() {
            this.html.addImageToDiv(this.html.dealerDiv, this.game.dealerHit());
        }
        removeDataFromDiv(div) {
            while (div.firstChild)
                div.removeChild(div.firstChild);
        }
        updateScores() {
            let playerScore = this.game.playerCards.getScoreText();
            let dealerScore = this.game.dealerCards.getScoreText();
            this.html.playerScoreDiv.innerText = `Player Score: ${playerScore}`;
            this.html.dealerScoreDiv.innerText = `Dealer Score: ${dealerScore}`;
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
        resetGame() {
            this.html.startGameButton.style.display = 'inline';
            this.html.hitButton.style.display = 'none';
            this.html.stayButton.style.display = 'none';
            this.game = new Game_1.Game();
            this.removeDataFromDiv(this.html.dealerDiv);
            this.removeDataFromDiv(this.html.playerDiv);
            this.html.winnerText.innerText = '';
        }
    }
    exports.Controller = Controller;
});
//# sourceMappingURL=Controller.js.map