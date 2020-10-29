import React, { Component } from "react";
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

  onClick(e) { // Voir pour trouver le bon type
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
    return <form>
      <h1>Se connecter</h1>
      <label htmlFor="userName">Nom d'utilisateur : </label>
      <input type="text" id="userNameConnect" name="userNameConnect" value={this.state.userNameValue} onChange={this.handleChangeUserName.bind(this)}/>
      <br />
      <br/>
      <label htmlFor="passwordConnect">Mot de passe</label>
      <input type="password" name="passwordConnect" id="passwordConnect" value={this.state.passwordValue} onChange={this.handleChangePassword.bind(this)}/>
      <br />
      <br/>
      <button type="submit" onClick={this.onClick.bind(this)}>Valider</button>
      {this.state.error ? this.state.messageError : <React.Fragment/> }
    </form>
  }
}