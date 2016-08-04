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
<<<<<<< 9cce434ccd5d8eac582af20bc02627c4dd5ba025
    facebook: state.facebook
=======
    profilePicture: state.profilePicture
>>>>>>> [Merge] Fix merge conflicts
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps, actions)(ProfileButton);