import React, { Component } from 'react';
import socket from 'socket.io-client';
import axios from 'axios';
import { addChatMessage } from '../helpers/chatHelper';
import { connect } from 'react-redux';
import { allActions } from './App';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: []
    }
    // console.log(this.props.bonfire.bonfireId)
  }

  componentWillMount() {
    this.props.getMessages(this.props.bonfire.bonfireId)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.chat.messages !== nextProps.chat.messages && this.state.messages.length < 1) {
      let chatWindow = document.getElementsByClassName('messageField');
      // chatWindow[0].scrollTop = chatWindow[0].scrollHeight
      this.setState({
        messages: nextProps.chat.messages
      }, () => {
        this.postMessage()
        chatWindow[0].scrollTop = chatWindow[0].scrollHeight
      })
    }
  }

  componentDidMount() {
    this.socket = io()
    this.socket.on('receive-message', (msg) => {
      this.setState({
        messages: [...this.state.messages, {messages: msg}]
      })
    })
  }

  postMessage() {
    if(this.props.facebook.currUser === '') {
      window.setTimeout(2000);
    }
    if(!this.state.messages) {
      return;
    }
    return this.state.messages.map((msg, index) => {
      return(
        <p className='messages' key={index}><img src={this.props.facebook.picture} alt=""/>{this.props.facebook.currUser.name}: {msg.messages}</p>
      )   
    })
  }

  handleSubmit(e) {
    this.props.addMessage({
      bonfireId: this.props.bonfire.bonfireId,
      message: this.state.value,
      FB_id: this.props.facebook.currUser.id 
    })
    let chatWindow = document.getElementsByClassName('messageField');
    e.preventDefault()
      this.socket.emit('new message', this.state.value);
      this.setState({
        messages: [...this.state.messages, {messages: this.state.value}],
        value: ''
      }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return(
      <div  className='chatPage'>
        <div className='chatBox'>
          <div className='messageField'>
            <ul>
              {this.postMessage()}
            </ul>
          </div>
          <form className='formBox' onSubmit={this.handleSubmit.bind(this)}>
            <input className='inputBox' value={this.state.value} onChange={this.handleChange.bind(this)} type='text'/>
          </form>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    facebook: state.facebook,
    bonfire: state.bonfire,
    chat: state.chat
  }
}

export default connect(mapStatetoProps, allActions)(ChatPage)

