import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router'; //shows up as anchor tag

import logo_124_124 from '../../build/assets/images/logo_124_124.png';

class MenuNoLogIn extends Component {
  render(){
    return(
      <div className="ui four item menu">
        <div className="item" id="home-logo">
            <Link to="/" className="item"><img src={logo_124_124} alt=""></img> </Link>
        </div>
        <Link className="item" to="/about">How to <br /> Use</Link>
        <Link className="item" to='/table'>More <br /> Stats</Link>
      </div>
    )
  }
}

export default MenuNoLogIn;

