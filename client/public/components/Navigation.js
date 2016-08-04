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
		console.log(searchValue);
		this.props.searchAction(searchValue);
		this.setState({
			searchBox: ""
		});
	}

	logout() {
		facebookLogout();
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
					      iconButtonElement={<IconButton><DownArrowIcon style={{'width':'100px','height':'100px'}} color={'white'}/></IconButton>}
					      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					      targetOrigin={{horizontal: 'right', vertical: 'top'}}
						>
					    <MenuItem onClick={this.logout}>
								Log Out
						</MenuItem>
					    </IconMenu>
				    </MuiThemeProvider>
			    </div>
			    
			</div>
		)
	}
}

// <input className="form-control" type="text" defaultValue={this.state.event.name} placeholder="Enter a name" ref="name"/>

const mapStateToProps = state => {
	return {
		term: state.term
	}
}

export default connect(mapStateToProps, actions)(Navigation);