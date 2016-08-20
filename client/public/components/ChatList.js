import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      open: this.props.drawerOpen
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.open !== nextProps.drawerOpen) {
      this.setState({
        open: nextProps.drawerOpen
      });
    }
  }

  closeDrawer() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
       <div id="drawerParent" onMouseOut={this.closeDrawer.bind(this)}>
        <Drawer
          docked={true}
          width={350}
          open={this.state.open}
        >
        </Drawer>
      </div>
    );
  }
}

export default ChatList;