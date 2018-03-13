import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'; //allows me to get state
import * as actions from '../actions/actions_index'; 
import { CALLBACK_URI } from '../actions/types';
import logo_124_124 from '../../build/assets/images/logo_124_124.png';
import { Link } from 'react-router'; //shows up as anchor tag


//TO DO - move to Container folder because it's CONNECTING TO REDUX
class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: false,
			aboutPath: '/about',
			homePath: '/'
		}; //initial state to not logged in
		this.handleClick = this.handleClick.bind(this);
	}

	//Everytime the component mounts check if there is a code in the URL
	componentDidMount(){
		let calltheFetchCodeFunction = this.props.fetchCode() ;
		let codeReplace = this.props.code;

		if(!codeReplace){
			this.setState({
				isLoggedIn: false,
				aboutPath: "/about",
				homePath: "/"
			});	
		}else{
			//If there is a code in the URL fetch Activities with the code and change text and color
			this.setState({
				isLoggedIn: true,
				aboutPath: `about/?state=&code=${codeReplace}`,
				homePath:  `/?state=&code=${codeReplace}`
			});		
			
		};
	}
	handleClick(){
		//should eventually make this an action creator
		window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://${CALLBACK_URI}`;
	}
	handleLogOut(){
	    window.location.href = `http://www.winteredition.io`;	   
	}

	render(){
		
		let button = null
		
		if(this.state.isLoggedIn){ //true
			
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
			   <div isLoggedIn={this.state.isLoggedIn}>{button}</div> {/*getting error here on the isLoggedInProperty on the div tag*/}
			  </div>
			  
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { code: state.code}; //see combined reducers call code: CodeReducer it will show up now as props inside menu
}
//function mapDispatchToProps(dispatch){ return bindActionCreators({fetchCode}),dispatch;}

export default connect(mapStateToProps,actions)(Menu);

//export default connect(null,actions)(Menu);//

//connect makes HOC.  
//Making connection to provider (see index.js.)  provider has access to Redux state.
//So you end up exporting the composed or enhanced version of Menu