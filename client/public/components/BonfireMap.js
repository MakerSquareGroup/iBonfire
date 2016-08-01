import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

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
		return this.state.markers.map(function(marker) {
				return (
					<Marker
					position={marker.position}
	      	defaultAnimation={2}
					/>
			)
		})
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

			      <Marker
			      	position={this.state.markers[0].position}
			      	defaultAnimation={2}
			        // {...this.state.markers}
			        onRightclick={this.handleMarkerRightclick}
			      />
			       <Marker
			      	position={this.state.markers[1].position}
			      	defaultAnimation={2}
			        // {...this.state.markers}
			        onRightclick={this.handleMarkerRightclick}
			      />
			      {this.renderMarkers()}

			    </GoogleMap>
			  }
			/>
    )
	}
}