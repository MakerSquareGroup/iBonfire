import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ProfileButton extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(this.props.profilePicture, "profilePicture");
  }

	render() {
    return (
      <div id="ProfileButton">
      	<img src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location,
    facebook: state.facebook
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps, actions)(ProfileButton);