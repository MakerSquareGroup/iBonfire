import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { facebookLogout, facebookInit } from '../helpers/fbHelper';

import { default as InfoBox } from '../../../node_modules/react-google-maps/lib/addons/InfoBox';

import BonfireModal from './BonfireModal';
import MarkerModal from './MarkerModal';
import { connect } from 'react-redux';
import { allActions } from './App';
import { Provider } from 'react-redux';

import { store } from '../../index';

class BonfireMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowOpen: this.props.hoverMarker.windowOpen,
			location: {
				lat: this.props.location.lat || Number(localStorage.getItem('latitude')), 
				lng: this.props.location.lng || Number(localStorage.getItem('longitude'))
			},
			markers: this.props.markers
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.renderInfoWindow = this.renderInfoWindow.bind(this);
	}

	componentWillMount() {
		if(!this.props.facebook.currUser.id) {
			this.props.getCurrentUser();
		}

		if(!this.props.markers) {
			this.props.getMarkers();
		}
	}

	componentDidMount() {
		if(this.props.facebook.currUser.id) {
			this.props.getUserDB(this.props.facebook.currUser.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		const location = this.props.location;
		const nextLocation = nextProps.location;
		const search = this.props.search.searchCoords;
		const nextSearch = nextProps.search.searchCoords;
		const nextUser = nextProps.users.userData

		if(!this.state.location.lat || !this.state.location.lng) {
			if(nextLocation.lat && nextLocation.lng) {
				return this.setState({
					location: {
						lat: nextLocation.location.lat,
						lng: nextLocation.location.lng
					}
				});
			}
		}

		if(search.latitude !== nextSearch.latitude || search.longitude !== nextSearch.longitude) {
			this.setState({
				location: {
					lat: nextSearch.latitude,
					lng: nextSearch.longitude
				}
			});
		}

		if(this.props.markers.length !== nextProps.markers.length) {
			return this.props.getMarkers();
		}

		if(this.state.markers !== nextProps.markers) {
			this.setState({
				markers: nextProps.markers
			});
		}

		if(nextProps.hoverMarker.windowOpen === false && this.state.windowOpen === true) {
			this.closeModal(this.props.hoverMarker.markerData);
		}
	}

	handleMapClick(event) {
		const lat = event.latLng.lat();
		const long = event.latLng.lng();
		const markerObject = {
			position: { lat: lat, lng: long }
		}
		const changed = this.props.changeClass.changed;
		
		if(this.props.showDrawer) {
			this.props.drawerToggle(!this.props.showDrawer);
			return;
		}

		if(this.state.windowOpen) {
			return this.closeModal(this.state.markers[this.state.markerIndex]);
		}
		
		if(changed.bonfireModal !== 'hidden') {
			return this.props.changeBonfireModalClassName("fadeOut")
		} else {
			this.props.changeBonfireModalClassName("fadeIn");
		}

		this.setState({
			location: {
				lat: lat,
				lng: long
			}
		});
		this.props.setCurrentMarker(markerObject);
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

		if(this.state.windowOpen) {
			this.closeModal(this.state.markers[this.state.markerIndex]);
		}

		this.setState({
			windowOpen: false,
			location: {
				lat: lat, 
				lng: lng
			}
		});
	}

	openModal(target) {
		const bonfireModal = this.props.changeClass.changed.bonfireModal;
		const latProp = this.props.users.userData.latitude;
		const lngProp = this.props.users.userData.longitude;

		if(bonfireModal !== 'hidden' || this.props.hoverMarker.windowOpen || window.gettingLocation) {
			return;
		}

		this.props.getHoverMarker(target);

		let indexMarker = "";

		let markers = this.state.markers.map((marker, index) => {
				if(marker === target) {
					indexMarker = index;
					return {
						...marker,
						showInfo: true,
					};
				}
				return marker;
		});

		this.props.displayHoverModal();

		this.setState({
			windowOpen: true,
			markers: markers,
			markerIndex: indexMarker
		});
	}

	closeModal(target) {
		const markers = this.state.markers;
		const index = this.state.markerIndex;
		let targetMarker = markers[index]
		if(!targetMarker && this.props.hoverMarker.markerData) {
			this.setState({
				windowOpen: false,
				markers: markers
			});
			return this.props.hideHoverModal(this.props.hoverMarker.markerData);
		}

		targetMarker.showInfo = false;
		this.setState({
			windowOpen: false,
			markers: [...markers.slice(0, index),
				targetMarker, ...markers.slice(index + 1)
			]
		});
		this.props.hideHoverModal(target);
	}

	renderInfoWindow(ref, marker) {
		return (
			<InfoBox key={ref} options={{ closeBoxURL: '', enableEventPropagation: true }}>
				<div>
					<MarkerModal store={store} closeModal={this.closeModal} />
				</div>
			</InfoBox>
		)
	}

	render() {

		return (

				<GoogleMapLoader
				  containerElement={
				    <div style={{ height: "100%" }}/>
				  }
				  googleMapElement={
				    <GoogleMap
							ref="googleMap"
							defaultZoom={15}
				      onCenterChanged={this.newCenter.bind(this)}
				      center={this.state.location}
				      defaultCenter={this.props.location}
				      onClick={this.handleMapClick.bind(this)}
				      defaultOptions={{
			          styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
			        }}
				    >

				   	{this.state.markers.map((marker, index) => {
		    			let position = {
		    				lat: Number(marker.latitude),
		    				lng: Number(marker.longitude)
		    			}
		    			const ref = `marker_${index}`;
		    			return (
			    			<Marker
					    		icon='../media/newBonfire.png'
					    		position={position}
					    		defaultAnimation={2}
					    		key={index}
					    		ref={ref}
					    		value={marker}
					    		onMouseover={() => this.openModal(marker)}
				    		>
			    				{marker.showInfo ? this.renderInfoWindow(ref, marker) : null }

			    			</Marker>
		    			)
		    		})}

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
		location: state.location,
		changeClass: state.changeClass,
		facebook: state.facebook,
		search: state.search,
		currentMarker: state.currMarker,
		hoverMarker: state.hoverMarker,
		showDrawer: state.showDrawer
	}
}

export default connect(mapStateToProps, allActions)(BonfireMap);
