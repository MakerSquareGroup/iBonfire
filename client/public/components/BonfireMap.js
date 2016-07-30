import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default class BonfireMap extends Component {
	constructor(props){
		super(props)
		this.state = { 
		}
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
			      // onClick={this.handleMapClick}
			    >

			      <Marker
			        {...this.state.marker}
			        onRightclick={this.handleMarkerRightclick}
			      />

			    </GoogleMap>
			  }
			/>
    )
	}
}