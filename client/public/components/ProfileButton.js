import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class ProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  handleClose = () => {
    this.setState({open: false});
  }
    
  render() {
    return (
      <div>
        <Drawer
          docked={true}
          width={350}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        <div className="ProfileButtonSmall" onMouseEnter={this.handleToggle}>
          <a onClick={this.props.renderProfile}><img className="ProfileImageSmall" src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/></a>
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
    facebook: state.facebook
  };
}

export default connect(mapStateToProps, actions)(ProfileButton);