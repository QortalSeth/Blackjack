import {HtmlHand}   from "./HtmlHand"
import {Controller} from "./Controller"
import * as html    from "./HTMLElements"


export function startGameListener (this: Controller) {
    this.startNewGame()
}


export function hit (this: HtmlHand) {
    html.addImageToDiv(this.imageDiv, this.game.hit(this.hand))
    this.updateHand()
}

export function stayListener (this: HtmlHand) {

}

export let splitListener = function (this: HtmlHand) {

}
export let insuranceListener = function (this: HtmlHand) {

}

export let doubleDownListener = function (this: HtmlHand) {

}
export let surrenderListener = function (this: HtmlHand) {

}

export let betTextFieldListener = function (this: Controller) {
    let textField = html.betTextfield
    let number = parseInt(textField.value)
    if (isNaN(number) || number < 20) {
        html.startGameButton.disabled = true
    }
    else
        html.startGameButton.disabled = false

}