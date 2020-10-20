import React, {Component} from 'react';
import './Topmenu.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import { Link } from 'react-router-dom';


class Topmenu extends Component {
	constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
	  dinnerMenu: this.props.model.getFullMenu()	
    }
  }
	
	update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
	  dinnerMenu: this.props.model.getFullMenu()	
    })
  }
	
  render() {
    return (
      <div className="Topmenu col-lg-12">
      <div className="row row-margin justify-content-center">
        <div className="col-lg-5 col-8 text-left">
          <h2 id="myDinnerNum">My dinner: {this.state.numberOfGuests}  people</h2>
        </div>
        <div className="col-lg-5 col-8 text-right">
		<Link to="/search">
          <button className="backEdit btn-lg btn-warning col-12 col-lg-8">Go back and edit dinner</button>
		</Link>
        </div>
      </div>
    
      </div>
    );
  }
}

export default Topmenu;
