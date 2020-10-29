import React, {Component} from 'react'

class ConnectedView extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { value: ''}
    }

    handleClick(e)
    {
        e.preventDefault()
        this.props.socket.emit('wantToPlay', this.props.user)
        console.log(this.props.user);
    }

    handleOnChange(e)
    {
        this.setState({value: e.currentTarget.value})   
    }

    render()
    {
        return <div>
            <h1>Félicitation {this.props.user} vous êtes connecté !</h1>
            <button onClick={this.handleClick.bind(this)}>Veut jouer</button>
        </div>
    }
}

export default ConnectedView