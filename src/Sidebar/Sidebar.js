import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
class Sidebar extends Component {

  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
	  dinnerMenu: this.props.model.getFullMenu()	
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
	dinnerMenu: this.props.model.getFullMenu()	
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {
    return (
	<div className="Sidebar col-lg-3 col-md-12 row-padding boxborder">
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button id="navButton" className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>

        <a className="navbar-brand">
        <h4><strong>My dinner</strong></h4>
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <p>
			People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        	Total number of guests: {this.state.numberOfGuests}
        </p>
          <br />

          <table className="table">
            <thead>
              <tr id="sidebarMenuHead">
                <th>Dish Name</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody id="dinnerList">{this.state.dinnerMenu.map((dish) => 
          		<tr key={dish.title}>
					<td>{dish.title}</td>
	  				<td>{this.props.model.getNewDishPrice(dish)} SEK</td>
				</tr>)}
	  		<tr><td>Total price:</td><td> {this.props.model.getNewPrice()} SEK</td></tr>
            </tbody>
          </table>
			<Link to="/dinneroverview">
          <button id="confirmDinner" className="btn-md btn-warning"> Confirm Dinner </button>
			</Link>
        </div>
      </nav>
    </div>
    );
  }
}

export default Sidebar;
