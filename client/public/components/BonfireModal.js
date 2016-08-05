import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
    
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BonfireModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      tag: '',
      cityState: '',
      correct: {
        color: 'white'
      }
    }
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount() {
    this.props.changeBonfireModalClassName("fadeOut");
  }

  descriptionBox(event) {
    if(event.keyCode === 13) {
      this.modalValidation();
    }
  }

  modalValidation() {
  let flag = true;
    if(this.state.description.length < 3 || this.state.description.length > 140 ) {
      flag = false;
    }
    if(flag) {
      this.props.changeBonfireModalClassName("fadeOut"); 
      const sendLocation = this.props.convertCoordsToLocation(String(this.props.currentMarker.lat) + ',' + String(this.props.currentMarker.lng));
        return sendLocation
        .then((response) => {
          return this.props.sendDescription({
            description: this.state.description,
            tags: this.state.tag,
            cityState: response.data.results[1].formatted_address,
            latitude: String(this.props.currentMarker.lat),
            longitude: String(this.props.currentMarker.lng),
            createdBy: this.props.facebook.currUser.id
          })
         }) 
        .then(() => {
          return this.setState({
            description: '',
            tag: '',
            cityState: '',
            correct: {
              color: 'white'
            } 
          })
        })  
    } else {
      this.setState({
        description: '',
        tag: '',
        cityState: '',
        correct: {
          color: 'red'
        } 
      })
    }
  }

  handleMouseOut() {
    console.log('you moused out there')
  }

  render() {
    return (
      <div onMouseOver={() => this.handleMouseOut()}>
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
                hintStyle={this.state.correct}
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    changeClass: state.changeClass,
    markers: state.markers,
    currentMarker: state.currMarker,
    facebook: state.facebook
  }
}

export default connect(mapStateToProps, actions)(BonfireModal);