import React, {Component} from 'react'
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Registration from "./Registration";
import Connection from "./Connection";

export default class Home extends Component
{
    render()
    {
       return <React.Fragment>
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