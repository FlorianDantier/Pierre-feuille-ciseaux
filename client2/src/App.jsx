import React, { Component } from 'react';
import Registration from './class/Registration'
import Connection from './class/Connection'
import ConnectedView from './ConnectedView'
import Game from './class/Game'

class App extends Component{

  constructor(props)
  {
    super(props)
    this.state = {
      userName: undefined,
      readyToPlay: false,
      partner: {
        id: '',
        name: ''
      }
    }
  }
  
  componentDidMount()
  {
    this.props.socket.on('connected', (userName) => {
      console.log('In socket emit connection');
      this.setState({userName: userName})
    })

    this.props.socket.on('readyToPlay', (p) => {
      console.log('Prêt à jouer')
      console.log(`Your partner is ${p.name}`)
      this.setState({readyToPlay: true, partner: p})
    })
  }

  componentWillUnmount()
  {
    this.props.socket.off('connected')
    this.props.socket.off('readyToPlay')
  }

  render() 
  {
    if(this.state.readyToPlay)
    {
      return <Game socket={this.props.socket} partner={this.state.partner}/>
    }
    else
    {
      if(this.state.userName)
      {
        return  <ConnectedView user={this.state.userName} socket={this.props.socket}/>
      }
      else
      {
        return <React.Fragment>
        <Registration socket={this.props.socket}/>
        <h3>Ou</h3>
        <Connection socket={this.props.socket}/>
      </React.Fragment>
      }
    }
  }
}

export default App;

