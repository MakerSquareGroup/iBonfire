import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import DragAndDrop from './DragAndDrop';


export default class Home extends Component {
	render() {
    return (
      <div id="Home">
        <GoogleMap/>
  
      </div>
    );
  }
}