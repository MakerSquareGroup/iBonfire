import React, {Component} from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { KEY } from '../../apiKeys';

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

export default class GoogleMap extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	onMapCreated(map) {
		map.setOptions({
			disableDefaultUI: true
		});
		marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: 59.327, lng: 18.067}
    });
    marker.addListener('click', toggleBounce);
	};

	onDragEnd(e) {
		console.log('onDragEnd', e);
	};

	onCloseClick() {
		console.log('onCloseClick');
	};

	onClick(e) {
		console.log('onClick', e);
	};


	render(){
		return (
			<div id="GoogleMap">
				<Gmaps
			        width={'100%'}
			        height={'100%'}
			        lat={coords.lat}
			        lng={coords.lng}
			        zoom={12}
			        loadingMessage={'Be happy'}
			        params={{v: '3.exp', key: KEY}}
			        onMapCreated={this.onMapCreated}>
			        <Marker
			          lat={coords.lat}
			          lng={coords.lng}
			          draggable={true}
			          onDragEnd={this.onDragEnd} />
			        <InfoWindow
			          lat={coords.lat}
			          lng={coords.lng}
			          content={'Hello, React :)'}
			          onCloseClick={this.onCloseClick} />
			        <Circle
			          lat={coords.lat}
			          lng={coords.lng}
			          radius={500}
			          onClick={this.onClick} />
	      		</Gmaps>
      		</div>
      )
	}
}