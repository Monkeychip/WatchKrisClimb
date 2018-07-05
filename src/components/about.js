import React, { Component } from 'react';
import Mailto from 'react-mailto';

import '../App.css';
import MenuNoLogIn from '../components/menuNoLogIn';

class About extends Component {
	render(){
    return(
		  <div id="about-holder" className="ui centered grid container "> 
        <MenuNoLogIn />
         <div className="row">
            <h2 id="how-to-use-title">How To Use</h2>
            <p id="how-to-use-p">
              Click the login button.  You should be redirected to Strava to authenticate the app.
              Once authenticated, you'll be redirected back to the app, with your data loading (the data the you see without loggin in, is dummy data).
              <br />
              <br />
              The App scans through all of your activities in the last two years, and adds elevation up for all of them.
              The opening screen compares this year's vs last year's data.
              <br />
              <br />
              NOTE: the app only looks at your public activities.  If you mark files as private, they won't be included in the calculations.
              <br />
              <br />
              Everything should be self-explanatory.  If it's not I probably need to adjust the UI. If that's the case, send me an email.
            </p>
              <h3>Comment, constructive feedback or feature request?</h3>
                 <div className="sixteen wide column">
                    <div className="field">
                      <Mailto email="argarbarino@gmail.com" obfuscate={false} id="submit-button" className="ui inverted blue button ">
                        Email me!
                      </Mailto>
                    </div>
                  </div>
          </div>
      </div>
		)
	}
}

export default About;





