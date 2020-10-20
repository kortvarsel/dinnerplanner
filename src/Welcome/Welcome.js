import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';
import dinnerIcon from '../assets/food.svg';

class Welcome extends Component {
  render() {
    return (
      	<div className="Welcome col-12 text-center">
			<img className="col-md-3 col-6" id="dinnerIcon" src={dinnerIcon} alt="Food" />
			<p>
				Welcome to the dinner planner React!
			</p>
			<Link to="/search">
				<button className="btn-md btn-warning">Start planning</button>
			</Link>
      	</div>
    );
  }
}

export default Welcome;
