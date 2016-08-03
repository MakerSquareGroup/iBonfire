import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
    
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BonfireModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      tag: '',
      cityState: ''
    }
  }

  componentDidMount(){
    this.props.changeBonfireModalClassName("fadeOut")
  }

  descriptionBox(event) {
    if(event.keyCode === 13) {
      this.props.changeBonfireModalClassName("fadeOut")
      this.setState({
        description: '',
        tag: '',
        cityState: ''
      })
    }
    // i need to send the description to my actions
    // once my description is in my actions i need to link it up with long/lat of the pin that was dropped to an object with 
    // description. And I need to send that object to the db. 

    // hitting enter also needs to clear the textbox by reseting the classname to hidden and reset state to an empty string
    // console.log(this.props.markers[this.props.markers.length - 1].position.lat, 'what are the markers')
    // console.log(this.props.markers[this.props.markers.length - 1].position.lng, 'what are the markers')
    // this.props.sendDescription({
    //   modal: {
    //     description: this.state.description,
    //     tags: this.state.tag,
    //     cityState: this.state.cityState,
    //     lat: this.props.markers[this.props.markers.length - 1].position.lat,
    //     lng: this.props.markers[this.props.markers.length - 1].position.lng
    //   }
    // })
  }

  render() {
    return (
        <div className={this.props.changeClass.bonfireModal}>
          <h id="CreateBonfireHeader">Create New Bonfire</h>
          <div id={this.props.changeClass.modelTextBox}>
            <MuiThemeProvider>
              <TextField
              hintStyle={{'color':'white'}}
                inputStyle={{'color':'white','fontFamily':'raleway','fontWeight':'300'}}
                hintText="Tag"
                value={this.state.tag}
                onChange={e => this.setState({tag: e.target.value})}
                onKeyDown={this.descriptionBox.bind(this)}
              />
            </MuiThemeProvider>
            <MuiThemeProvider>
              <TextField
                inputStyle={{'color':'white','fontFamily':'raleway','fontWeight':'300'}}
                hintStyle={{'color':'white'}}
                hintText="City, State"
                value={this.state.cityState}
                onChange={e => this.setState({cityState: e.target.value})}
                onKeyDown={this.descriptionBox.bind(this)}
              />
            </MuiThemeProvider>    
            <MuiThemeProvider>
              <TextField
              inputStyle={{'color':'white','fontFamily':'raleway','fontWeight':'300'}}
              hintStyle={{'color':'white'}}
                hintText="Description"
                value={this.state.description}
                onChange={e => this.setState({description: e.target.value})}
                onKeyDown={this.descriptionBox.bind(this)}
              />
            </MuiThemeProvider>
          </div>
          <div id="CreateBonfireImage">
            
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    changeClass: state.changeClass,
    markers: state.markers
  }
}

export default connect(mapStateToProps, actions)(BonfireModal);