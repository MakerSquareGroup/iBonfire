import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProfilePageBonfire from './ProfilePageBonfire';
import ProfilePageBonfirePopup from './ProfilePageBonfirePopUp';
import { allActions } from '../App';
import {updateUserBio, getUserData, getCreatedBonfires} from '../../actions/profile';
import { browserHistory } from 'react-router';

export default class ProfilePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			newBonfires: [],
			bonfiresJoined: '',
			bonfiresCreated: ''
		}
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentWillMount() {
		var currentUser = this.props.facebook.currUser;
		this.props.getUserBonfires(currentUser.id)
		getCreatedBonfires(currentUser.id).then((resp) => {
			this.setState({bonfiresCreated: resp.data.length})
		})
	}

	componentWillUnmount() {
		browserHistory.push('/');
	}

	componentWillReceiveProps(nextProps) {
		this.renderFires(nextProps.bonfire.bonfires);
	}

	handleLogout(){
		this.props.facebookLogout();
	}

	renderFires(bonfires){
		var bonfires = bonfires.map((bonfire, index) => {
			return (
				<ProfilePageBonfire key={index} data={bonfire}/>
			)
		})
		this.setState({
			newBonfires: bonfires,
			bonfiresJoined: bonfires.length
		});
	}

	render(){
		
		return(
			<div>
				<div className="ProfilePageTop">
					<div className="ProfilePageTopLeft">
						<div className="ProfilePageTopName">
							{this.props.facebook.currUser.name}
						</div>
					</div>
					<div className="ProfilePageTopMiddle">
						<img className="ProfilePageTopPicture" src={`https://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/>
					</div>
					<div className="ProfilePageTopRight">
						<div className="ProfilePageTopStats">
							<h>Bonfires Joined : {this.state.bonfiresJoined}</h>
							<h>Bonfires Created : {this.state.bonfiresCreated}</h>
						</div>
					</div>
				</div>
				<div className="MapButtonSmall" onClick={this.props.renderMap}>
					<img  className="MapImageSmall MapImageSmallAnimation" src='../../media/googleMap.png'/>
				</div>
				<div className="LogoutButton" onClick={this.handleLogout}>
					<img src="../../media/logout.png" className="LogoutImage"/>
				</div>
				<div className="ProfilePageMiddle">
					<div className="ProfilePageMiddleMiddle">
						<h1 className="myBonfiresBox">My Bonfires</h1>
						<div className="BonfireHolder">
							{this.state.newBonfires}
						</div>
						<ProfilePageBonfirePopup/>
					</div>
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		bonfire: state.bonfire,
		facebook: state.facebook,
		profile: state.profile
	}
}

export default connect(mapStateToProps, allActions)(ProfilePage);