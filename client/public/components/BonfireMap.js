import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { facebookLogout, facebookInit } from '../helpers/fbHelper';

import BonfireModal from './BonfireModal';
import MarkerModal from './MarkerModal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class BonfireMap extends Component {
	constructor(props) {
		super(props);
      console.log(this.props, 'hisdflhsdf')

		this.state = {
			location: {
				lat: this.props.location.lat, 
				lng: this.props.location.lng
			}
		}
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	componentWillMount() {
		this.props.getCurrentUser();
		this.props.getLocation();
		this.props.getMarkers();
	}

	componentWillReceiveProps(nextProps) {
		const location = this.props.location;
		const nextLocation = nextProps.location;
		const search = this.props.search.searchCoords;
		const nextSearch = nextProps.search.searchCoords;

		if(location.lat !== nextLocation.lat || location.lng !== nextLocation.lng) {
			this.setState({
				location: {
					lat: nextLocation.lat,
					lng: nextLocation.lng
				}
			});
		}

		if(search.latitude !== nextSearch.latitude || search.longitude !== nextSearch.longitude) {
			this.setState({
				location: {
					lat: nextSearch.latitude,
					lng: nextSearch.longitude
				}
			});
		}

		if(this.props.markers.length < nextProps.markers.length) {
			this.props.getMarkers();
		}
	}

	handleMapClick(event) {
		let lat = event.latLng.lat();
		let long = event.latLng.lng();
		let markerObject = {
			position: { lat: lat, lng: long }
		}
		const changed = this.props.changeClass.changed;
		
		if(changed.bonfireModal !== 'hidden') {
			return this.props.changeBonfireModalClassName("fadeOut")
		}

		this.setState({
			location: {
				lat: lat,
				lng: long
			}
		});

		this.props.setCurrentMarker(markerObject);
		this.props.changeBonfireModalClassName("fadeIn");
	}

	logout() {
		if(!window.isLoaded) {
			facebookInit();
		}
		facebookLogout();
	}

	newCenter() {
		let lat = this.refs.googleMap.getCenter().lat();
		let lng = this.refs.googleMap.getCenter().lng();

		this.setState({
			location: {
				lat: lat, 
				lng: lng
			}
		});
	}

	handleMouseOver(marker) {
		if(this.props.changeClass.bonfireModal === 'hidden') {
			this.props.getHoverMarker(marker);
			this.props.displayHoverModal();
		}
	}

	handleMouseOut(event) {
		this.props.hideHoverModal();
	}

	render() {
		return (
			<GoogleMapLoader
			  containerElement={
			    <div style={{ height: "100%" }} />
			  }
			  googleMapElement={
			    <GoogleMap
						ref="googleMap"
						defaultZoom={15}
			      onCenterChanged={this.newCenter.bind(this)}
			      center={this.state.location}
			      defaultCenter={this.props.location}
			      onClick={this.handleMapClick.bind(this)}
			    >

			   	{this.props.markers.map((marker, index) => {
	    			let position = {
	    				lat: Number(marker.latitude),
	    				lng: Number(marker.longitude)
	    			}
	    			return (
	    			<Marker
		    		icon='../media/BonFire.png'
		    		position={position}
		    		defaultAnimation={2}
		    		key={index}
		    		value={marker}
		    		onMouseover={() => this.handleMouseOver(marker)}
		    		onMouseout={() => this.handleMouseOut(marker)}
		    		/>
	    		)
	    		})}

						<BonfireModal />
						<MarkerModal />

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
		location: state.location,
		changeClass: state.changeClass,
		facebook: state.facebook,
		search: state.search,
		currentMarker: state.currMarker,
		hoverMarker: state.hoverMarker
	}
}

export default connect(mapStateToProps, actions)(BonfireMap);
