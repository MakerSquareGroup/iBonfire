import React, { Component } from 'react';

export default class About extends Component {

  render() {

    return (
    <div id="AboutContainer">
        <header className="header-image">
            <div className="headline">
                <div className="container">
                    <h1>iBonfire</h1>
                    <h2>Light, join, enjoy</h2>
                </div>
            </div>
        </header>
     
        <div className="container">
            <hr className="featurette-divider"></hr>
            <div className="featurette" id="about">
                <img className="featurette-image img-circle img-responsive pull-right" src="http://placehold.it/500x500"></img>
                <h2 className="featurette-heading">Why iBonfire?
                    <span className="text-muted">Well, why the hell not.</span>
                </h2>
                <p className="lead">iBonfire is designed so you, the user, to focus on what is important in life, bonfires. What are bonfires? Bonfires are places of greeting, socializing and change. Light a bonfire to signal other like minded bonfirees or join an existing one!</p>
            </div>

            <hr className="featurette-divider"></hr>
     
            <div className="featurette" id="services">
                <img className="featurette-image img-circle img-responsive pull-left" src="http://placehold.it/500x500"></img>
                <h2 className="featurette-heading">Getting Started
                    <span className="text-muted">You should probably start here...</span>
                </h2>
                <p className="lead">Click on the reel to the left to go through our super simple tutorial and you will be a bonfire master in no time!</p>
            </div>

            <hr className="featurette-divider"></hr>

            <div className="featurette" id="contact">
                <img className="featurette-image img-circle img-responsive pull-right" src="http://placehold.it/500x500"></img>
                <h2 className="featurette-heading">That's it!
                    <span className="text-muted">What are yo waiting for?</span>
                </h2>
                <p className="lead">Continue scrolling down to meet the team or click the big button to get started!</p>
            </div>

            <hr className="featurette-divider"></hr>

            <footer>
                <div className="row">
                    <div className="col-lg-12">
                        <p>Copyright &copy; Your Website 2014</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    );
  }
}