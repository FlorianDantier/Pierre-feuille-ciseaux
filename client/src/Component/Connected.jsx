import React, {Component} from 'react'
import Button from "react-bootstrap/cjs/Button";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";


class Connected extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            userAreWaiting: false,
            stats: undefined,
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
        this.props.func()
        console.log(this.props.user);
    }

    handlePlayAgainstBot(e)
    {
        e.preventDefault()
        console.log('Want to play against bot...')
        this.props.socket.emit('wantToPlayAgainstBot')
    }

    handleJoinTournament(e)
    {
        e.preventDefault()
        console.log('Want join tournament ...')
        this.props.socket.emit('wantToJoinTournament')
    }

    handleSeeRoom(e)
    {
        e.preventDefault()
        console.log('Presses see rooms')
        this.props.socket.emit('seeRooms')
    }

    handleNextGame(e)
    {
        e.preventDefault()
        console.log('Pressed Btn next game')
        this.props.socket.emit('nextGame')
    }

    render()
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
                <br/>
                <Row className="justify-content-center text-center border-top-10">
                    <Col>
                        <Button onClick={this.handleJoinTournament.bind(this)}>Rejoindre un tournoi</Button>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-center text-center border-top-10">
                    <Col>
                        <Button onClick={this.handleSeeRoom.bind(this)}>Voir les salons rejoint</Button>
                    </Col>
                </Row>
            </Container>
    }
}

export default Connected