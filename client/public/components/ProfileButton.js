import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allActions } from './App';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class ProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
  const FB = this.props.facebook.currUser;

    if(FB !== nextProps.facebook.currUser) {
      this.props.getUserBonfires(nextProps.facebook.currUser.id);
    }
    if(this.props.userBonfires !== nextProps.userBonfires) {
      this.setState({bonfires: nextProps.userBonfires})
    } 
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  renderBonfires = () => {
    console.log(this.state)
    let bonfires = this.state.bonfires;
    let bonfireArray = [];

    if (bonfires) {
      for(var prop in bonfires) {
        bonfireArray.push(bonfires[prop]);
      }

    let mappedBonfires = bonfireArray[0].map((bonfire,index) => {
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
  }
    
  render() {


    return (
      <div id="drawerParent">
        <Drawer
          docked={false}
          width={350}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.renderBonfires}>My Bonfires</MenuItem>
          <div id="myBonfires">{this.state.mappedBonfires}</div>

          <MenuItem onTouchTap={this.renderBonfires}>Joined Bonfires</MenuItem>
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

export default connect(mapStateToProps, allActions)(ProfileButton);