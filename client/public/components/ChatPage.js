import React, { Component } from 'react';
import socket from 'socket.io-client';
import axios from 'axios';
import { addChatMessage } from '../helpers/chatHelper';

export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      socket: io()
    }
  }

  componentDidMount() {
    // const socket= io()
    // console.log(socket, 'this is socket')
  addChatMessage()
    .then((response) )
  }

  // componentWillMount() {
  //   axios.get('bonfireChats')
  // }

  postMessage(msg) {
    this.setState({
      newMsg: <li>{msg}</li>
    })
  }

  handleSubmit(e) {
    e.preventDefault()
      this.state.socket.emit('new message', this.state.value);
    this.setState({
      value: ''
    })

    this.state.socket.on('receive-message', (msg)  => {
      this.postMessage(msg)
    })
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return(
      <div>
        <div className='chat'>
        <div className="chatMessages">
          <ul>
            {this.state.newMsg}
          </ul>
        </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input id="m" value={this.state.value} onChange={this.handleChange.bind(this)} type='text'/>
          </form>
        </div>
      </div>
    )
  }
}