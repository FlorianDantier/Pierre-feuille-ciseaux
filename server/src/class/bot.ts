enum Choice
{
    Pierre,
    Feuiile,
    Ciseaux
}

enum Strategy
{
    Strat1,
    Strat2,
    Random
}

class Bot 
{
    private choice: Choice
    private strategy: Strategy


    public constructor(_strategy: Strategy )
    {
        this.strategy = Strategy.Random
    }
    private makeChoice() :void
    {
        if(this.strategy === Strategy.Strat1)
        {
            // -----------
        }
        else if (this.strategy === Strategy.Strat2)
        {
            // -----------
        }
        else if (this.strategy === Strategy.Random)
        {
            let choice: number = Number.parseInt((Math.random() * 3).toString())
            console.log('Choice \'s bot :' + choice)
            this.choice = choice
        }
    }

    public getChoice() : Choice
    {
        this.makeChoice()
        return this.choice
    }
}

export default Bot