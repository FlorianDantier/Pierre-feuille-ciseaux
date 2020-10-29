import React,  { Component } from 'react'

const _ = {
    Pierre: 'Pierre',
    Feuille: 'Feuille',
    Ciseau: 'Ciseau'
}

class Game extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            myChoice: '',
            partnersChoice: '',
            myScore: 0,
            scoresPartner: 0
        }
    }


    componentDidMount()
    {
        this.props.socket.on('partnerHaveChoosed', (value) => {
            console.log('Ok ça marche ! ' + value)
            this.setState({
                partnersChoice: value
            })
        })
    }

    componentDidUpdate()
    {
       if(this.state.myChoice !== '' && this.state.partnersChoice !== '')
       {
           this.setState({
               myChoice: '',
               partnersChoice: ''
           })
           console.log(`Mon choix : ${this.state.myChoice} ; Le choix de mon partenaire : ${this.state.partnersChoice}`)
           if(this.didIWinThisRound(this.state.myChoice, this.state.partnersChoice))
           {
                this.setState((prevState) => ({myScore: prevState.myScore + 1}))
           }
           else
           {
            this.setState((prevState) => ({scoresPartner: prevState.scoresPartner + 1}))
           }
       }
    }

    didIWinThisRound(myChoice, partnersChoice) // Uniquement à appelé dans le if de componentDidUpdate
    {
        if(myChoice === partnersChoice)
        {
            console.log('Match null')
        }
        else if (myChoice === _.Pierre)
        {
            if(partnersChoice === _.Ciseau) return true
            if(partnersChoice === _.Feuille) return false
        }
        else if(myChoice === _.Feuille)
        {
            if(partnersChoice === _.Pierre) return true
            if(partnersChoice === _.Ciseau) return false
        }
        else if(myChoice === _.Ciseau)
        {
            if(partnersChoice === _.Feuille) return true
            if(partnersChoice === _.Pierre) return false
        }

    }

    handleBtn(e)
    {
        const value = e.currentTarget.value
        console.log(`Curent tagret of e : ${value} an type id ${typeof(value)}`)
        this.setState({ myChoice: value })
        this.props.socket.emit('haveChoosed', this.props.partner, e.currentTarget.value)
    }

    render()
    {
        return <React.Fragment>
            <h2>Vous êtes prêt à jouer !</h2>
            <div>
                <button value={_.Pierre} onClick={this.handleBtn.bind(this)}>Pierre</button>
                <button value={_.Feuille}  onClick={this.handleBtn.bind(this)}>Feuille</button>
                <button value={_.Ciseau}  onClick={this.handleBtn.bind(this)}>Ciseau</button>
            </div>
            <div>
                <h3>Mon score : {this.state.myScore}</h3>
                <h3>Score de mon adversaire : {this.state.scoresPartner}</h3>
            </div>
        </React.Fragment>
    }
}


export default Game