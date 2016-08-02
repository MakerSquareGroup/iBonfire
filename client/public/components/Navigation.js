import React from 'react';
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


export default class Navigation extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	render(){
		return (
			<div id="Navigation">
					<div id="NavLogo">
        		<img src="../media/iBonfireLogo.png"/>
      		</div>
		   		<div id="SearchBar">
			      <form id="demo-2">
			        <input type="search" placeholder="Search"/>
			      </form>
			    </div>
			    <div id="DropDown">
				    <MuiThemeProvider>
					    <IconMenu
					      iconButtonElement={<IconButton><DownArrowIcon style={{'width':'100px','height':'100px'}} color={'white'}/></IconButton>}
					      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					      targetOrigin={{horizontal: 'right', vertical: 'top'}}
							>
					    <MenuItem>
								Log Out
							</MenuItem>
					    </IconMenu>
				    </MuiThemeProvider>
			    </div>
			    
		  	</div>


		)
	}
	
}