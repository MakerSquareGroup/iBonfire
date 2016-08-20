import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

export default class TeamList extends Component {

  renderTeamPics() {
  const team = [
    {"pic": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/0ac/183/270b23a.jpg",
    "GH": "https://github.com/SPCMorris",
    "LN": "https://www.linkedin.com/in/spcryanmorris"
    },
    {"pic":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/005/026/314/39edba8.jpg",
    "GH": "https://github.com/mikeynova",
    "LN": "https://www.linkedin.com/in/michael-terranova"
    },
    {"pic":"https://avatars1.githubusercontent.com/u/16300061?v=3&s=460",
    "GH": "https://github.com/SeanML",
    "LN": "https://www.linkedin.com/in/sean-lester-91105042"
    },
    {"pic":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAiqAAAAJGYxMWU3MmRkLTY3ZDMtNDllOC1iNzY1LTFiNTgwMjA5ODk1OQ.jpg",
    "GH": "https://github.com/dailenspencer",
    "LN": "https://www.linkedin.com/in/dailen-spencer-247277110"
    }
  ];

    return team.map((member, index) => {
      return (
        <div className="member" key={index}>
          <div > 
            <img className="teamImgSize" src={member.pic}></img>
          </div>
            <div className="memberLinks GH">
              <a href={member.GH}><img src="https://fleep.io/blog/wp-content/uploads/2014/07/github_icon.png"></img></a>
            </div>
             <div className="memberLinks LN">
              <a href={member.LN}><img src="https://www.contourcasings.co.uk/wp-content/themes/contour/img/icon-li.svg"></img></a>
            </div>
        </div>
      )
    })
  };

  render() {
    return (
      <div className="teamContainer">
        {this.renderTeamPics()}
      </div>
    );
  };
};