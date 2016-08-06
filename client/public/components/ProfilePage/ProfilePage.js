import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/profile';

export default class ProfilePage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			newBonfires: []
		}
	}

	componentWillMount() {
		var currentUser = this.props.facebook.currUser;
		
		this.props.getUserBonfires('10153814997135687');

	}

	componentWillReceiveProps(nextProps) {
		this.renderFires(nextProps.bonfire.bonfires);
	}

	renderFires(bonfires){
		var bonfires = bonfires.map((bonfire, index) => {
			return (
				<div className="BonfireEntry" key={index}>
					<img className="BonfireEntryImage" src="../../media/Bonfire_2.png"/>
				</div>
			)
		})
		this.setState({newBonfires: bonfires});
	}
	
	render(){
		
		var latinText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

		return(
			<div>
				<div className="ProfilePageTop">
					<div className="ProfilePageLeft">
						<div className="ProfilePageName">
							Dailen Spencer
						</div>
						<div className="ProfilePageUserInfo">
							{latinText}
						</div>
					</div>
					<div className="ProfilePageMiddle">
						<img src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/>
					</div>
					<div className="ProfilePageRight">
						<div className="ProfilePageStats">
							
						</div>
						<div className="ProfilePagePoints">
							67,536
						</div>
					</div>
				</div>
				<div className="BonfireHolder">
					{this.state.newBonfires}
				</div>
				<div className="MapButtonSmall" onClick={this.props.renderMap}>
					<img  className="MapImageSmall MapImageSmallAnimation" src='http://www.appelsiini.net/assets/2008/5/26/tartu.png'/>
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		bonfire: state.bonfire,
		facebook: state.facebook
	}
}

export default connect(mapStateToProps, actions)(ProfilePage);