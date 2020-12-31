import sum from "../../sum";
class Game
{

    public user1: string
    public user1Choice: string
    public user2: string
    public user2Choice: string
    public idManche: number
    public idGame: number

    public constructor(Game: { user1Choice: string, idGame: number, user1: string, user2Choice: string, user2: string, idManche: number })
    {
        if(this.user1 !== undefined)
        {
            this.user1 = Game.user1
            this.user2 = Game.user2
            this.user1Choice = Game.user1Choice
            this.user2Choice = Game.user2Choice
            this.idGame = Game.idGame
            this.idManche = Game.idManche
        }
        else
        {
            this.user1 = undefined
            this.user2 = undefined
            this.user1Choice = undefined
            this.user2Choice = undefined
            this.idGame = undefined
            this.idManche = undefined
        }

    }
}

export default Game