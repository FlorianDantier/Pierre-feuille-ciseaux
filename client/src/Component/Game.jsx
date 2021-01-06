import React,  { Component } from 'react'
import Container from "react-bootstrap/cjs/Container"
import Row from "react-bootstrap/cjs/Row"
import Col from "react-bootstrap/cjs/Col"
import Button from "react-bootstrap/cjs/Button"

import ConvertStats from "../ConvertStats"
import gameChoices from "../Enum/gameChoices"
import resultRound from "../Enum/resultRound"

const sizeLeft = 3
const numberManche = 3


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
            if(choice === 0) choice = gameChoices.Pierre
            if(choice === 1) choice = gameChoices.Feuille
            if(choice === 2) choice = gameChoices.Ciseau
            this.setState({
                partnersChoice: choice
            })
        })

        this.props.socket.on('stopGame', () => {
            console.log("Ok game finished ! " + this.props.userName)
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
           const result = ConvertStats.didIWinThisRound(this.state.myChoice, this.state.partnersChoice);
           if(result === resultRound.Win)
           {
                this.setState((prevState) => ({myScore: prevState.myScore + 1}))
           }
           else if(result === resultRound.Loose)
           {
            this.setState((prevState) => ({scoresPartner: prevState.scoresPartner + 1}))
           }
           else if(result === resultRound.MatchNull)
           {
               // On n'ajoute aucun point.
           }
       }

       if(this.state.myScore === numberManche || this.state.scoresPartner === numberManche)
       {
           console.log('In fin partie')
           if(this.state.stopGame === false)
           {
               this.props.socket.emit('gameFinished', this.props.tournament)
           }
       }

       if(this.state.stopGame)
       {
           if(this.props.tournament)
           {
               let isWin = this.state.myScore === 3
               this.props.socket.emit('nextRound', isWin)
           }
           else
           {
               this.props.socket.emit('closeRoom')
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
            console.log('In handleBtn whith partner ...')
            console.log('value of this.props.partner : ', this.props.partner)
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
            currentView = <Container className="bg-light" fluid>
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
                            <Button value={gameChoices.Pierre} onClick={this.handleBtn.bind(this)} variant="dark">Pierre</Button>
                            <Button value={gameChoices.Feuille}  onClick={this.handleBtn.bind(this)} variant="dark">Feuille</Button>
                            <Button value={gameChoices.Ciseau}  onClick={this.handleBtn.bind(this)} variant="dark">Ciseau</Button>
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
        else if(this.props.tournament)
        {
            currentView = <React.Fragment>
                <h1>Partie terminé</h1>
                <Button onClick={(e) => {this.setState({
                    stopGame: false,
                    myScore: 0,
                    scoresPartner: 0
                })}}>Prochain match</Button>
            </React.Fragment>
        }
        else
        {
            currentView = <React.Fragment>
                <h1>Partie terminé</h1>
                <Button onClick={this.props.endGameFct}>Retour à l'accueil</Button>
            </React.Fragment>

        }
        return currentView
    }
}


export default Game