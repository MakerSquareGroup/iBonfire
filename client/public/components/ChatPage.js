import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import { allActions } from './App';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import moment from 'moment';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: [],
      chatRoom: this.props.params.bonId
    }
  }

  componentWillMount() {
    this.props.getMessages(this.props.params.bonId);
    this.props.getUserBonfires(this.props.facebook.currUser.id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.messages.length < 1 && nextProps.chat.messages.length >= 1) {
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
    socket.emit('joinChat', this.props.bonfire.bonfireId);
    socket.on('Received socket id of: ', (socketId) => {
      // console.log('Received a socket id of: ', socketId);
    });

    socket.on('message', (msg) => {
      // console.log('New message: ', msg);
      this.setState({
        messages: [...this.state.messages, { messages: msg.messages, name: msg.name, id_Users: msg.id_Users, msg: msg.created_by_User_at }]
      }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight);
    });
  }

  componentWillUnmount() {
    socket.emit('leaveChat', this.props.params.bonId);
    this.setState({
      messages: []
    });
  }

  handleCancel() {
    this.setState({
      messages: []
    });

    browserHistory.push('/home');
  }

  handleSubmit(e) {
    e.preventDefault();
    let chatWindow = document.getElementsByClassName('MessageField');
    const messageObj = {
      bonfireId: this.props.bonfire.bonfireId,
      message: this.state.value,
      FB_id: this.props.facebook.currUser.id,
      name: this.props.facebook.currUser.name
    }
    
    this.props.addMessage(messageObj);
    
    socket.emit('newMessage', { messages: this.state.value, name: this.props.facebook.currUser.name, room: 'Room' + this.props.bonfire.bonfireId });

    this.setState({
      messages: [...this.state.messages, { messages: this.state.value, name: this.props.facebook.currUser.name, id_Users: this.props.facebook.currUser.id,  }],
      value: ''
    }, () => chatWindow[0].scrollTop = chatWindow[0].scrollHeight)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  changeChatRoom(event, index, value) {
    this.setState({
      messages: [],
      chatRoom: value
    });

    socket.emit('leaveChat', this.props.params.bonId);
    socket.emit('joinChat', value);
    this.props.getMessages(value);
  }

  update() {
    window.setTimeout(() => {
      let chatWindow = document.getElementsByClassName('MessageField');
      chatWindow[0].scrollTop = chatWindow[0].scrollHeight  
    }, 100) 
  }

  render() {
    let chatWindow = document.getElementsByClassName('MessageField');

    let mappedChats = this.props.bonfire.bonfires.map((bonfire, index) => {
      return (
        <MenuItem className='dropDownList' key={index} style={{color: 'black'}} value={bonfire.id_Bonfires} primaryText={bonfire.id_Bonfires} />
      )
    });
  
    let mappedMessages = this.state.messages.map((msg, index) => {
      this.update()
      if(this.props.facebook.currUser.id === msg.id_Users) {
        return(
          <div className='YourMessage' key={index}>
            <div className="TextHolder">
              <p className="MessageAuthor">{msg.name}</p>
              <p className="MessageText">{msg.messages}</p>
              <p className='TimePosted'>{moment(msg.created_by_User_at).format('MMMM Do YYYY, h:mm a')}</p>
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
            <p className='TimePosted'>{moment(msg.created_by_User_at).format('MMMM Do YYYY, h:mm a')}</p>
          </div>
        </div>
        
      )
    })

    return(
      <div className='ChatPage'>
        <DropDownMenu value={this.state.chatRoom} onChange={this.changeChatRoom.bind(this)}>
          {mappedChats}
        </DropDownMenu>
          <div className='MessageField' ref='messageField'>
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

