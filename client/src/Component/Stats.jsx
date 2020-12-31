import {Component} from "react"
import Table from "react-bootstrap/Table";

const resultRound = Object.freeze({
    Win : 1,
    Loose: -1,
    MatchNull: 0
})

const _ = Object.freeze({
    Pierre: 'Pierre',
    Feuille: 'Feuille',
    Ciseau: 'Ciseau'
})

class Stats extends Component
{
    constructor(props)
    {
        super(props)
    }

    didIWinThisRound(myChoice, opponentChoice)
    {
        if(myChoice === opponentChoice)
        {
            console.log('match null')
            return resultRound.MatchNull
        }
        else
        {
            if (myChoice === _.Pierre)
            {
                if(opponentChoice === _.Ciseau) return resultRound.Win
                if(opponentChoice === _.Feuille) return resultRound.Loose
            }
            else if(myChoice === _.Feuille)
            {
                if(opponentChoice === _.Pierre) return resultRound.Win
                if(opponentChoice === _.Ciseau) return resultRound.Loose
            }
            else if(myChoice === _.Ciseau)
            {
                if(opponentChoice === _.Feuille) return resultRound.Win
                if(opponentChoice === _.Pierre) return resultRound.Loose
            }
        }
    }

    CheckWinOrLooseGame(countBis, finalTab, opponent)
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

    convertStats1()
    {
        // console.log('in convert stats 1')
        // console.log('props.Statistiques : ', this.props.Statistiques)
        return [... this.props.Statistiques].map(e => {
            if(this.props.user === e.user1)
            {
                return {
                    me: e.user1,
                    opponent: e.user2,
                    myChoice: e.user1Choice,
                    opponentChoice: e.user2Choice,
                    idGame: e.idGame
                }
            }
            else if(this.props.user === e.user2)
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

    convertStats2()
    {


        let s1 = this.convertStats1()
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

    render()
    {
        console.log(this.props.Statistiques)
        let Tabstatistiques = this.convertStats2()
        console.log('Result convert stats : ',Tabstatistiques)
        Tabstatistiques = Tabstatistiques.map((e,i) =>
            <tr>
                <td className={e.won === 'Gagné' ? 'alert-success' : 'alert-danger'}>{i}</td>
                <td className={e.won === 'Gagné' ? 'alert-success' : 'alert-danger'}>{e.opponent}</td>
                <td className={e.won === 'Gagné' ? 'alert-success' : 'alert-danger'}>{e.won}</td>
            </tr>
        )

        return <Table striped bordered hover>
            <thead>
            <tr>
                <th className="">#</th>
                <th>Adversaire</th>
                <th>Victoire/Défaite</th>
            </tr>
            </thead>
            <tbody>
            {Tabstatistiques}
            </tbody>
        </Table>
    }
}

export default Stats