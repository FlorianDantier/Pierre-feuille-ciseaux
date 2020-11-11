import React, { Component } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form"
export default class Connection extends Component{

  constructor(props){
    super(props)
    this.state = {
      error: false,
      messageError: <h1>Erreur: utilisateur ou mot de passe incorect </h1>,
  
      userNameValue: '',
      passwordValue: '',
      confirmPasswordValue: ''
    }
  }
  

  handleChangeUserName(event) {
    this.setState({userNameValue: event.currentTarget.value})
  }

  handleChangePassword(event) {
    this.setState({passwordValue: event.currentTarget.value})
  }

  handleButton(e) { // Voir pour trouver le bon type
    e.preventDefault()
    console.log('Btn pressed in onClick function in Registration class');
    if (this.state.passwordValue === '' || this.state.userNameValue === '') {
      console.log('Tous les champs son requis');
    } else {
      this.setState({errorConfirmPassword: false})
      console.log('On emet un event de type "essaie de se connecté');
      this.props.socket.emit('tryingConnection', {
        userName: this.state.userNameValue,
        password: this.state.passwordValue
      })
      this.setState({
        passwordValue: '',
        userNameValue: ''
        })
    }
  }

  render() {

    return <React.Fragment>
      <h1 className="text-lg-center font-weight-bold bg-info">Se connecter :</h1>
      <Form>
        <Form.Group controlId="userName">
          <Form.Label>Nom d'utilisateur :</Form.Label>
          <Form.Control type="text" placeholder="Nom d'utilisateur" value={this.state.userNameValue} onChange={this.handleChangeUserName.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mot de passe :</Form.Label>
          <Form.Control type="password" placeholder="Mot de passe" value={this.state.passwordValue} onChange={this.handleChangePassword.bind(this)}/>
        </Form.Group>

        <Button type="submit" variant="primary" onClick={this.handleButton.bind(this)}>Se connecter</Button>
      </Form>
    </React.Fragment>
  }
}