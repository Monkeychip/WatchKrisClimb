//I made the container folder and this file
import React, {Component} from 'react';
import {connect} from 'react-redux'; //imported but some warnings
import {bindActionCreators} from 'redux';
import {fetchProfile} from '../actions/index'; // created this folder under src
/*
class Profile extends Component{
	constructor(props){
		super(props)
		this.state = {term: 'hello'};
		this.getData = this.getData.bind(this);
	}
	getData(){
		this.props.fetchProfile();
	}
	componentDidMount(){ this.getData(); }
	render() {
		if(!this.props.profile) {
			return(
				<div>Loading Profile ...</div>
			);
		}
		return (
            <div id="profile">
                <div className="row"> 
                    <div className=" col-sm-offset-1 col-sm-3">
                        <img id="profile-img" src="https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/16174636_10208641911554341_6942619319573640923_n.jpg?oh=d672e2d89bbd0aa1a41b692a63d28859&oe=59DFBC92"/>
                    </div>
                    <div className="col-sm-8" id="user-info">  
                        <div id="user-name"> <h1>{this.props.profile.firstname} {this.props.profile.lastname}</h1> </div>
                        <div>
                            <ul>
                                <li><h3 className="user-info-num">{this.props.activities.length}</h3> posts</li>
                                <li> <h3 className="user-info-num">{this.props.profile.follower_count}</h3> followers </li>
                                <li><h3 className="user-info-num">{this.props.profile.friend_count}</h3> following</li>
                            </ul> 
                        </div>
                        <div> {this.props.profile.city}, {this.props.profile.state}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({profile, activities}) {
    console.log('profile:', {profile});
    return {profile, activities};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchProfile}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
	}
}*/