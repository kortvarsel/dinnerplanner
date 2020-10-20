import React, {Component} from 'react';
import './Printout.css';
import Topmenu from '../Topmenu/Topmenu';

// Alternative to passing the moderl as the component property, 
// we can import the model instance directly


class Printout extends Component {
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
	 let dishesList = this.state.dinnerMenu.map((dish) => ( 
	  <div className="dishPrintout row justify-content-center col-lg-12 col-10">
					<div className="col-lg-2">
						<img className="img-responsive boxborder" src={dish.image} alt={dish.title}/></div>
					<div className="caption col-lg-3">
						<h3><strong>{dish.title}</strong></h3>
					</div>
					<div className="preparation col-lg-5">
						<h5><strong>Preparation</strong></h5>
						<p>{dish.instructions}</p>
					</div>
				</div>
		 
	 ));
	  
    return (
	<div className="row h-100">
      <div className="Printout col-12 boxborder">
		<Topmenu model={this.props.model}/>
		<hr/>
			<div className="row row-margin justify-content-center">
				{dishesList}
			</div>
      </div>
		</div>
    );
  }
}

export default Printout;
