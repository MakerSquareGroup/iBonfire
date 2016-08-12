import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allActions } from './App';
import { InfoWindow } from 'react-google-maps';
import Infinite  from 'react-infinite';
import axios from 'axios';

class MarkerModal extends Component {
  constructor(props) {
    super(props);
  }

  joinBonfire(bonId, userId) {
    this.props.joinBonfire(userId, bonId);
    this.props.getMessages(bonId);
  }

  render() {
    const hoverMarker = this.props.hoverMarker;
    const markerData = hoverMarker.markerData;
    const currUser = this.props.facebook.currUser;
    return (
      <div className='marker-modal'>
        <Infinite elementHeight={60}
        containerHeight={180}
        >
          <button onClick={() => this.props.closeModal(markerData)}>Close</button>
          <h1>Tags: {markerData.tags}</h1>
          <p>Bonfire ID: {markerData.id}</p>
          <h2>Description: {markerData.description}</h2>
          <img src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=small`}/>
          <p>{markerData.cityState}</p>
        </Infinite>
        <button id='join-bonfire' onClick={() => this.joinBonfire(currUser.id, markerData.id)}>Join</button>
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