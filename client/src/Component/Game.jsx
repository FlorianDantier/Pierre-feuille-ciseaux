import React,  { Component } from 'react'
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Button from "react-bootstrap/cjs/Button";

const sizeLeft = 3
const numberManche = 3

const _ = Object.freeze({
    Pierre: 'Pierre',
    Feuille: 'Feuille',
    Ciseau: 'Ciseau'
}) 

const resultROund = Object.freeze({
    Win : 1,
    Loose: -1,
    MatchNull: 0
})

class Game extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            myChoice: '',
            partnersChoice: '',
            myScore: 0,
            scoresPartner: 0,
            stopGame: false
        }
    }


    componentDidMount()
    {
        this.props.socket.on('partnerHaveChosen', (value) => {
            console.log('Listener in Game.jsx : partnerHaveChosen')
            this.setState({
                partnersChoice: value
            })
        })

        this.props.socket.on('botHaveChosen', (choice) => {
            if(choice === 0) choice = _.Pierre
            if(choice === 1) choice = _.Feuille
            if(choice === 2) choice = _.Ciseau
            this.setState({
                partnersChoice: choice
            })
        })

        this.props.socket.on('stopGame', () => {
            console.log("Ok game finished ! ")
            this.setState({
                stopGame: true
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
           const result = this.didIWinThisRound(this.state.myChoice, this.state.partnersChoice);
           if(result === resultROund.Win)
           {
                this.setState((prevState) => ({myScore: prevState.myScore + 1}))
           }
           else if(result === resultROund.Loose)
           {
            this.setState((prevState) => ({scoresPartner: prevState.scoresPartner + 1}))
           }
           else if(result === resultROund.MatchNull)
           {
               // On n'ajoute aucun point.
           }
       }

       if(this.state.myScore === numberManche || this.state.scoresPartner === numberManche)
       {
           console.log('In fin partie')
           if(this.state.stopGame === false)
           {
               this.props.socket.emit('gameFinished')
           }
       }
    }

    didIWinThisRound(myChoice, partnersChoice) // Uniquement à appelé dans le if de componentDidUpdate
    {
        if(myChoice === partnersChoice)
        {
            console.log('match null')
            return resultROund.MatchNull
        }
        else
        {
            if (myChoice === _.Pierre)
            {
                if(partnersChoice === _.Ciseau) return resultROund.Win
                if(partnersChoice === _.Feuille) return resultROund.Loose
            }
            else if(myChoice === _.Feuille)
            {
                if(partnersChoice === _.Pierre) return resultROund.Win
                if(partnersChoice === _.Ciseau) return resultROund.Loose
            }
            else if(myChoice === _.Ciseau)
            {
                if(partnersChoice === _.Feuille) return resultROund.Win
                if(partnersChoice === _.Pierre) return resultROund.Loose
            }
        }
    }

    handleBtn(e)
    {
        const value = e.currentTarget.value
        console.log(`Curent tagret of e : ${value} an type id ${typeof(value)}`)

        this.setState({ myChoice: value })

        console.log(this.props.partner)
        if(this.props.partner !== false)
        {
            this.props.socket.emit('haveChosen', this.props.partner, e.currentTarget.value)
        }
        else
        {
            this.props.socket.emit('PlayAgainstBot')
        }
    }

    render()
    {
        // Revoir ce rendu : trop compliqué et en plus, pas ok du tout, faire quelque chose de plus simple
        let currentView
        if(this.state.stopGame === false)
        {
            currentView =  <Container className="bg-light" fluid>
                <Row>
                    <Col lg={sizeLeft} md={sizeLeft} className="bg-success">
                        <h3>Mon score :</h3>
                    </Col>
                    <Col lg={8} md={8}>
                        <h2>Vous êtes prêt à jouer !</h2>
                    </Col>
                </Row>
                <Row>
                    <Col lg={sizeLeft} md={sizeLeft} className="bg-success">
                        <h3>{this.state.myScore}</h3>
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col lg={sizeLeft} md={sizeLeft} className="bg-dark text-right">
                        <h4 className="text-white">Faites votre choix --></h4>
                    </Col>
                    {this.state.myChoice === "" && this.props.partner || !this.props.partner ?
                        <Col>
                            <Button value={_.Pierre} onClick={this.handleBtn.bind(this)} variant="dark">Pierre</Button>
                            <Button value={_.Feuille}  onClick={this.handleBtn.bind(this)} variant="dark">Feuille</Button>
                            <Button value={_.Ciseau}  onClick={this.handleBtn.bind(this)} variant="dark">Ciseau</Button>
                        </Col>
                        : <h2>En attente du coup adverse</h2>}

                </Row>
                <Row>
                    <Col lg={sizeLeft} md={sizeLeft} className="bg-danger">
                        <h3>Score de mon adversaire :</h3>
                    </Col>
                    <Col lg={8} md={8}>

                    </Col>
                </Row>
                <Row>
                    <Col lg={sizeLeft} md={sizeLeft} className="bg-danger">
                        <h3> {this.state.scoresPartner} </h3>
                    </Col>
                    <Col lg={8} md={8}>

                    </Col>
                </Row>
            </Container>
        }
        else
        {
            currentView = <h1>Partie terminé</h1>
        }
        return currentView
    }
}


export default Game