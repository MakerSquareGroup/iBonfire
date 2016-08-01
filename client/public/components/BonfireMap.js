import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { facebookLogout, facebookInit } from '../helpers/fbHelper';


export default class BonfireMap extends Component {
	constructor(props){
		super(props)
		this.state = { 
			markers: [{
				position: {
					lat: -25.363882,
					lng: 131.044922
				}
			},
			{
				position: {
					lat: -25.98098,
					lng: 131.044922
				}

			}]
		}
	}

	componentWillMount() {
		// if(localStorage.token) {
			// if(!window.isLoaded) {
			// 	facebookInit();
			// }
		// }

		// if(!localStorage.token) {
		// 	browserHistory.push('/')
		// }
	}

	handleMapClick(event) {
		// console.log(event.latLng.lat())
		let lat = event.latLng.lat();
		let long = event.latLng.lng();
		// return(
		// 	<Marker
		// 		position={{lat: lat, lng: long}}
		// 	  defaultAnimation={2}
		// 	  />
		// 	)
		// let { markers } = this.state
		// console.log(this.state, 'state from didMOunt')
		this.setState({
			markers: [...this.state.markers, { position: { lat: lat, lng: long } } ]
		})
		console.log(this.state, 'state WHAT ARE YOU?????')
	}

	renderMarkers() {
		return this.state.markers.map(function(marker, index) {
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