import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It's alive!</h1>
        	<div>
        		<Link to="/Home" className="linkFont">Home</Link>
        		</div>
        {this.props.children}
      </div>
    )
  }
}