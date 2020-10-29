import React, { Component } from 'react'

export default class Registration extends Component{
  
    constructor(props){
      super(props)
      this.state = {
        errorConfirmPassword: false,
        messageErrorConfirmPassword: <h1>Erreur: Le mot de passe ne corespond pas à la confimation </h1>,
        userNameValue: '',
        passwordValue: '',
        confirmPasswordValue: '',
      }
    }

   onClick(e) { 
    e.preventDefault()
    console.log('Btn pressed in onClick function in Registration class');
    if (this.state.passwordValue === '' || this.state.userNameValue === '' || this.state.confirmPasswordValue === '') {
      console.log('Tous les champs son requis');
    } else {
      if (this.state.confirmPasswordValue !== this.state.passwordValue) {
        console.log('Erreur password confirm !');
        this.setState({ errorConfirmPassword: true })
        this.setState({
          passwordValue: '',
          confirmPasswordValue: ''
        })
      } else {
        this.setState({errorConfirmPassword: false})
        console.log('On emet un event de type "essaie de s enregistré');
        this.props.socket.emit('tryingRegistration', {
          userName: this.state.userNameValue,
          password: this.state.passwordValue
        })
        this.setState({
          passwordValue: '',
          confirmPasswordValue: '',
          userNameValue: ''
        })
      }
    }
  }

  handleChangeUserName(event) {
    this.setState({userNameValue: event.currentTarget.value})
  }

  handleChangePassword(event) {
    this.setState({passwordValue: event.currentTarget.value})
  }

  handleChangeConfirmPassword(event) {
    this.setState({confirmPasswordValue: event.currentTarget.value})
  }
  
  render() {
    return <form>
      <h1>S'enregister</h1>
      <label htmlFor="userNameRegistration">Nom d'utilisateur : </label>
      <input type="text" id="userNameRegistration" name="userNameRegistration" value={this.state.userNameValue} onChange={this.handleChangeUserName.bind(this)}/>
      <br />
      <br/>
      <label htmlFor="passwordRegistration">Mot de passe</label>
      <input type="password" name="passwordRegistration" id="passwordRegistration" value={this.state.passwordValue} onChange={this.handleChangePassword.bind(this)}/>
      <br />
      <br/>
      <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
      <input type="password" name="confirmPassword" id="confirmPassword" value={this.state.confirmPasswordValue} onChange={this.handleChangeConfirmPassword.bind(this)}/>
      <br />
      <br/>
      <button type="submit" onClick={this.onClick.bind(this)}>Valider</button>
      {this.state.errorConfirmPassword ? this.state.messageErrorConfirmPassword : <React.Fragment/> }
    </form>
  }
}