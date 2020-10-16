export default class Input{
  private _type: string
  private _name: string
  private _id: string
  private _balise: string
  private _textLabel: string

  constructor(type: string, name: string, id: string, textLabel: string) {
    this._type = type
    this._name = name
    this._id = id
    this._textLabel = textLabel
    this._balise =
    `<label for="${this._name}">${this._textLabel}</label>
    <input type="${this._type}" name="${this._name}" id="${this._id}">`
  }
  
  public get name() : string {
    return this._name
  }

  public get balise() : string {
    return this._balise 
  }
  
  
  public get type() : string {
    return this._type
  }
  
  
  public get id() : string {
    return this._id
  }

  
  public get textLabel() : string {
    return this._textLabel
  }
}