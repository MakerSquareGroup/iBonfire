import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'react-redux';
import * as actions from '../actions/index';
import * as chatActions from '../actions/chats';
import * as profileActions from '../actions/profile';
import * as menuActions from '../actions/menuActions';
import * as drawer from '../actions/drawer';
import { facebookInit } from '../helpers/fbHelper';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const allActions = { ...actions, ...chatActions, ...profileActions, ...menuActions, ...drawer };


injectTapEventPlugin();


class App extends Component {
	constructor(props) {
		super(props);
	}

  componentWillMount() {
    if(!this.props.facebook.currUser.id) {
      this.props.getCurrentUser();
    }
  }

  render() {
    return (
    <MuiThemeProvider>
  		<div>
  			{this.props.children}
  		</div>
    </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location,
    facebook: state.facebook
  }
}

export default connect(mapStateToProps, allActions)(App);
