import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProfilePageBonfire from './ProfilePageBonfire';
import ProfilePageBonfirePopup from './ProfilePageBonfirePopUp';
import { allActions } from '../App';
import {updateUserBio, getUserData, getCreatedBonfires} from '../../actions/profile';


export default class ProfilePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			newBonfires: [],
			edit: false,
			editProfileHeaderClass: 'EditProfileHeader hide',
			profileInfoView: '',
			profileInfoText: '',
			bonfiresJoined: '',
			bonfiresCreated: ''
		}
		this.handleProfilePictureClick = this.handleProfilePictureClick.bind(this);
		this.handleProfilePictureMouseOver = this.handleProfilePictureMouseOver.bind(this);
		this.handleProfilePictureMouseOut = this.handleProfilePictureMouseOut.bind(this);
		this.renderProfileInfoTextArea = this.renderProfileInfoTextArea.bind(this);
		this.renderProfileInfoPlainText = this.renderProfileInfoPlainText.bind(this);
		this.handleProfileInfoTextAreaChange = this.handleProfileInfoTextAreaChange.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentWillMount() {
		var currentUser = this.props.facebook.currUser;
		this.props.getUserBonfires(currentUser.id)
		getUserData(this.props.facebook.currUser.id).then((resp) => {
			this.setState({profileInfoText: resp.data.bio})
		})
		getCreatedBonfires(currentUser.id).then((resp) => {
			this.setState({bonfiresCreated: resp.data.length})
		})
	}

	componentDidMount() {

		this.setState({
			edit: false,
			editProfileHeaderClass: 'EditProfileHeader hide',
			profileInfoText: ''
		})
	}

	componentWillReceiveProps(nextProps) {
		this.renderFires(nextProps.bonfire.bonfires);
	}


	handleProfilePictureClick(){
		if(this.state.edit){
			var profileInfoPlainText = this.renderProfileInfoPlainText();
			this.setState({profileInfoView: 'plainText'})
			updateUserBio(this.props.facebook.currUser.id,this.state.profileInfoText);
		} else {
			var profileInfoTextArea = this.renderProfileInfoTextArea();
			this.setState({profileInfoView: 'textArea'})
		}
		this.setState({edit : !this.state.edit });
	}

	handleProfilePictureMouseOver(){
		this.setState({editProfileHeaderClass: 'EditProfileHeader show'})
	}
	
	handleProfilePictureMouseOut(){
		this.setState({editProfileHeaderClass: 'EditProfileHeader hide'})
	}

	handleProfileInfoTextAreaChange(e){
		this.setState({profileInfoText: e.target.value});
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

	renderProfileInfoPlainText(){
		return (
			<h className="ProfileInfoPlainText">{this.state.profileInfoText}</h>
		)
	}

	renderProfileInfoTextArea(){
		return (
			<textArea className="ProfileInfoTextArea" value={this.state.profileInfoText} onChange={this.handleProfileInfoTextAreaChange}>
			</textArea>
		)
	}

	render(){
		
		return(
			<div>
				<div className="ProfilePageTop">
					<div className="ProfilePageTopLeft">
						<div className="ProfilePageTopName">
							{this.props.facebook.currUser.name}
						</div>
						<div className="ProfilePageTopUserInfo">
							{this.state.edit ? this.renderProfileInfoTextArea() : this.renderProfileInfoPlainText() }
						</div>
					</div>
					<div className="ProfilePageTopMiddle">
						<img className="ProfilePageTopPicture"  onClick={this.handleProfilePictureClick} onMouseOver={this.handleProfilePictureMouseOver} onMouseOut={this.handleProfilePictureMouseOut} src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/>
						<h className={this.state.editProfileHeaderClass}>{this.state.edit ? 'Save Profile' : 'Edit Profile'}</h>
					</div>
					<div className="ProfilePageTopRight">
						<div className="ProfilePageTopStats">
							<h>Bonfires Joined : {this.state.bonfiresJoined}</h>
							<h>Bonfires Created : {this.state.bonfiresCreated}</h>
						</div>
					</div>
				</div>
				<div className="BonfireHolder">
				</div>
				<div className="MapButtonSmall" onClick={this.props.renderMap}>
					<img  className="MapImageSmall MapImageSmallAnimation" src='http://www.appelsiini.net/assets/2008/5/26/tartu.png'/>
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
					</div>
				</div>
				<ProfilePageBonfirePopup/>
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