import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { facebookLogout, facebookInit } from '../helpers/fbHelper';

import { connect } from 'react-redux';
import * as actions from '../actions/index';

export default class BonfireMap extends Component {
	constructor(props){
		super(props)
		this.state = { 
			
		}
	}

	componentWillMount() {

	}

	handleMapClick(event) {
		let lat = event.latLng.lat();
		let long = event.latLng.lng();
		let markerObject = {
			position: { lat: lat, lng: long }
		}
		this.props.addMarker(markerObject);
	}

	renderMarkers() {
		return this.props.markers.map(function(marker, index) {
			return (
				<Marker
				icon="../media/BonFire.png"
				position={marker.position}
      	defaultAnimation={2}
      	key={index}
				/>
			)
		})
	}

	logout() {
		if(!window.isLoaded) {
			facebookInit();
		}
		facebookLogout();
	}

	render(){
		return (
			<GoogleMapLoader

			  containerElement={
			    <div {...this.props} style={{ height: "100%" }} />
			  }

			  googleMapElement={
			    <GoogleMap

			      ref={googleMap => {
			        googleMap && console.log(`Zoom: ${ googleMap.getZoom() }`);
			      }}
			      defaultZoom={3}
			      defaultCenter={{lat: -25.363882, lng: 131.044922}}
			      onClick={this.handleMapClick.bind(this)}
			    >
			      {this.renderMarkers()}

			    </GoogleMap>
		  	}
			/>
    )
	}
}

const mapStateToProps = state => {
	return {
		markers: state.markers
	}
}

export default connect(mapStateToProps, actions)(BonfireMap);
