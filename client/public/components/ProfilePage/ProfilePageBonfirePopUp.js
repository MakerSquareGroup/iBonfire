import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {allActions} from '../App';
import Chip from 'material-ui/Chip';
import {getBonfireData, getUserData, getBonfireUsers} from '../../actions/profile';


export default class ProfilePageBonfirePopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creatorImageSrc: '',
			creatorName: '',
			timeAgo: '',
			location: '',
			description: '',
			tags: '',
			members: []
		};

		this.handleCancelClick = this.handleCancelClick.bind(this);
		this.handeJoinClick = this.handleJoinClick.bind(this);
		this.getUserNames = this.getUserNames.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.profile.popupData.id_Bonfires !== nextProps.profile.popupData.id_Bonfires) {
			const bonfireId = nextProps.profile.popupData.id_Bonfires;
			getBonfireData(bonfireId).then((resp) => {
				const location = resp.data.cityState;
				const timeAgo = moment(resp.data.created_by_User_at).fromNow();
				getUserData(resp.data.createdBy).then((resp) => {
					const fbImg = resp.data.FB_img;
					const name = resp.data.name;
					getBonfireUsers(bonfireId).then((resp) => {
						const userNames = this.getUserNames(resp.data);
						this.setState({
							creatorImageSrc: fbImg,
							creatorName: name,
							timeAgo: timeAgo,
							location: location,
							bonfireId: bonfireId
						});
					})
				})
			});
		}
	}

	getUserNames(users) {
		let userNames = []
		this.setState({
			members: []
		});
		userNames = users.map((user) => {
			getUserData(user.id_Users).then((resp) => {
				let userName = resp.data.name; 
				if(this.state.members.indexOf(userName) === -1) {
					this.setState({
						members: [...this.state.members, resp.data.name ]
					});
				}
			});
		});
	}

	createChips() {
		return this.state.members.map((member, index) => {
			if(member) {
				return (
					<Chip 
					style={{'margin':'4px','cursor':'pointer','backgroundColor':'#FF6F02','height':'33px'}}
					labelColor='white'
					key={index}
					>{member}</Chip>
				)
			}
		});
	}

	handleCancelClick() {
		$('.ProfilePageBonfirePopup').addClass('animateRight');
		$('.ProfilePageBonfirePopup').removeClass('animateLeft');
	}

	handleJoinClick() {
		const bonId = this.state.bonfireId;
		const userId = this.props.facebook.currUser.id;
		this.props.setChatId(bonId);
    this.props.getMessages(bonId);
    this.props.joinBonfire(userId, bonId);
	}

	render() {
		return (
			<div className="ProfilePageBonfirePopup">
				<div className="ProfilePageBonfirePopupTop">
					<div className="ProfilePageBonfirePopupTopLeft">
						<img className="ProfilePageBonfirePopupImage" src={this.state.creatorImageSrc}/>
					</div>
					<div className="ProfilePageBonfirePopupTopRight">
						<h className="BonfirePopupCreatedAt">Created {this.state.timeAgo}</h>
						<h className="BonfirePopupCreatedBy">by {this.state.creatorName}</h>
						<h className="BonfirePopupLocation">at {this.state.location}</h>
					</div>
				</div>
				<div className="ProfilePageBonfirePopupMembers">
					{this.createChips()}
				</div>
				<div className="ProfilePagePopupCancelButton" onClick={this.handleCancelClick}>
					<img className="ProfilePagePopupCancelButtonImage" src="../../media/Cancel.png"/>
				</div>
				<div className="ProfilePagePopupJoinButton" onClick={this.handleJoinClick.bind(this)}>
					<img className="ProfilePagePopupJoinButtonImage" src="../../media/right-arrow.png"/>
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

export default connect(mapStateToProps, allActions)(ProfilePageBonfirePopup);