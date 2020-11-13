class Room
{

    readonly _capacity: number
    public _isFree: boolean
    public _name: string // Unique

    public constructor(readonly capacity: number, readonly name: string)
    {
        this.capacity = capacity
        this._isFree = true
        this._name = name
    }

    public show(): void
    {
        console.log(`capacity = ${this.capacity} and isFree = ${this._isFree}`)
    }
}

export default Room