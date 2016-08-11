import React, {Component} from 'react';
import { connect } from 'react-redux';

export default class ProfilePageBonfire extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}


	handleBonfireClick(){
		this.props.changeBonfireData(this.props.bonfireData);
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

export default connect(mapStateToProps, allActions)(ProfilePageBonfirePopup);