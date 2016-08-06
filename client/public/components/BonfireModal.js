import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
    
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class BonfireModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      tag: '',
      correct: {
        color: 'white'
      },
      value: 1
    }
  }

  descriptionBox(event) {
    if(event.keyCode === 13) {
      this.modalValidation('hit enter');
    }
  }

  componentWillReceiveProps(props) {
    if(props.changeClass.changed.bonfireModal === 'hidden') {
      this.setState({
        value: 1
      })
    }
    if(props.changeClass.changed.bonfireModal === 'hidden') {
      this.setState({
        description: ''
      })
    }
  }

  modalValidation(value) {
  let flag = true;
    if(value === 'hit enter') {
      if(this.state.description.length < 3 && this.state.value === 1 || this.state.description.length < 3 && value  === undefined) {
      flag = false;
      this.props.changeBonfireModalClassName('badSubmission');
      this.setState({
            description: ''
            })
      } else if(this.state.description.length > 3 && this.state.value  === 1 || this.state.description.length > 3 && value  === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
        this.setState({
              description: ''
            })
      } else if(this.state.value  === 1 || this.state.value  === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
      } else if(this.state.description.length < 3) {
        flag = false;
        this.props.changeBonfireModalClassName('badDescription');
        this.setState({
              description: ''
            })
      }
    } else if(this.state.description.length < 3 && value === 1 || this.state.description.length < 3 && value === undefined) {
      flag = false;
      this.props.changeBonfireModalClassName('badSubmission');
      this.setState({
            description: ''
          })
      } else if(this.state.description.length > 3 && value === 1 || this.state.description.length > 3 && value === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
        this.setState({
              description: ''
            })
      } else if(value === 1 || value === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
      } else if(this.state.description.length < 3) {
        flag = false;
        this.props.changeBonfireModalClassName('badDescription');
        this.setState({
              description: ''
            })
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
          this.props.changeBonfireModalClassName('fadeOut');
            return this.setState({
              description: '',
              value: 1
            })
        })  
    }
  }

  handleDropDown(event, index, value) {
    this.setState({value: value, tag: event.target.innerText});
    this.modalValidation(value);
  }

  render() {
    return (
      <div className={this.props.changeClass.changed.bonfireModal}>
        <h id="CreateBonfireHeader">Create New Bonfire</h>
        <div id={this.props.changeClass.changed.modelTextBox}>
            <TextField
              underlineFocusStyle={{borderColor: 'red'}}
              hintStyle={this.props.changeClass.changed.textColor}
              inputStyle={{color:'white',fontFamily:'raleway',fontWeight:'300'}}
              hintText={this.props.changeClass.changed.textHint}
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
              onKeyDown={this.descriptionBox.bind(this)}
            />
          <br/>   
          <DropDownMenu value={this.state.value} onChange={this.handleDropDown.bind(this)} labelStyle={this.props.changeClass.changed.dropDownColor}>
            <MenuItem className='dropDownList' style={{color: 'black'}} value={1} primaryText="Tag your Bonfire" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={2} primaryText="#beer" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={3} primaryText="#sports" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={4} primaryText="#politics" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={5} primaryText="#random" />
          </DropDownMenu>
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
    markers: state.markers,
    currentMarker: state.currMarker,
    facebook: state.facebook
  }
}

export default connect(mapStateToProps, actions)(BonfireModal);