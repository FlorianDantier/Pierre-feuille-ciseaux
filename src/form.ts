import { text } from 'body-parser'
import Input from './input'

export default class Form{
  private _action: string
  private _stringInputs: string
  private _intputs: Input[]
  private _formulaire: string
  private _textButton: string

  constructor(action: string, inputs: Input[], textButton: string) {
    this._action = action
    this._intputs = inputs
    this._textButton = textButton
    this._stringInputs = this._intputs.map(e => e.balise).join(' ')
    
    this._formulaire = 
      `<form action="${this._action} method="POST">
        ${this._stringInputs}
       </form>`
  }

  
  public toHTML() {
    return this._formulaire
  }
  
  
}