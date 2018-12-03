define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
/*
export let DealerTurn = function(controller: Controller) {
  let lowChanceToLose = Math.floor(controller.game.dealerCards.getLowestScore()) < 17
  let dealerScore = controller.game.dealerCards.getHighestScore()

  while (lowChanceToLose) {
    controller.html.addImageToDiv(controller.html.dealerDiv, controller.game.dealerHit())
    dealerScore = controller.game.dealerCards.getHighestScore()
  }

  controller.updateScores()
  controller.checkForEndOfGame()
}

*/
/*
let DealerTurn = function(this: Controller) {
  let mustHitToWin = game.playerStayed && game.playerCards.getHighestScore > game.dealerCards.getHighestScore
  let lowChanceToLose = Math.floor(game.dealerCards.getHighestScore()) < 17
  let dealerScore = game.dealerCards.getHighestScore()
  let playerScore = game.playerCards.getHighestScore()

  if (game.DealerStayed == false) {
    if (game.playerStayed === true && playerScore > dealerScore) {
      while (dealerScore < playerScore) {
        addImageToDiv(dealerDiv, game.DealerHit())
        dealerScore = game.dealerCards.getHighestScore()
      }
    }

    else if (mustHitToWin || lowChanceToLose) {
      addImageToDiv(dealerDiv, game.DealerHit())
    }
    else { game.DealerStay() }

  }
  updateScores()
  checkForEndOfGame()
}*/
//# sourceMappingURL=DealerFunctions.js.map