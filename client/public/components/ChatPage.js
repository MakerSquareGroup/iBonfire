import React, { Component } from 'react';
import socket from 'socket.io-client';
import axios from 'axios';
import { addChatMessage } from '../helpers/chatHelper';

export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: []
    }
  }

  componentDidMount() {
    this.socket = io()
    // console.log(socket, 'this is socket')
    this.socket.on('receive-message', (msg) => {
      this.setState({
        messages: [msg, ...this.state.messages]
      })
    })
  // addChatMessage()
  //   .then((response) )
  }

  // componentWillMount() {
  //   axios.get('bonfireChats')
  // }

  postMessage(msg) {
    return this.state.messages.map((msg, index) => {
      return(
        <li>{msg}</li>
      )   
    })
  }

  handleSubmit(e) {
    e.preventDefault()
      this.socket.emit('new message', this.state.value);
      this.setState({
        messages: [this.state.value, ...this.state.messages],
        value: ''
      }, () => this.setState({
      value: ''
      }))
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return(
      <div  className='chat'>
        <div>
          <ul>
            {this.postMessage()}
          </ul>
        </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input value={this.state.value} onChange={this.handleChange.bind(this)} type='text'/>
          </form>

      </div>
    )
  }
}