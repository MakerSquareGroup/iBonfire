import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'react-redux';
import * as actions from '../actions/index';
import { facebookInit } from '../helpers/fbHelper';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();


class App extends Component {
	constructor(props) {
		super(props);
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
    location: state.location
  }
}

export default connect(mapStateToProps, actions)(App);
