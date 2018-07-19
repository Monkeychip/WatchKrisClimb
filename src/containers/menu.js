import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { cleanStore, logIn } from "../actions/actions_index";
import { Link } from "react-router";

import logo_124_124 from "../../build/assets/images/logo_124_124.png";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutPath: "/about",
      homePath: "/"
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogIn() {
    this.props.logIn();
  }

  handleLogOut() {
    this.props.cleanStore();
    window.location.href = "../";
  }

  render() {
    let button = null;

    if (this.props.code !== "no code") {
      button = (
        <div
          className="ui button"
          id="buttonLogOut"
          onClick={this.handleLogOut}
        >
          Log-out
        </div>
      );
    } else {
      button = (
        <div
          className="ui button"
          ref="buttonTextLogIn"
          onClick={this.handleLogIn}
        >
          Log-in
        </div>
      );
    }
    return (
      <div className="ui four item menu">
        <div className="item" id="home-logo">
          <Link to={this.state.homePath} className="item">
            <img src={logo_124_124} alt="" />{" "}
          </Link>
        </div>
        <Link className="item" to={this.state.aboutPath}>
          How to <br /> Use
        </Link>
        <Link className="item" to="/table">
          More <br /> Stats
        </Link>
        <div className="item">
          <div>{button}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    code: state.code,
    authorizationToken: state.authorizationToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ cleanStore, logIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
