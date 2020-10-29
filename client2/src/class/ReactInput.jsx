import React, { Component } from 'react'

class ReactInput extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleChangeValue(event) 
    {
        this.setState({value: event.currentTarget.value})
    }
    render()
    {
        return <React.Fragment>
            <label htmlFor={this.props.id}>{this.props.textLabel}</label>
            <input type={this.props.type} name={this.props.name} id={this.props.id} value={this.state.value} onChange={this.handleChangeValue.bind(this)}/>
        </React.Fragment>
    }
}

export default ReactInput