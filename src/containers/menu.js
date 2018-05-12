import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'; //allows me to get state
import { Link } from 'react-router'; //shows up as anchor tag
import * as actions from '../actions/actions_index'; //change just fetch_code
import { CALLBACK_URI } from '../actions/types';
import logo_124_124 from '../../build/assets/images/logo_124_124.png';
import {store} from "../reduxStore";


class Menu extends Component {

	constructor(props){
		super(props);
		this.state = {
			aboutPath: '/about',
			homePath: '/'
		}; //initial state to not logged in
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		//should eventually make this an action creator
		window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://${CALLBACK_URI}`;
	}
	handleLogOut(){
	    window.location.href = `http://www.winteredition.io`;	   
	}

	render(){
	    //important
        if(!store.getState().code) {
            this.props.fetchCode();
        }

		let button = null

		if(this.props.code){ //true
			
			button = <div
			  	 className="ui button" 
			  	 id="buttonLogOut"
			  	 onClick={this.handleLogOut}>Log-out
			  	</div>
		} else {
			
			button = <div
			  	 className="ui button" 
			  	 ref='buttonTextLogIn'
			  	 onClick={this.handleClick}>Log-in
			  	</div>
		}
		
		return(
			<div className="ui four item menu">
			    <div className="item" id="home-logo"> 
    				<Link to={this.state.homePath} className="item"><img src={logo_124_124} alt=""></img> </Link>
  				</div>
			  <Link className="item" to={this.state.aboutPath}>How to <br /> Use</Link> 
			  <Link className="item" to='/table'>More <br /> Stats</Link>
			  <div className="item">
			   <div>{button}</div> {/*getting error here on the isLoggedInProperty on the div tag*/}
			  </div>
			  
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { code: state.code};
}


export default connect(mapStateToProps,actions)(Menu);

