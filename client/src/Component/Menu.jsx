import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import NavDropdown from "react-bootstrap/cjs/NavDropdown";
import Form from "react-bootstrap/cjs/Form"
import Button from "react-bootstrap/cjs/Button";
import FormControl from "react-bootstrap/cjs/FormControl"
import React, {Component} from "react";


export default class Menu extends Component
{
    constructor(props)
    {
        super(props)
    }

    handleLinkHome(e)
    {
        e.preventDefault()
    }

    handleStatsBtn(e)
    {
        e.preventDefault()
        this.props.socket.emit('showStats', this.props.currentUser)
    }

    render()
    {
        return <Navbar variant="dark" bg="primary" expand="lg">
            <Button variant="link">
                <Navbar.Brand href="#home">LIFPROJET</Navbar.Brand>
            </Button>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Button onClick={this.handleLinkHome.bind(this)} variant="link">
                        <Nav.Link href="#home" className="text-white" >Accueil</Nav.Link>
                    </Button>
                    {this.props.currentUser ?
                        <Button onClick={this.handleStatsBtn.bind(this)} variant="link">
                            <Nav.Link href="#link" className="text-white">Statistiques</Nav.Link>
                        </Button>
                    : <React.Fragment/>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}
