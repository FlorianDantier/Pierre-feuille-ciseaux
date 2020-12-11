import Room from "./Room";
import {Socket} from "socket.io";

class SetOfRoom
{
    private _Rooms: Room[]
    private _numberOfRoom: number

    public constructor(readonly numberOfRoom: number, readonly slotInOneRoom: number)
    {
        this._numberOfRoom = numberOfRoom
        this._Rooms = new Array<Room>(numberOfRoom)
        for(let i = 0; i < this._numberOfRoom; i++)
        {
            this._Rooms[i] = new Room(slotInOneRoom, `room${i}`)
        }
    }

    // Retourne truc si le socket a bien rejoint un salon, faux sinon
    public add(socket: Socket): string
    {
        const RoomsFree = this._Rooms.filter(e => e.isFree === true)
        if(RoomsFree[0])
        {
            return RoomsFree[0].add(socket)
        }
        else
        {
            return undefined
        }
    }

    public remove(socket: Socket): void
    {
        // On récupère le salon auquel le socket appartient
        const roomIfExist = Object.keys(socket.rooms)[1]
        // Si il y a un salon ...
        if(roomIfExist)
        {
            this._Rooms.filter(e => e._name === roomIfExist)[0].remove(socket)
        }
        else
        {
            console.log('Pas de salon pour le socket donc pas de leave')
        }
    }
}

export default SetOfRoom