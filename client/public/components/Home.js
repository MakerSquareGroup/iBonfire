import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import DragAndDrop from './DragAndDrop';


export default class Home extends Component {
	render() {
    return (
      <div id="Home">
        <GoogleMap/>
      <div id="map">
        <Gmaps
          width={'800px'}
          height={'600px'}
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
    );
  }
}