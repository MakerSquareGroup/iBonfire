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
      visibleComponent : ''
    }

    this.renderMap = this.renderMap.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount(){
    this.renderMap();
  }

  
  renderMap(){
    const map = (
      <div className="Map">
        <Navigation/>
        <BonfireMap/>
        <ProfileButton renderProfile={this.renderProfile}/>
      </div>
    )
    this.setState({visibleComponent: map})
  }

  renderProfile(){
    const profile =  (
      <div className="ProfilePage">
        <ProfilePage renderMap={this.renderMap}/>
      </div>
      
    )
    this.setState({visibleComponent: profile});
  }



	render() {
    return (
      <div id="Home">
      	{this.state.visibleComponent}
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