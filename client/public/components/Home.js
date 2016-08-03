import React, { Component } from 'react';
import BonfireMap from './BonfireMap';
import Navigation from './Navigation';
import DragAndDrop from './DragAndDrop';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Home extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    return (
      <div id="Home">
      	<Navigation/>
        <BonfireMap/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location
  }
}

export default connect(mapStateToProps, actions)(Home);