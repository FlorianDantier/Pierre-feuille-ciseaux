import {Socket} from "socket.io";

class Room
{
    private _capacity: number
    private _isFree: boolean
    public _name: string // Unique

    public constructor(readonly capacity: number, readonly name: string)
    {
        this._capacity = capacity
        this._isFree = true
        this._name = name
    }

    public add(socket: Socket): string | undefined
    {
        console.log('capacity : ' ,this._capacity)
        if(this._capacity > 0)
        {
            console.log('In capacity >  0')

            socket.join(this._name)
            this._capacity -= 1
            if(this._capacity === 0)
            {
                this._isFree = false
            }
            return this._name
        }
        else
        {
            console.log('Not in capacity > 0')
            return undefined
        }
    }

    public remove(socket: Socket): boolean
    {
        const roomOfSocket = Object.keys(socket.rooms)
        const test = roomOfSocket.filter(e => e === this._name)
        if(test !== [])
        {
            socket.leave(this._name)
            this._capacity ++
            console.log('leave room...')
            return true
        }
        else
        {
            return false
        }

    }

    get isFree(): boolean {
        return this._isFree;
    }
}

export default Room