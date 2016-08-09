import React, { Component } from 'react';
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { facebookLogout } from '../helpers/fbHelper';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { ChatPage } from './ChatPage'
// import { Link } from 'react-router';
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

	logout() {
		facebookLogout();
	}

	goToChat() {
		browserHistory.push('/ChatPage');
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



			    <div id="DropDown">
				    <MuiThemeProvider>
					    <IconMenu
					      iconButtonElement={<IconButton><DownArrowIcon style={{'width':'100px','height':'100px'}} color={'#DF584C'}/></IconButton>}
					      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					      targetOrigin={{horizontal: 'right', vertical: 'top'}}
						>
					    <MenuItem onClick={this.props.facebookLogout}>
								Log Out
							</MenuItem>
							<MenuItem onClick={this.goToChat.bind(this)}>
									Chat
							</MenuItem>
					    </IconMenu>
				    </MuiThemeProvider>
			    </div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		term: state.term,
		facebook: state.facebook
	}
}

export default connect(mapStateToProps, actions)(Navigation);
