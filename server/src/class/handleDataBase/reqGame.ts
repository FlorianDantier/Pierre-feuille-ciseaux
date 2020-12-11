import Game from './Game'
import {Database} from "sqlite";

class reqGame
{
    private DataBase: Database

    public constructor(connectionDB: any)
    {
        this.DataBase = connectionDB
    }

    public async addLine(Line: Game)
    {
        const request = "INSERT INTO Game VALUES (?, ?, ?, ?, ?, ?)"
        return await this.DataBase.run(request,
            [Line.user1, Line.user1Choice, Line.user2, Line.user2Choice, Line.idManche, Line.idGame]);
    }

    public async all(idManche: number, idGame: number) : Promise<Game[]>
    {
        const request = "SELECT * FROM Game WHERE idManche=(?) AND idGame=(?)"
        const result = await this.DataBase.all(request, [idManche, idGame])
        return result.map(e => {
            return new Game({
             user1Choice: e.user1Choice,
                idGame: e.idGame,
                user1: e.user1,
                user2Choice: e.user2Choice,
                user2: e.user2,
                idManche: e.idManche }
            )
        })

    }
}

export default reqGame