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

  componentWillReceiveProps(nextProps) {
  const FB = this.props.facebook.currUser;

    if(FB !== nextProps.facebook.currUser) {
      this.props.getUserBonfires(nextProps.facebook.currUser.id);
    }
    if(this.props.userBonfires !== nextProps.userBonfires) {
      this.setState({bonfires: nextProps.userBonfires})
    } 
  }
  
  // const items = document.querySelectorAll('.circle a');
  //     for(var i = 0, l = items.length; i < l; i++) {
  //       items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        
  //       items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
  //     }

  //     document.querySelector('.menu-button').onclick = function(e) {
  //        e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
  //     }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  renderBonfires = () => {
    console.log(this.state)
    let bonfires = this.state.bonfires;
    let bonfireArray = [];
    console.log(bonfireArray, "1");

    if (bonfires) {
      for(var prop in bonfires) {
        bonfireArray.push(bonfires[prop]);
      }
      console.log(bonfireArray, "2E");

    let mappedBonfires = bonfireArray[0].map((bonfire,index) => {
        return (
          <div id="mainbox" key={index}>
             <div className="card">
              <ul>
                <li>
                  <div>
                    <img className='cardimg' src={this.state.FB_img} alt="http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16" />
                  </div>
                  <p className='cardp'><b>Created By: {bonfire.createdBy}</b></p>
                  <p className='cardp'><b>Location: {bonfire.cityState}</b>
                  </p>
                  <p className='cardp'>{bonfire.description}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        );
      })
      this.setState({mappedBonfires: mappedBonfires});
    }
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
          <MenuItem onTouchTap={this.renderBonfires}>My Bonfires</MenuItem>

          <div>{this.state.mappedBonfires}</div>
          
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
    facebook: state.facebook,
    userBonfires: state.userBonfires
  };
}

export default connect(mapStateToProps, allActions)(ProfileButton);