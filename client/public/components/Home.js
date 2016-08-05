import React, { Component } from 'react';
import BonfireMap from './BonfireMap';
import Navigation from './Navigation';
import ProfileButton from './ProfileButton';
import DragAndDrop from './DragAndDrop';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import ProfilePage from './ProfilePage/ProfilePage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapClass : 'Map',
      profilePageClass: 'ProfilePage'
    }
    this.transitionToProfilePage = this.transitionToProfilePage.bind(this);
    this.transitionToMap = this.transitionToMap.bind(this);
  }

  componentDidMount(){
   
  }

  transitionToProfilePage(){
    this.setState({
      mapClass: 'Map FadeOutMap',
      profilePageClass: 'ProfilePage FadeInProfilePage'
    })
  }

  transitionToMap(){
    
  }

	render() {
    return (
      <div id="Home">
      	<div className={this.state.mapClass}>
          <Navigation/>
          <BonfireMap/>
          <ProfileButton transitionToProfilePage={this.transitionToProfilePage}/>
        </div>
        <div className={this.state.profilePageClass}>
          <ProfilePage/>
        </div>
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