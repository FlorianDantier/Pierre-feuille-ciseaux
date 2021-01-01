
class Game
{
    public user: string
    public choice: string
    public idManche: number
    public idGame: number

    public constructor(Game: { user: string, choice: string, idManche: number, idGame: number })
    {
            this.user = Game.user
            this.choice = Game.choice
            this.idManche = Game.idManche
            this.idGame = Game.idGame
    }
}

export default Game