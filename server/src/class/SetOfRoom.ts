import Room from "./Room";
import {Socket} from "socket.io";

class SetOfRoom
{
    private _Rooms: Room[]
    private _size: number

    public constructor(readonly size: number, readonly capacity: number)
    {
        this._size = size
        this._Rooms = new Array<Room>(size)
        for(let i = 0; i < this._size; i++)
        {
            this._Rooms[i] = new Room(capacity, `room${i}`)
        }
    }

    // Retourne truc si le socket a bien rejoint un salon, faux sinon
    public add(socket: Socket): boolean
    {
        const RoomsFree = this._Rooms.filter(e => e._isFree === true)
        let firstRoomFree: Room
        if(RoomsFree.length > 0)
        {
            firstRoomFree = RoomsFree[0]
            const index = this._Rooms.findIndex(e => e._name === firstRoomFree._name)
            this._Rooms[index]._isFree = false
            socket.join(firstRoomFree._name)

            return true
        }
        else
        {
            return false
        }
    }

    public remove(socket: Socket): void
    {
        const roomIfExist = Object.keys(socket.rooms)
        console.log(roomIfExist)
        if(Object.keys(socket.rooms)[1])
        {
            const room = Object.keys(socket.rooms)[1]
            const index = this._Rooms.findIndex(e => e._name === room)
            this._Rooms[index]._isFree = true
            socket.leave(room)
            console.log(`Le socket a été retiré du salon ${Object.keys(socket.rooms)[1]}`)
        }
        else
        {
            console.log('Pas de salon pour le socket donc pas de leave')
        }
    }
}

export default SetOfRoom