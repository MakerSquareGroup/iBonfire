import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
    
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BonfireModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      tag: ''
    }
  }
  descriptionBox(event) {
    if(event.keyCode === 13) {
      this.props.changeClassName(true)
      this.setState({
        name: '',
        tag: ''
      })
    }
    // i need to send the description to my actions
    // once my description is in my actions i need to link it up with long/lat of the pin that was dropped to an object with 
    // description. And I need to send that object to the db. 

    // hitting enter also needs to clear the textbox by reseting the classname to hidden and reset state to an empty string
    // this.props.getDescription()
  }

  render() {
    return (
      <div id={this.props.changeClass.hidden || this.props.changeClass.showModal}>
        <div id={this.props.changeClass.bonfireModal}>
          <div id={this.props.changeClass.modelTextBox}>
            <MuiThemeProvider>
              <TextField
                hintText="Description"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}
                onKeyDown={this.descriptionBox.bind(this)}
              />
            </MuiThemeProvider> 
              <br/>
            <MuiThemeProvider>
              <TextField
                hintText="Tag"
                value={this.state.tag}
                onChange={e => this.setState({tag: e.target.value})}
                onKeyDown={this.descriptionBox.bind(this)}
              />
            </MuiThemeProvider>   
          </div>        
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    changeClass: state.changeClass
  }
}

export default connect(mapStateToProps, actions)(BonfireModal);