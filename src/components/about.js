import React, { Component } from 'react';
import '../App.css';
import Menu from './menu';
import {connect} from 'react-redux'; 

class About extends Component {

	render(){
		return(
		  <div className="ui centered grid container"> 
          	<Menu />
          	 <div className="row">
             	<h2 id="how-to-use-title">How To Use</h2>
             	<p id="how-to-use-p">Lorem ipsum dolor amet enamel pin cliche butcher activated charcoal four loko sustainable. Food truck marfa fanny pack cardigan synth vexillologist, tote bag keffiyeh lyft. Cloud bread locavore pok pok, air plant poke four loko distillery beard. Whatever glossier pinterest yr 3 wolf moon vape. Chambray la croix sriracha austin chia 3 wolf moon. Kombucha hexagon waistcoat vinyl pop-up microdosing. Vexillologist tattooed occupy taiyaki artisan try-hard iPhone selvage pabst gentrify blog four dollar toast humblebrag.</p>
          	</div>
          </div>
		)
	}
}

export default About;