import React, { Component } from 'react';
import Registration from './Component/Registration'
import Connection from './Component/Connection'
import Connected from './Component/Connected'
import Game from './Component/Game'
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Menu from "./Component/Menu"

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
      NoFreeRoom: false

    }
  }

  componentDidMount() {
    this.props.socket.on('connected', (userName) => {
      console.log('In socket emit connection');
      this.setState({
        userName: userName
      })
    })

    // Event emit (by the server) when two users are in the same room
    this.props.socket.on('readyToPlay', (p) => {
      console.log('Prêt à jouer')
      console.log(`Your partner is ${p.name}`)
      this.setState({
        readyToPlay: true,
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
  }

  componentWillUnmount()
  {
    this.props.socket.off('connected')
    this.props.socket.off('readyToPlay')
    this.props.socket.off('readyToPlayAgainstBot')
    this.props.socket.off('NoFreeRoom')
  }

  render() {
    let currentView
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
        else
        {
          currentView = <Game socket={this.props.socket} partner={this.state.partner}/>
        }
      }
    }
    else
    {
      if (this.state.userName)
      {
        currentView = <Connected user={this.state.userName} socket={this.props.socket}/>
      }
      else
      {
        // Mettre le tout dans un composant
        currentView = <React.Fragment>
          <Row>
            <Col>
              <Registration socket={this.props.socket}/>
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center bg-dark text-white">
            <h2>Vous avez déjà un compte ?</h2>
          </Row>
          <br/>
          <Row>
            <Col>
              <Connection socket={this.props.socket}/>
            </Col>
          </Row>
        </React.Fragment>
      }
    }
    return <Container fluid>
      <Row>
        <Col>
          <Menu currentUser={this.state.userName} socket={this.props.socket}/>
        </Col>
      </Row>
      <br/>
      {currentView}
      <br/>
    </Container>
  }

}

export default App

