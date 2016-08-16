import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allActions } from './App';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class BonfireDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      location: {
        lat: Number(localStorage.getItem('latitude')) || this.props.users.userData.latitude, 
        lng: Number(localStorage.getItem('longitude')) || this.props.users.userData.longitude
      },
      bonfiresInYourCity: [],
      currentCity: ''
    };
  }

  componentWillMount() {
    const stringifiedLatLng = String(this.state.location.lat) + "," + String(this.state.location.lng);
    this.props.convertCoordsToLocation(stringifiedLatLng)
    .then((response) => {
      this.setState({
        currentCity: response.data.results[4].formatted_address
      }, () => {
        return this.props.markers.map((marker) => {
          if(marker.cityState === this.state.currentCity) {
            this.state.bonfiresInYourCity.push(marker)
          }
        })
      })
    })
    .then(() => {
      console.log(this.state.currentCity, this.state.bonfiresInYourCity, 'what is in here');
    })
  }

  componentWillReceiveProps(nextProps) {
  const FB = this.props.facebook.currUser;
    if(FB !== nextProps.facebook.currUser) {
      this.props.getUserBonfires(nextProps.facebook.currUser.id);
    }
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  renderBonfires = () => {
    let mappedBonfires = this.state.bonfiresInYourCity.map((bonfire,index) => {
        return (
          <div id="mainbox" key={index}>
             <div className="card">
                  <p className='cardp'>{bonfire.tags}</p>
                  <p className='cardp'><b>Location: {bonfire.cityState}</b>
                  </p>
                  <p className='cardp'>{bonfire.description}
                  </p>
            </div>
          </div>
        );
      })
      this.setState({mappedBonfires: mappedBonfires});
    }
  
    
  render() {
    return (
      <div id="drawerParent">
        <Drawer
          docked={true}
          width={350}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.renderBonfires}>Bonfires around you</MenuItem>
          <div id="myBonfires">{this.state.mappedBonfires}</div>

        </Drawer>

        <div className="menu ProfileButtonSmall"onMouseEnter={this.handleToggle}>
          <div className="btn trigger">
               <a onClick={this.props.renderProfile}><img className="ProfileImageSmall" src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/></a>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location,
    facebook: state.facebook,
    userBonfires: state.userBonfires,
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps, allActions)(BonfireDrawer);