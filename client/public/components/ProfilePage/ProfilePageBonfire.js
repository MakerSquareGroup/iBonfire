import React, {Component} from 'react';
import { connect } from 'react-redux';
import { allActions } from '../App';

export default class ProfilePageBonfire extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
		this.handleBonfireClick = this.handleBonfireClick.bind(this);
	}


	handleBonfireClick(){
		this.props.changeBonfirePopupData(this.props.data);
		$('.ProfilePageBonfirePopup').addClass('animateUp');
		$('.ProfilePageBonfirePopup').removeClass('animateDown');
	}


	render(){
		return (
			<div className="BonfireEntry" onClick={this.handleBonfireClick}>
				<img className="BonfireEntryImage" src="../../media/Bonfire_2.png"/>
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

export default connect(mapStateToProps, allActions)(ProfilePageBonfire);