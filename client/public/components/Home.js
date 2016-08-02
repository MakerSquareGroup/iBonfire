import React, { Component } from 'react';
import BonfireMap from './BonfireMap';
import Navigation from './Navigation';
import DragAndDrop from './DragAndDrop';


export default class Home extends Component {
	render() {
    return (
      <div id="Home">
      	<Navigation/>
        <BonfireMap/>
      </div>
    );
  }
}