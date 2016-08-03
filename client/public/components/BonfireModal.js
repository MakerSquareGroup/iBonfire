import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
    
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BonfireModal extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.changeClass, 'what is the props in de beginning')

    this.state = {
      // hidden: 'hidden'
      // bonfireModal: 'bonfireModal'
    }
  }

  render() {
    console.log('this.props.changeClass', this.props.changeClass);
    return (

      <div id={this.props.changeClass}>
        <div id='modelTextBox'>
          <MuiThemeProvider>
            <TextField
              hintText="Description"
            />
          </MuiThemeProvider>  
        </div>        
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state in mapstatetoprops', state.changeClassName);
  return {
    changeClass: state.changeClass
  }
}

export default connect(mapStateToProps, actions)(BonfireModal);