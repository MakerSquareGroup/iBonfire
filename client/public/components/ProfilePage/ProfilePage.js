import React from 'react';

export default class ProfilePage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			mapButtonClass: 'MapButtonSmall',
      mapButtonImageClass: 'MapImageSmall MapImageSmallAnimation'
		}
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
					<div className="BonfireEntry">
						<img className="BonfireEntryImage" src="../../media/Bonfire_2.png"/>
					</div>
				</div>
				<div className="MapButtonSmall">
					<img  className="MapImageSmall MapImageSmallAnimation" src='http://www.appelsiini.net/assets/2008/5/26/tartu.png'/>
				</div>
			</div>
		)
	}
}