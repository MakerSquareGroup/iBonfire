import React from 'react';

import { Link } from 'react-router';

import axios from 'axios';


export default class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
		this.handleClick = this.handleClick.bind(this);
	}
  	
  handleClick(){
  	console.log('call axios');
  	axios({
	    method : 'GET',
	    url : 'scrape',
	    headers : {
	    	'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
	    	'Access-Control-Allow-Origin': 'http://localhost:8080/',
	    	'Upgrade-Insecure-Requests' : 1,
	    	'scheme' : 'https',
	    	'accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	    	'accept-encoding' : 'gzip, deflate, sdch, br',
	    	'accept-language' : 'en-US,en;q=0.8',
	    	'cache-control' : 'max-age=0',
	    	'cookie' : 'datr=TujHVs2Y7w_Cp6atOTx4pmvF; pl=n; lu=ghj1YFJPNO1UWKgf7Ul1MWkg; c_user=100003060553236; xs=162%3AA3JCIqOE_GuXyg%3A2%3A1467839134%3A325; fr=0Msm0AwWMqjSfOsuO.AWW4gYwYmv7N5r6Le0lsh7GwrY4.BWx-hQ.1c.FeW.0.0.BXmqcd.AWV2EMYN; csm=2; s=Aa5AHtxDzyCIqjU6.BXfXKe; sb=xwsHV6uVyzT7NGBC5locAVGe; act=1469753857552%2F3; p=-2; presence=EDvF3EtimeF1469754595EuserFA21B03060553236A2EstateFDt2F_5b_5dElm2FnullEuct2F1469734631BEtrFA2loadA2EtwF202703080EatF1469754594835G469754595092CEchFDp_5f1B03060553236F12CC; wd=154x701'

	    }
	    
  	})
  }

  render() {
    return (
      <div>
<<<<<<< 253019b68946576dc1e0d18b294970a4add20184
        <h1>It's alive!</h1>
        	<div>
        		<Link to="/Home" className="linkFont">Home</Link>
        		</div>
=======
        <h1 onClick={this.handleClick}>It's alive!</h1>
>>>>>>> [Feature] Initiate scraping calls
        {this.props.children}
      </div>
    )
  }
}