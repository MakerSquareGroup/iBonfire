import React, { Component } from 'react';
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { facebookLogout } from '../helpers/fbHelper';
import { connect } from 'react-redux';
import { allActions } from './App';
import {browserHistory} from 'react-router';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchBox: ""
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		let searchValue = this.refs.searchValue.value;
		this.props.searchAction(searchValue);
		this.setState({
			searchBox: ""
		});
	}

	showDrawer() {
    this.props.drawerToggle(!this.props.showDrawer);
	}

	logout() {
		facebookLogout();
	}

	routeToAbout() {
		browserHistory.push('/about');
	}

	render() {
		return (
			<div id="Navigation">

				<div id="NavLogo">
        	<img src="../media/iBonfireLogo.png"/>
      	</div>

		   		<div id="SearchBar">
			      <form id="demo-2"
			      onSubmit={this.handleSubmit.bind(this)}>
			        <input
			        type="search"
			        placeholder="Search"
			        value={this.state.searchBox}
			        ref="searchValue"
							onChange={(event) => this.setState({ searchBox: event.target.value })}
							/>
			      </form>
			    </div>
				    <nav id='menu'>
						  <h1 className='mainBtn'>Menu</h1>
						  <ol>
						    <li onClick={this.showDrawer.bind(this)}><a className='menuBtns'>Nearby</a></li>
						    <li onClick={this.props.renderProfile}><a className='menuBtns'>Profile</a></li>
						    <li onClick={this.routeToAbout}><a className='menuBtns'>About</a></li>
						    <li><a className='menuBtns'>Help</a></li>
						    <li onClick={this.props.facebookLogout}><a className='menuBtns'>Logout</a></li>
						  </ol>
						</nav>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		facebook: state.facebook,
		term: state.term,
		facebook: state.facebook,
		users: state.users,
		showDrawer: state.showDrawer
	}
}

export default connect(mapStateToProps, allActions)(Navigation);
