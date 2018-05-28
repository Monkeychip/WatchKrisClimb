import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'; //allows me to get state
import { bindActionCreators } from 'redux';
import { cleanStore, fetchCode } from '../actions/actions_index'; //importing activities axios data
import { Link } from 'react-router'; //shows up as anchor tag
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
		this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
	}

	handleLogIn(){
		//should eventually make this an action creator
		window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://${CALLBACK_URI}`;
	}
	handleLogOut(){
		//change this to just redirect home
	    //window.location.href = `http://www.winteredition.io`;
        window.location.href = '../'; //one level up
	    this.props.cleanStore();
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
			  	 onClick={this.handleLogIn}>Log-in
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
			   <div>{button}</div>
			  </div>
			  
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { code: state.code};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({cleanStore, fetchCode}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Menu);

