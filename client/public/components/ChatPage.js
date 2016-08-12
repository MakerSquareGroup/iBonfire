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
      messages: null
    }
    // console.log(this.props.bonfire.bonfireId)
  }

  componentWillMount() {
    this.props.getMessages(this.props.bonfire.bonfireId)
    window.flag = true;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.chat.messages)
    if(this.props.chat.messages !== nextProps.chat.messages && !this.state.messages) {
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
    // if(this.props.facebook.currUser === '') {
    //   window.setTimeout(2000);
    // }


    if(!this.state.messages) {
      return;
    }

    if(!this.props.chat.messages){
      return;
    }
    // console.log(this.props.chat.messages, 'this.props')

    if(window.flag && this.props.chat.messages.length) {
      window.flag = false
      console.log('inside the if')
      console.log(this.props.chat.messages, 'what are you messages')
      return this.props.chat.messages.map((msg, index) => {
        return(
          <p className='messages' key={index}><img src={`http://graph.facebook.com/${msg.id_Users}/picture?type=small`} alt=""/>{msg.name}: {msg.messages}</p>
        )   
      })
    }
    
    if(!window.flag) {
      return this.state.messages.map((msg, index) => {
        console.log(this.props.facebook.picture, 'picture');
        console.log(this.props.facebook.currUser.name, 'name')
        return(
          <p className='messages' key={index}><img src={this.props.facebook.picture} alt=""/>{this.props.facebook.currUser.name}: {msg.messages}</p>
        )   
      })
    }
  }

  handleSubmit(e) {
    this.props.addMessage({
      bonfireId: this.props.bonfire.bonfireId,
      message: this.state.value,
      FB_id: this.props.facebook.currUser.id,
      name: this.props.facebook.currUser.name 
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

