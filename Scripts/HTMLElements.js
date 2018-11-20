define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HTMLElements {
        constructor() {
            this.startGameButton = document.getElementById('StartGame');
            this.hitButton = document.getElementById('Hit');
            this.stayButton = document.getElementById('Stay');
            this.dealerDiv = document.getElementById('dealerHandDiv');
            this.playerDiv = document.getElementById('playerHandDiv');
            this.winnerText = document.getElementById('winnerText');
            this.deckDiv = document.getElementById('deckDiv');
            this.deckDivOutput = document.getElementById('deckDivOutput');
            this.playerScoreDiv = document.getElementById('playerScoreDiv');
            this.dealerScoreDiv = document.getElementById('dealerScoreDiv');
        }
        addImageToDiv(div, card) {
            var imageTag = document.createElement("img");
            imageTag.setAttribute("src", card.imageSrc);
            imageTag.setAttribute("height", "90");
            imageTag.setAttribute("width", "125");
            imageTag.setAttribute("alt", "Error: Card Not Found");
            imageTag.style.marginRight = '10px';
            div.appendChild(imageTag);
        }
        createButton(name, div) {
            var button = document.createElement("input");
            button.setAttribute('type', 'button');
            button.setAttribute('width', '100px');
            button.setAttribute('height', '25px');
            button.setAttribute('value', name);
        }
    }
    exports.HTMLElements = HTMLElements;
});
//# sourceMappingURL=HTMLElements.js.map