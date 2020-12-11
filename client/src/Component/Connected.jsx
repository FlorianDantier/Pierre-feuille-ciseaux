import React, {Component} from 'react'
import Button from "react-bootstrap/cjs/Button";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Stats from './Stats'

class Connected extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            userAreWaiting: false,
            stats: undefined
        }
    }

    componentDidMount()
    {
        this.props.socket.on('getStats', (stats) => {
            console.log('in GetStats')
            this.setState({
                stats: stats
            })
        })
    }


    handleLookingForPartner(e)
    {
        e.preventDefault()
        this.props.socket.emit('wantToPlay', this.props.user)
        this.setState({userAreWaiting: true})
        console.log(this.props.user);
    }

    handlePlayAgainstBot(e)
    {
        e.preventDefault()
        console.log('Want to play against bot...')
        this.props.socket.emit('wantToPlayAgainstBot')
    }

    render()
    {
        if(this.state.stats === undefined)
        {
            if(!this.state.userAreWaiting)
            {
                return <Container fluid>
                    <Row className="justify-content-center bg-success text-center">
                        <h1 className="text-white">Félicitation {this.props.user} vous êtes connecté !</h1>
                    </Row>
                    <br/>
                    <Row className="justify-content-center text-center">
                        <Col>
                            <Button onClick={this.handleLookingForPartner.bind(this)} variant="primary">Chercher un adversaire</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="justify-content-center text-center border-top-10">
                        <Col>
                            <Button onClick={this.handlePlayAgainstBot.bind(this)}>Jouer contre un bot</Button>
                        </Col>
                    </Row>
                </Container>
            }
            else
            {
                return <Container className="h-100 bg-dark text-white" fluid>
                    <Row className="justify-content-center">
                        <h1>En attente d'un adversaire...</h1>
                    </Row>
                </Container>
            }
        }
        else
        {
            console.log(this.state.stats)
           return <Stats Statistiques={this.state.stats} user={this.props.user}/>
        }


    }
}

export default Connected