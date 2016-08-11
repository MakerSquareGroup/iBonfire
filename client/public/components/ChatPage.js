import React, { Component } from 'react';
import socket from 'socket.io-client';
import axios from 'axios';
import { addChatMessage } from '../helpers/chatHelper';
import { connect } from 'react-redux';
import * as actions from 'react-redux';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: []
    }
  }

  componentWillMount() {
    if(this.props.facebook.currUser === '') {
      this.props.getCurrentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.facebook.currUser !== nextProps.facebook.currUser) {
      this.props.getCurrentUser();
    }
  }

  componentDidMount() {
    this.socket = io()
    this.socket.on('receive-message', (msg) => {
      this.setState({
        messages: [msg, ...this.state.messages]
      })
    })

    console.log(this.props, 'this.props')
  }

  postMessage(msg) {
    return this.state.messages.map((msg, index) => {
      return(
        <p className='messages' key={index}>{msg}</p>
      )   
    })
  }

  handleSubmit(e) {
    let chatWindow = document.getElementsByClassName('messageField');
    e.preventDefault()
      this.socket.emit('new message', this.state.value);
      this.setState({
        messages: [...this.state.messages, this.state.value],
        value: ''
      }, () => this.setState({
      value: ''
      }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight))
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
          <h1 className='ChatPageh1'>Chat Page</h1>
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
    facebook: state.facebook
  }
}

export default connect(mapStatetoProps, actions)(ChatPage)

