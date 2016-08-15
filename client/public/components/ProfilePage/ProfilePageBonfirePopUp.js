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
			members: [1,2,3,4,5,6,7,8,9,4,2,2,2]
		}

		this.handleCancelClick = this.handleCancelClick.bind(this);
	}

	componentWillReceiveProps(nextProps){
		var bonfireId = nextProps.profile.popupData.id_Bonfires;
		getBonfireData(bonfireId).then((resp) => {
			var location = resp.data.cityState
			var timeAgo = moment(resp.data.created_by_User_at).fromNow()
			getUserData(resp.data.createdBy).then((resp) => {
				var fbImg = resp.data.FB_img;
				var name = resp.data.name
				getBonfireUsers(bonfireId).then((resp) => {
					this.setState({
						creatorImageSrc: fbImg,
						creatorName: name,
						timeAgo: timeAgo,
						location: location
					});
				})
			})
		})
		
	}

	createChips(){
		return this.state.members.map((member, index) => {
			return (
				<Chip 
				style={{'margin':'4px','cursor':'pointer','backgroundColor':'#60DD94'}}
				labelColor='white'
				key={index}
				>Place Holder Name</Chip>
			)
		})
	}

	handleCancelClick(){
		$('.ProfilePageBonfirePopup').addClass('animateDown');
		$('.ProfilePageBonfirePopup').removeClass('animateUp');
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