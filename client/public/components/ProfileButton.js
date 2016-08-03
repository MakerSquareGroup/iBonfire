import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ProfileButton extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    return (
      <div id="ProfileButton">
      	<img src="https://avatars2.githubusercontent.com/u/8779656?v=3&s=460"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps, actions)(ProfileButton);