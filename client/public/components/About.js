import $ from 'jquery'; 
import React, { Component } from 'react';

export default class About extends Component {

  render() {
    $('body#iBonfire').removeAttr('id');
    return (
    <div id="AboutContainer">
        <header className="header-image">
            <div className="headline">
                <div className="container">
                    <h1><strong>iBonfire</strong></h1>
                    <h2><strong>Light, Join, Enjoy</strong></h2>
                </div>
            </div>
        </header>
     
        <div className="container">
            <hr className="featurette-divider"></hr>
            <div className="featurette">
                <img className="featurette-image img-circle img-responsive pull-right" src="http://p1cdn4static.sharpschool.com/UserFiles/Servers/Server_758978/Image/2013-14/Main%20Calendar%20Graphics/2013%20Homecoming%20Bonfire.gif"></img>
                <h2 className="featurette-heading">Why iBonfire?
                    <span className="text-muted">Well, why the hell not.</span>
                </h2>
                <p className="lead">iBonfire is designed so you, the user, can focus on what is important in life, bonfires. What are bonfires? Bonfires are places of greeting, socializing and change. Light a bonfire to signal other like minded bonfirees or join an existing one and let the living begin!</p>
            </div>

            <hr className="featurette-divider"></hr>
     
            <div className="featurette" id="services">
                <div className="featurette-image img-circle img-responsive pull-left">

                </div>
                <h2 className="featurette-heading">Getting Started.
                    <span className="text-muted">You should probably start here...</span>
                </h2>
                <p className="lead">Click on the reel to the left to go through our super simple tutorial and you will be a bonfire master in no time!</p>
            </div>

            <hr className="featurette-divider"></hr>

            <div className="featurette" id="contact">
                <img className="featurette-image img-circle img-responsive pull-right" src="http://placehold.it/500x500"></img>
                <h2 className="featurette-heading">That's it!
                    <span className="text-muted">What are you waiting for?</span>
                </h2>
                <p className="lead">Continue scrolling down to meet the team or click the big button to get started!</p>
            </div>

            <hr className="featurette-divider"></hr>

            <footer>
                <div className="row">
                    <div className="col-lg-12">
                        <p>Copyright &copy; iBonfire&trade; 2016</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    );
  }
}