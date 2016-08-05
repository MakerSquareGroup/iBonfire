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
		return(
			<div>
				<div className="BonfireHolder">
					<div className="BonfireEntry">
						<img className="BonfireEntryImage" src="../../media/Bonfire_2.png"/>
					</div>
					<div className="BonfireEntry">
						<img className="BonfireEntryImage" src="../../media/Bonfire_2.png"/>
					</div>
					<div className="BonfireEntry">
						<img className="BonfireEntryImage" src="../../media/Bonfire_2.png"/>
					</div>
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