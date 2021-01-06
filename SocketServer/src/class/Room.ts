import {Socket} from "socket.io";

class Room
{
    private _capacity: number
    public _name: string // Unique

    public constructor(readonly __capacity: number, readonly name: string)
    {
        this._capacity = __capacity
        this._name = name
    }


    public add(socket: Socket): string | undefined
    {
        console.log('capacity : ' ,this._capacity)
        if(this._capacity > 0)
        {
            console.log('In capacity >  0')

            socket.join(this._name)
            this._capacity --
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
            console.log('leave room... ' + this._name)
            return true
        }
        else
        {
            return false
        }

    }

    public isFree(): boolean {
        return this._capacity > 0
    }
}

export default Room