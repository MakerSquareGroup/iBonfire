import React, {Component} from 'react';
// import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
// import { KEY } from '../../apiKeys';

// const coords = {
//   lat: 51.5258541,
//   lng: -0.08040660000006028
// };

export default class BonfireMap extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	// onMapCreated(map) {
	// 	map.setOptions({
	// 		disableDefaultUI: true
	// 	});
	// 	marker = new google.maps.Marker({
 //          map: map,
 //          draggable: true,
 //          animation: google.maps.Animation.DROP,
 //          position: {lat: 59.327, lng: 18.067}
 //    });
 //    marker.addListener('click', toggleBounce);
	// };

	// onDragEnd(e) {
	// 	console.log('onDragEnd', e);
	// };

	// onCloseClick() {
	// 	console.log('onCloseClick');
	// };

	// onClick(e) {
	// 	console.log('onClick', e);
	// };
			// <div id="GoogleMap">
			// 	<Gmaps
			//         width={'100%'}
			//         height={'100%'}
			//         lat={coords.lat}
			//         lng={coords.lng}
			//         zoom={12}
			//         loadingMessage={'Be happy'}
			//         params={{v: '3.exp', key: KEY}}
			//         onMapCreated={this.onMapCreated}>
			//         <Marker
			//           lat={coords.lat}
			//           lng={coords.lng}
			//           draggable={true}
			//           onDragEnd={this.onDragEnd} />
			//         <InfoWindow
			//           lat={coords.lat}
			//           lng={coords.lng}
			//           content={'Hello, React :)'}
			//           onCloseClick={this.onCloseClick} />
			//         <Circle
			//           lat={coords.lat}
			//           lng={coords.lng}
			//           radius={500}
			//           onClick={this.onClick} />
	  //     		</Gmaps>
   //    		</div>


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