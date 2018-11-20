import { Game } from '../Models/Game'
import { Controller } from './Controller'
import * as html from './HTMLElements'






export function disableBetTextField(this: Controller) { this.html.betTextfield.disabled = true }
export function enableBetTextField(this: Controller) { this.html.betTextfield.disabled = false }
