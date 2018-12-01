define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.betDiv = document.getElementById("betDiv");
    exports.betSpan = document.getElementById("betSpan");
    exports.betTextfield = document.getElementById("betTextfield");
    exports.dealerDiv = document.getElementById("dealerHandDiv");
    exports.playerDiv = document.getElementById("playerHandDiv");
    exports.buttonsDiv = document.getElementById("buttonsDiv");
    exports.testDiv = document.getElementById("testDiv");
    exports.scoreSpan = document.getElementById("scoreSpan");
    exports.scoreAmount = document.getElementById("scoreAmount");
    exports.startGameButton = document.getElementById("startGameButton");
    function addImageToDiv(div, card) {
        var imageTag = document.createElement("img");
        imageTag.setAttribute("src", card.imageSrc);
        imageTag.setAttribute("height", "90");
        imageTag.setAttribute("width", "125");
        imageTag.setAttribute("alt", "Error: Card Not Found");
        imageTag.style.marginRight = "10px";
        div.appendChild(imageTag);
    }
    exports.addImageToDiv = addImageToDiv;
    function redrawImageDiv(div, hand) {
        removeDataFromDiv(div);
        for (let card of hand.hand.cards) {
            addImageToDiv(div, card);
        }
    }
    exports.redrawImageDiv = redrawImageDiv;
    function createButton(name) {
        var button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("width", "100px");
        button.setAttribute("height", "25px");
        button.setAttribute("value", name);
        return button;
    }
    exports.createButton = createButton;
    function removeDataFromDiv(div) {
        while (div.firstChild)
            div.removeChild(div.firstChild);
    }
    exports.removeDataFromDiv = removeDataFromDiv;
});
//# sourceMappingURL=HTMLElements.js.map