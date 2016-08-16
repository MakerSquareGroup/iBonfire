import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allActions } from './App';
import { InfoWindow } from 'react-google-maps';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

class MarkerModal extends Component {
  joinBonfire(userId, bonId) {
    if(bonId) {
      this.props.setChatId(bonId);
      this.props.getMessages(bonId);
      this.props.joinBonfire(userId, bonId);
    }
  }

  render() {
    const hoverMarker = this.props.hoverMarker;
    const markerData = hoverMarker.markerData;
    const currUser = this.props.facebook.currUser;
    const style = {
      // "display": "inline-block",
      // "margin": "1em 0 0 0",
      // // "padding": "0.4em 2em",
      // "fontSize": "1.6em",
      // "background": "rgba(223, 88, 76, 1)",
      "color": "rgba(223, 88, 76, .6)"
      // "textShadow": "1px 1px 0 rgba(255,255,255,0.1)",
      // "textDecoration": "none",
      // "border": "solid 1px rgba(223, 88, 76, 1)",
      // "borderRadius": ".5px",
      // "boxShadow": "inset 1px 1px 1px rgba(255,255,255,0.05), inset 0 0 35px rgba(0,0,0,0.6), 0 5px 5px -4px rgba(0,0,0,0.8)"
    }
    return (
      <div className='marker-modal'>
        <h1>Tags: {markerData.tags}</h1>
        <h2>Description: {markerData.description}</h2>
        <img src={`http://graph.facebook.com/${markerData.createdBy}/picture?type=small`}/>
        <p>{markerData.cityState}</p>
        <MuiThemeProvider>
          <RaisedButton id='join-bonfire' style={style} label="Join Bonfire" onTouchTap={() => this.joinBonfire(currUser.id, markerData.id)}></RaisedButton>
        </MuiThemeProvider>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location,
    facebook: state.facebook,
    hoverMarker: state.hoverMarker,
    bonfire: state.bonfire
  };
}

export default connect(mapStateToProps, allActions)(MarkerModal);