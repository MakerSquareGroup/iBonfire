import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileClass: 'ProfileButtonSmall',
      profileImageClass: 'ProfileImageSmall ProfileImageSmallAnimation'
    }
    this.expandProfile = this.expandProfile.bind(this);
  }
  
  expandProfile(){
    this.setState({
      profileClass: 'ProfileButtonSmall ProfileButtonExpand',
      profileImageClass: 'ProfileImageSmall ProfileImageExpandAnimation',
    })
    this.props.transitionToProfilePage();
  }

	render() {
    return (
      <div className={this.state.profileClass} onClick={this.expandProfile}>
      	<img className={this.state.profileImageClass} src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/>
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

export default connect(mapStateToProps, actions)(ProfileButton);