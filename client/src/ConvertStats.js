import gameChoices from "./Enum/gameChoices"
import resultRound from "./Enum/resultRound"

class ConvertStats {
   static didIWinThisRound(myChoice, opponentChoice)
    {
        if(myChoice === opponentChoice)
        {
            console.log('match null')
            return resultRound.MatchNull
        }
        else
        {
            if (myChoice === gameChoices.Pierre)
            {
                if(opponentChoice === gameChoices.Ciseau) return resultRound.Win
                if(opponentChoice === gameChoices.Feuille) return resultRound.Loose
            }
            else if(myChoice === gameChoices.Feuille)
            {
                if(opponentChoice === gameChoices.Pierre) return resultRound.Win
                if(opponentChoice === gameChoices.Ciseau) return resultRound.Loose
            }
            else if(myChoice === gameChoices.Ciseau)
            {
                if(opponentChoice === gameChoices.Feuille) return resultRound.Win
                if(opponentChoice === gameChoices.Pierre) return resultRound.Loose
            }
        }
    }

    static CheckWinOrLooseGame(countBis, finalTab, opponent)
    {
        if(countBis > 0)
        {
            finalTab.push({
                opponent: opponent,
                won: 'Gagné'
            })
        }
        else if(countBis < 0)
        {
            finalTab.push({
                opponent: opponent,
                won: 'Perdu'
            })
        }
        else
        {
            finalTab.push({
                opponent: opponent,
                won: 'Error...',
                valueCount: countBis
            })
        }
    }

    static convertStats1(tabStats, user)
    {
        // console.log('in convert stats 1')
        // console.log('props.Statistiques : ', this.props.Statistiques)
        return tabStats.map(e => {
            if(user === e.user1)
            {
                return {
                    me: e.user1,
                    opponent: e.user2,
                    myChoice: e.user1Choice,
                    opponentChoice: e.user2Choice,
                    idGame: e.idGame
                }
            }
            else if(user === e.user2)
            {
                return {
                    me: e.user2,
                    opponent: e.user1,
                    myChoice: e.user2Choice,
                    opponentChoice: e.user1Choice,
                    idGame: e.idGame
                }
            }
            else
            {
                return undefined
            }
        })
    }

    static convertStats2(tabStats, user)
    {
        let s1 = this.convertStats1(tabStats, user)
        console.log('in convert stats 2')
        console.log('s1 ', s1)
        let countBis = 0
        let finalTab = []
        for (let i = 0; i < s1.length; i++)
        {
            if(i === 0)
            {
                countBis += this.didIWinThisRound(s1[i].myChoice, s1[i].opponentChoice)
                console.log('itéartion num : ', i, 'value of countBis : ', countBis)
            }
            else
            {
                if(s1[i].idGame === s1[i - 1].idGame)
                {
                    countBis += this.didIWinThisRound(s1[i].myChoice, s1[i].opponentChoice)
                    console.log('itéartion num : ', i, 'value of countBis : ', countBis)
                }
                if(s1[i].idGame !== s1[i - 1].idGame || i === s1.length - 1)
                {
                    this.CheckWinOrLooseGame(countBis, finalTab, s1[i - 1].opponent)
                    countBis = 0
                }
            }
        }

        return finalTab
    }
}


export default ConvertStats