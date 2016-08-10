import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { facebookLogout, facebookInit } from '../helpers/fbHelper';

import { default as InfoBox } from '../../../node_modules/react-google-maps/lib/addons/InfoBox';

import BonfireModal from './BonfireModal';
import MarkerModal from './MarkerModal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Provider } from 'react-redux';

import { store } from '../../index';

class BonfireMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowOpen: this.props.hoverMarker.windowOpen,
			location: {
				lat: this.props.users.userData.latitude, 
				lng: this.props.users.userData.longitude
			},
			markers: this.props.markers
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.renderInfoWindow = this.renderInfoWindow.bind(this);
	}

	componentWillMount() {
		this.props.getCurrentUser();
		this.props.getMarkers();
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

		if(nextUser.latitude !== this.state.location.latitude || nextUser.longitude !== this.state.location.longitude) {
			return this.setState({
				location: {
					lat: nextUser.latitude,
					lng: nextUser.longitude
				}
			});
		}

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

		if(this.state.windowOpen) {
			return;
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

		if(bonfireModal !== 'hidden' || this.props.hoverMarker.windowOpen) {
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
		if(this.state.location.lat && this.state.location.lng) {
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

				   	{this.state.markers.map((marker, index) => {
		    			let position = {
		    				lat: Number(marker.latitude),
		    				lng: Number(marker.longitude)
		    			}
		    			const ref = `marker_${index}`;
		    			return (
		    			<Marker
			    		icon='../media/BonFire.png'
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
		} else {
			return (
			  <div className="spinner">
	        <div className="double-bounce1"></div>
	        <div className="double-bounce2"></div>
	      </div>
      )
		}
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
