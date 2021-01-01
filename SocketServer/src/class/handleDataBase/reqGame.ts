import Game from './Game'
import {Database} from "sqlite";
import DB from "../../connectDB";

class reqGame
{
    private DataBase: Database

    public constructor(connectionDB: any)
    {
        this.DataBase = connectionDB
    }

    public async addLine(Line: Game)
    {
        const request = "INSERT INTO Game VALUES (?, ?, ?, ?)"
        return await this.DataBase.run(request,
            [Line.user, Line.choice, Line.idManche, Line.idGame]);
    }

    public async getLastIdGame() : Promise<number>
    {
        let result = await this.DataBase.get('SELECT idGame FROM Game WHERE idGame = (SELECT MAX(idGame) FROM Game)')
        // Voir si "SELECT MAX(idGame) from Game" marche ou pas
        if(result === undefined)
        {
            return -1
        }
        console.log('In tcheck Game : result = ', result)
        return result.idGame
    }
}

export default reqGame