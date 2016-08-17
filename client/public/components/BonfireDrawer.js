import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allActions } from './App';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

class BonfireDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: localStorage.getItem('latitude') || this.props.users.userData.latitude, 
        lng: localStorage.getItem('longitude') || this.props.users.userData.longitude
      },
      bonfiresInYourCity: [],
      currentCity: ''
    };
  window.addEventListener("keydown", this.hideDrawerOnEsc.bind(this));
  }

  componentWillMount() {
    const LatLng = this.state.location.lat + "," + this.state.location.lng;
    this.props.convertCoordsToLocation(LatLng)
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
       this.renderBonfires();
    })
  }

  componentWillReceiveProps(nextProps) {
    const FbCurrUser = this.props.facebook.currUser;
    if(FbCurrUser !== nextProps.facebook.currUser) {
      this.props.getUserBonfires(nextProps.facebook.currUser.id);
    }
  }

  joinBonfire(userId, bonId) {
    if(bonId) {
      this.props.setChatId(bonId);
      this.props.getMessages(bonId);
      this.props.joinBonfire(userId, bonId);
    }
  }

  hideDrawerOnEsc() {
    if(event.keyCode === 27 && this.props.showDrawer) {
      this.props.drawerToggle(!this.props.showDrawer);
    }
  }

  renderBonfires() {
    const currUser = this.props.facebook.currUser;

    let mappedBonfires = this.state.bonfiresInYourCity.map((bonfire,index) => {
    const bonfireId = bonfire.id
        return (
          <div id="mainbox" key={index}>
             <div className="card">
                  <p className='cardp'>{bonfire.tags}</p>
                  <p className='cardp'><b>Location: {bonfire.cityState}</b>
                  </p>
                  <p className='cardp'>{bonfire.description}
                  </p>
                  <p className='cardp'>
                    Bonfire lit: {Moment(bonfire.created_by_User_at).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
              <RaisedButton id='join-bonfire' onTouchTap={() => this.joinBonfire(currUser.id, bonfireId)}>Join</RaisedButton>
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
          open={this.props.showDrawer}
        >
          <div id="myBonfires">{this.state.mappedBonfires}</div>
        </Drawer>


        <div className="menu ProfileButtonSmall">
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
    hoverMarker: state.hoverMarker,
    userInfo: state.userInfo,
    showDrawer: state.showDrawer
  };
}

export default connect(mapStateToProps, allActions)(BonfireDrawer);