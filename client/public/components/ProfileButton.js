import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allActions } from './App';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class ProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    const userId = this.props.facebook.currUser.id;
    const userBonfires = this.props.getUserBonfires(userId);
  // const items = document.querySelectorAll('.circle a');
  //     for(var i = 0, l = items.length; i < l; i++) {
  //       items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        
  //       items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
  //     }

  //     document.querySelector('.menu-button').onclick = function(e) {
  //        e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
  //     }
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  renderBonfires = () => {

  }
    
  render() {
    return (
      <div>
        <Drawer
          docked={true}
          width={350}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.getBonfires}>My Bonfires</MenuItem>

          <div id="mainbox">
            <div className="card">
            <div>
              <img className='cardimg' src="http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16" alt="" />
            </div>
              <p className='cardp'><b>Created By: Rohit Falor</b></p>
              <p className='cardp'>From the restored 540 K Streamliner to the all-new S65 AMG Coupe to the Concept Coupe SUV, last weekend in Monterey was a celebration of the Mercedes-Benz coupe.
              </p>
              <p className='cardp'><b>Join Chat Room!</b></p>
            </div>
          </div>
          
        </Drawer>

        <div className="menu ProfileButtonSmall"onMouseEnter={this.handleToggle}>
          <div className="btn trigger">
               <a onClick={this.props.renderProfile}><img className="ProfileImageSmall" src={`http://graph.facebook.com/${this.props.facebook.currUser.id}/picture?type=large`}/></a>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location,
    facebook: state.facebook
  };
}

export default connect(mapStateToProps, allActions)(ProfileButton);