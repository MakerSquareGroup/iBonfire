import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { facebookLogout, facebookInit } from '../helpers/fbHelper';

import BonfireModal from './BonfireModal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class BonfireMap extends Component {
	constructor(props) {
		super(props)
		console.log(props);
		this.state = {
			location: {
				lat: this.props.location.lat, 
				lng: this.props.location.lng
			}
		}
	}

	componentDidMount() {
		this.props.getLocation();
	}

	// componentWillReceiveProps(nextProps) {
	// 	if(this.props.location.lat !== nextProps.location.lat || this.props.location.lng !== nextProps.location.lng) {
	// 		this.setState({
	// 			location: {
	// 				lat: nextProps.location.lat,
	// 				lng: nextProps.location.lng
	// 			}
	// 		});
	// 	}
	// }

	findLocation() {

	}

	handleMapClick(event) {
		let lat = event.latLng.lat();
		let long = event.latLng.lng();
		let markerObject = {
			position: { lat: lat, lng: long }
		}
		this.props.addMarker(markerObject);
		this.props.changeClassName();
	}

	renderMarkers() {
		// console.log('in renderMarkers')
		return this.props.markers.map((marker, index) => {
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

	render() {
		return (
			<GoogleMapLoader
			  containerElement={
			    <div style={{ height: "100%" }} />
			  }

			  googleMapElement={
			    <GoogleMap

			      ref={googleMap => {
			        googleMap && console.log(`Zoom: ${ googleMap.getZoom() }`);
			      }}
			      defaultZoom={10}
			      center={this.state.location}
			      onClick={this.handleMapClick.bind(this)}
			    >
			      {this.renderMarkers()}

						<BonfireModal />

			    </GoogleMap>
		  	}
			/>
    )
	}
}

const mapStateToProps = state => {
	return {
		markers: state.markers,
		users: state.users,
		location: state.location
	}
}

export default connect(mapStateToProps, actions)(BonfireMap);
