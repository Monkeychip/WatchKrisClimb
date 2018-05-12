import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router'; //shows up as anchor tag
import logo_124_124 from '../../build/assets/images/logo_124_124.png';
import {store} from '../reduxStore';

class MenuNoLogIn extends Component {

    render(){

    console.log(store.getState().code,"meep")

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

/*
    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched),
      // we will update local component state and force component to rerender
      // with new data.

      this.setState({
        items: store.getState().items;
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.items.map((item) => <p> {item.title} </p> )}
      </div>
    );
  }
};
}*/