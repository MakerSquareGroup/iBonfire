import React, { Component } from 'react';
import socket from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import { allActions } from './App';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: this.props.chat.messages || null
    }
  }

  componentWillMount() {
    this.props.getMessages(this.props.bonfire.bonfireId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.messages.length < 1 && nextProps.chat.messages) {
      let chatWindow = document.getElementsByClassName('MessageField');
      this.setState({
        messages: nextProps.chat.messages
      }, () => {
        chatWindow[0].scrollTop = chatWindow[0].scrollHeight
      })
    }
  }

  componentDidMount() {
    let chatWindow = document.getElementsByClassName('MessageField');
    this.socket = io();
    this.socket.on('receive-message', (msg) => {
      this.setState({
        messages: [...this.state.messages, {messages: msg.messages, name: msg.name, id_Users: msg.id_Users}]
      }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight)
    })
  }

  componentWillUnmount() {
    this.setState({
      messages: null
    });
  }

  handleCancel() {
     browserHistory.push('/Home');
  }

  handleSubmit(e) {
    e.preventDefault();
    const messageObj = {
      bonfireId: this.props.bonfire.bonfireId,
      message: this.state.value,
      FB_id: this.props.facebook.currUser.id,
      name: this.props.facebook.currUser.name
    }
    
    this.props.addMessage(messageObj);
    let chatWindow = document.getElementsByClassName('MessageField');
      this.socket.emit('new message', this.state.value);
      this.setState({
        messages: [...this.state.messages, {messages: this.state.value, name: this.props.facebook.currUser.name, id_Users: this.props.facebook.currUser.id}],
        value: ''
      }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  update() {
    window.setTimeout(() => {
      let chatWindow = document.getElementsByClassName('MessageField');
      chatWindow[0].scrollTop = chatWindow[0].scrollHeight  
    }, 100) 
  }

  render() {
    let chatWindow = document.getElementsByClassName('MessageField');
  
    let mappedMessages = this.state.messages.map((msg, index) => {
      this.update()
      if(this.props.facebook.currUser.id === msg.id_Users) {
        return(
          <div className='YourMessage' key={index}>
            <div className="TextHolder">
              <p className="MessageAuthor">{msg.name}</p>
              <p className="MessageText">{msg.messages}</p>
            </div>
            <img className="ChatProfileImage" src={`http://graph.facebook.com/${msg.id_Users}/picture?type=small`} alt=""/>
          </div>
        
        )
      }
      return(
        <div className="OtherMessage" key={index}>
          <img className="ChatProfileImage" src={`http://graph.facebook.com/${msg.id_Users}/picture?type=small`} alt=""/>
          <div className="TextHolder">
            <p className="MessageAuthor">{msg.name}</p>
            <p className="MessageText">{msg.messages}</p>
          </div>
        </div>
        
      )
    })

    return(
      <div  className='ChatPage'>
          <div className='MessageField' ref='msg'>
            {mappedMessages}
          </div>
          <div className="MessageCreator">
            <button className="CancelButton">
              <img className="CancelButtonImage" src="../media/cancelThin.png" onClick={this.handleCancel.bind(this)}/>
            </button>
            <form className='FormBox' onSubmit={this.handleSubmit.bind(this)}>
              <input className='InputBox' value={this.state.value} onChange={this.handleChange.bind(this)} type='text'/>
            </form>
            <button className="SendButton">
              <img className="SendButtonImage" src="../media/up-arrow.png" onClick={this.handleSubmit.bind(this)}/>
            </button>
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

