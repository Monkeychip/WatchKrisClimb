// @flow

import React from "react";
import { Component } from "react";
import { Link } from "react-router";

import logo from "../../public/assets/images/logo_124_124.png";

type Props = {
  //no props
};

class MenuNoLogIn extends Component<Props> {
  render() {
    return (
      <div className="ui four item menu">
        <div className="item" id="home-logo">
          <Link to="/" className="item">
            <img src={logo} alt="" />{" "}
          </Link>
        </div>
        <Link className="item" to="/about">
          How to <br /> Use
        </Link>
        <Link className="item" to="/table">
          More <br /> Stats
        </Link>
      </div>
    );
  }
}

export default MenuNoLogIn;
