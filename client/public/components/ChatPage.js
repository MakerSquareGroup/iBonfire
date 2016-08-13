import React, { Component } from 'react';
import socket from 'socket.io-client';
import axios from 'axios';
import { addChatMessage } from '../helpers/chatHelper';
import { connect } from 'react-redux';
import { allActions } from './App';
import ReactDOM from 'react-dom';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: this.props.chat.messages || null
    }
  }

  componentWillMount() {
    this.props.getMessages(this.props.bonfire.bonfireId)
    window.flag = true;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.chat.messages)
    console.log(this.state.messages, 'before if statement')
    if(this.state.messages.length < 1 && nextProps.chat.messages) {
      console.log(this.state.messages, 'state.messages')
      let chatWindow = document.getElementsByClassName('messageField');
      this.setState({
        messages: nextProps.chat.messages
      }, () => {
        chatWindow[0].scrollTop = chatWindow[0].scrollHeight
      })
    }
  }

  componentDidMount() {
    let chatWindow = document.getElementsByClassName('messageField');
    this.socket = io()
    this.socket.on('receive-message', (msg) => {
      this.setState({
        messages: [...this.state.messages, {messages: msg.messages, name: msg.name, id_Users: msg.id_Users}]
      }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight)
    })
    chatWindow[0].scrollTop = chatWindow[0].scrollHeight
  }

  postMessage() {
    if(!this.state.messages) {
      return;
    }

    if(!this.props.chat.messages){
      return;
    }

    if(window.flag && this.props.chat.messages.length) {
      window.flag = false
      
      return this.props.chat.messages.map((msg, index) => {
        // console.log(msg, 'are you here')
        // return(
        //   <p className='messages' key={index}><img src={`http://graph.facebook.com/${msg.id_Users}/picture?type=small`} alt=""/>{msg.name}: {msg.messages}</p>
        // ) 
        return <div>Hhi</div>
      })
      console.log(mappedMessage, 'mappedMessage')
      // return mappedMessage
    }
    
    if(!window.flag) {
      console.log(this.state, 'after initial get')
      console.log(this.props.chat, 'chat state')
      console.log(this.state.messages, 'messages')
      // this.setState({
      //   messages: [...this.state.messages, {id_Users: this.props.facebook.id, name: this.props.facebook.name, messages: this.state.value}]
      // })
      // return(
      //   <p className='messages'><img src={`http://graph.facebook.com/${this.state.messages[message.length -1].id_Users}/picture?type=small`} alt=""/>{this.state.messages[message.length -1].name}: {this.state.messages[message.length -1].messages}</p>
      // )
      // return this.state.messages.map((msg, index) => {
      //   console.log(this.props.facebook.picture, 'picture');
      //   console.log(this.props.facebook.currUser.name, 'name')
      //   return(
      //     <p className='messages' key={index}><img src={this.props.facebook.picture} alt=""/>{this.props.facebook.currUser.name}: {msg.messages}</p>
      //   )   
      // })
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
        messages: [...this.state.messages, {messages: this.state.value, name: this.props.facebook.currUser.name, id_Users: this.props.facebook.currUser.id}],
        value: ''
      }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  update() {
    window.setTimeout(() => {
      let chatWindow = document.getElementsByClassName('messageField');
      chatWindow[0].scrollTop = chatWindow[0].scrollHeight  
    }, 100) 
  }

  render() {
    let chatWindow = document.getElementsByClassName('messageField');
  
    let mappedMessages = this.state.messages.map((msg, index) => {
      this.update()
      if(this.props.facebook.currUser.id === msg.id_Users) {
        return(
        <p className='yourMessages' key={index}><img src={`http://graph.facebook.com/${msg.id_Users}/picture?type=small`} alt=""/>{msg.name}: {msg.messages}</p>
        )
      }
      return(
        <p className='messages' key={index}><img src={`http://graph.facebook.com/${msg.id_Users}/picture?type=small`} alt=""/>{msg.name}: {msg.messages}</p>
      )
    })

    return(
      <div  className='chatPage'>
        <div className='chatBox'>
          <div className='messageField' ref='msg'>
            <div>
              {mappedMessages}
            </div>
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

