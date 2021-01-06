import React, { Component } from 'react';
import Connected from './Component/Connected'
import Game from './Component/Game'
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Menu from "./Component/Menu"
import Stats from './Component/Stats'
import Home from './Component/Home'
import MenuChoices from './Enum/menuChoices'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: undefined,
      readyToPlay: false,
      partner: {
        id: '',
        name: ''
      },
      playAgainstBot: false,
      NoFreeRoom: false,
      viewStats: false,
      userAreWaiting: false,
      viewReadyToPlay: false,
      stats: undefined,
      choice: undefined,
      waitingPartnerChoice: false,
      isTournament: false
    }
  }

  componentDidMount()
  {
    this.props.socket.on('connected', (userName) => {
      console.log('In socket emit connection');
      this.setState({
        userName: userName
      })
    })

    // Event emit (by the SocketServer) when two users are in the same room
    this.props.socket.on('readyToPlay', (p) => {
      console.log('Prêt à jouer')
      console.log(`Your partner is ${p}`)
      this.setState({
        readyToPlay: true,
        viewReadyToPlay: true,
        userAreWaiting: false,
        partner: p
      })
    })

    this.props.socket.on('readyToPlayAgainstBot', () => {
      console.log('In playAgainstBot')
      this.setState({
        playAgainstBot: true,
        readyToPlay: true,
      })
    })

    this.props.socket.on('NoFreeRoom', () => {
      console.log('In NoFreeRoom listener')
      this.setState({
        NoFreeRoom: true,
        readyToPlay: true
      })
    })

    this.props.socket.on('getStats', (s) => {
      console.log('in GetStats')
      console.log('Contenue de stats : ', s)
      this.setState({
        stats: s
      })
    })

    this.props.socket.on('MidStartTournament', () => {
      console.log('in MidStartTournament')
      this.setState({
        isTournament: true
      })
      this.props.socket.emit('StartTournament')
    })
  }

  componentWillUnmount()
  {
    this.props.socket.off('connected')
    this.props.socket.off('readyToPlay')
    this.props.socket.off('readyToPlayAgainstBot')
    this.props.socket.off('NoFreeRoom')
  }

  forMenu(buttonWhichPressed)
  {
    switch (buttonWhichPressed)
    {
      case MenuChoices.Connected :
        this.setState({viewStats: false})
        break

      case MenuChoices.stats :
        this.setState({viewStats: true})
        break
    }
  }

  forEndGame()
  {
    this.setState({
      readyToPlay : false,
      userAreWaiting: false,
      partner: undefined
    })

  }

  forGameWait(valueBool)
  {
    this.setState({waitingPartnerChoice: valueBool})
  }

  forConnected()
  {
    this.setState({
      userAreWaiting: true
    })
  }
  // 1 Page d'accueil
  // 2 Page connecté (non en attente d'un partenaire)
  // 3 Page connecté (en attente d'un partenaire)
  // 4 Entrain de jouer
  // 5 Partie Fini
  render() {
    let currentView
    if(this.state.viewStats && this.state.stats)
    {
      currentView = <Stats Statistiques={this.state.stats} user={this.state.userName}/>
    }
    else
    {
      if (this.state.readyToPlay) // Quant on a cliqué soit sur jouer conter un adversaire ou jouer contre un bot
      {
        if(this.state.NoFreeRoom)
        {
          currentView = <h1>Erreur, pas de salon disponible ...</h1>
        }
        else
        {
          if(this.state.playAgainstBot)
          {
            currentView = <Game socket={this.props.socket} partner={false}/>
          }
          else // Dans ce cas là, on est dans l'état où l'on veut joueur contre un vrai joueur
          {
            currentView = <Game waitFunction={this.forGameWait.bind(this)}
                                userName={this.state.userName}
                                isWaiting={this.state.waitingPartnerChoice}
                                socket={this.props.socket}
                                partner={this.state.partner}
                                tournament={this.state.isTournament}
                                endGameFct={this.forEndGame.bind(this)}/>
          }
        }
      }
      else
      {
        if (this.state.userName) // Si on est connecté
        {
            if(this.state.userAreWaiting)
            {
              currentView = <Container className="h-100 bg-dark text-white" fluid>
                <Row className="justify-content-center">
                  <h1>En attente d'un adversaire...</h1>
                </Row>
              </Container>
            }
            else
            {
              currentView = <Connected user={this.state.userName} socket={this.props.socket} func={this.forConnected.bind(this)}/>
            }
        }
        else
        {
          currentView = <Home socket={this.props.socket}/>
        }
      }
    }
    return <Container fluid>
      <Row>
        <Col>
          <Menu currentUser={this.state.userName} socket={this.props.socket} func={this.forMenu.bind(this)}/>
        </Col>
      </Row>
      <br/>
      {currentView}
      <br/>
    </Container>
  }
}

export default App

