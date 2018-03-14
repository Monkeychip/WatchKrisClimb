import React, { Component } from 'react';
import '../App.css';
import Menu from './menu';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm} from 'redux-form';  //reduxForm is like a connect middleware
import Mailto from 'react-mailto';

function emailMe(){
  //
}

class About extends Component {


	render(){
    
		
    return(
		  <div id="about-holder" className="ui centered grid container "> 
          	<Menu />
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
              Everything should be self-explanatory.  If it's not I probably need to adjust the UI. If that's the case, send me an email.
              </p>
                <h3>Comment, constructive feedback or feature request?</h3>
                

                      <div className="field">
                                             
                          
                            <Mailto email="argarbarino@gmail.com" obfuscate={false} id="submit-button" className="ui inverted blue button ">
                            Email me!
                            </Mailto>
          	      
                      </div>
              </div>
          </div>
		)
	}
}


export default About;