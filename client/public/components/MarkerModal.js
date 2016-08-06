import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class MarkerModal extends Component {
  constructor(props) {
    super(props);
  }

  joinBonfire(bonId, userId) {
    console.log("joining bonfire!");
    this.props.joinBonfire(bonId, userId);
  }

  render() {
    const hoverMarker = this.props.hoverMarker;
    const markerData = hoverMarker.markerData;
    const currUser = this.props.facebook.currUser;
    return (
      <div className={hoverMarker.displayClass} onMouseOut={() => this.props.hideHoverModal()}>
        <h2>Bonfire ID: {markerData.id}</h2>
        <h2>Hello, {currUser.name}</h2>
        <h3>{markerData.cityState}</h3>
        <button onClick={() => this.joinBonfire(markerData.id, currUser.id)}>Join</button>
        <h3>{markerData.tags}</h3>
        <h3>{markerData.description}</h3>
        <img src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=small`}/>
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

export default connect(mapStateToProps, actions)(MarkerModal);