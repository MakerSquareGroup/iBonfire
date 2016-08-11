import React, {Component} from 'react';
import { connect } from 'react-redux';

export default class ProfilePageBonfirePopUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}



	render() {
		const popupStyle = {
			width: '400px',
			height:'400px',
			position: 'absolute',
			bottom: '-400px',
			backgroundColor: 'black'
		}
		return (
			<div id="ProfilePageBonfirePopup" style={popupStyle} className={this.state.popupClass}>
			{this.props.profile.popupData}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		bonfire: state.bonfire,
		facebook: state.facebook,
		profile: state.updateUser
	}
}

export default connect(mapStateToProps, allActions)(ProfilePageBonfirePopup);