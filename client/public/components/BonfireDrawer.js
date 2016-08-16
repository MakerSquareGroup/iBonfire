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
        currentCity: response.data.results
      }, () => {

        for(var j = 0; j < this.props.markers.length; j ++) {
          for(var i = 0; i < this.state.currentCity.length; i ++) {
            if(this.props.markers[j].cityState === this.state.currentCity[i].formatted_address) {
              this.state.bonfiresInYourCity.push(this.props.markers[j])
            }
          }
        }
      
      })
    })
    .then(() => {
      return;
    })
  }

  componentWillReceiveProps(nextProps) {
  const FB = this.props.facebook.currUser;
  console.log(nextProps.currentCity, 'nextProps.currentCity')
    if(nextProps.currentCity) {
      console.log(nextProps.currentCity, 'what is nextProps.currentCity')
    }
    if(FB !== nextProps.facebook.currUser) {
      this.props.getUserBonfires(nextProps.facebook.currUser.id);
    }
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  renderBonfires = () => {
    let mappedBonfires = this.state.bonfiresInYourCity.map((bonfire,index) => {
      console.log(bonfire, 'bonfires')
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