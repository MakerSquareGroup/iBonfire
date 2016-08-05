import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
    
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
// import label from 'material-ui/DropDownMenu';


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
      this.modalValidation();
    }
  }

  modalValidation() {
  let flag = true;
    if(this.state.description.length < 3 || this.state.description.length > 140 ) {
      flag = false;
      this.props.changeBonfireModalClassName('badSubmission');
      this.setState({
            description: '',
            tag: ''
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
    this.setState({value})
  }

            // <TextField
            //   inputStyle={{'color':'white','fontFamily':'raleway','fontWeight':'300'}}
            //   hintStyle={this.state.correct}
            //   hintText="Description"
            //   value={this.state.description}
            //   onChange={e => this.setState({description: e.target.value})}
            //   onKeyDown={this.descriptionBox.bind(this)}
            // />
  render() {
    return (
      <div className={this.props.changeClass.changed.bonfireModal}>
        <h id="CreateBonfireHeader">Create New Bonfire</h>
<<<<<<< e79d201850adea289dc1246ab2d3b3485d26084e
        <div id={this.props.changeClass.changed.modelTextBox}>
            <TextField
              hintStyle={this.props.changeClass.changed.textColor}
              inputStyle={{color:'white',fontFamily:'raleway',fontWeight:'300'}}
              hintText="Description"
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
              onKeyDown={this.descriptionBox.bind(this)}
            />
          <br/>   
          <DropDownMenu value={this.state.value} onChange={this.handleDropDown.bind(this)} labelStyle={{color: 'white'}}>
            <MenuItem className='dropDownList' style={{color: 'black'}} value={1} primaryText="Tag your Bonfire" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={2} primaryText="#beer" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={3} primaryText="#sports" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={4} primaryText="#politics" />
            <MenuItem className='dropDownList' style={{color: 'black'}} value={5} primaryText="#random" />
          </DropDownMenu>
=======
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
            <IconMenu
                iconButtonElement={<IconButton><DownArrowIcon style={{'width':'100px','height':'100px'}} color={'#DF584C'}/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem onClick={this.logout}>
                  Log Out
                </MenuItem>
              </IconMenu>
          </MuiThemeProvider>
>>>>>>> [Pull] Beginning dropdown for modal
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