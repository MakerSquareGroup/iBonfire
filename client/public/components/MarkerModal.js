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

    return (
      <div className='marker-modal'>
        <h1 className='marker-tag'>{markerData.tags}</h1>
        <h2 className='marker-description'>{markerData.description}</h2>
        <img className='marker-modal-pic' src={`http://graph.facebook.com/${markerData.createdBy}/picture?type=normal`}/>
        <p>{markerData.cityState}</p>
        <MuiThemeProvider>
          <RaisedButton className='join-bonfire-btn' label="Join Bonfire" onClick={() => this.joinBonfire(currUser.id, markerData.id)}></RaisedButton>
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