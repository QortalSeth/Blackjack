import {Card}     from "../Models/card"
import {HtmlHand} from "TypeScript/Controller/HtmlHand"

export let betDiv = document.getElementById("betDiv")
export let betSpan = document.getElementById("betSpan")
export let betTextfield = <HTMLInputElement>document.getElementById("betTextfield")

export let dealerDiv = document.getElementById("dealerHandDiv")
export let playerDiv = document.getElementById("playerHandDiv")

export let buttonsDiv = document.getElementById("buttonsDiv")
export let testDiv = document.getElementById("testDiv")

export let scoreSpan = document.getElementById("scoreSpan")
export let scoreAmount = document.getElementById("scoreAmount")
export let startGameButton = <HTMLInputElement>document.getElementById("startGameButton")

export function addImageToDiv (div: HTMLElement, card: Card) {
    var imageTag = document.createElement("img")
    imageTag.setAttribute("src", card.imageSrc)
    imageTag.setAttribute("height", "100")
    imageTag.setAttribute("width", "100")
    imageTag.setAttribute("alt", "Error: Card Not Found")
    imageTag.style.marginRight = "10px"
    div.appendChild(imageTag)
}

export function redrawImageDiv (div: HTMLElement, hand: HtmlHand) {
    removeDataFromDiv(div)
    for (let card of hand.hand.cards) {
        addImageToDiv(div, card)
    }
}

export function createButton (name: string): HTMLInputElement {
    var button = document.createElement("input")
    button.setAttribute("type", "button")
    button.setAttribute("width", "100px")
    button.setAttribute("height", "25px")
    button.setAttribute("value", name)
    return button
}

export function removeDataFromDiv (div: HTMLElement) {
    while (div.hasChildNodes())
        div.removeChild(div.firstChild)
}

