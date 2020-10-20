import React, {Component} from 'react';
import './DinnerOverview.css';
import Topmenu from '../Topmenu/Topmenu';
import { Link } from 'react-router-dom';

class DinnerOverview extends Component {
  constructor(props){
    super(props)
    this.state = {
      dinnerMenu: this.props.model.getFullMenu()
    }
  }

  update() {
    this.setState ({
      dinnerMenu: this.props.model.getFullMenu()
    })
  }

  render() {
    let dishesList = this.state.dinnerMenu.map((dish) => (
      <div className="col-8 col-lg-2">
        <div className="thumbnail boxborder">
          <img className="img-responsive" src={dish.image} alt={dish.name} />
          <div className="caption">
            <h5>{dish.title}</h5>
          </div>
        </div>
        <p>{this.props.model.getNewDishPrice(dish)} SEK</p>
      </div>
    ));
    return (
	<div className="row h-100">
      <div className="dinnerOverview col-12 boxborder">
		<Topmenu model={this.props.model}/>
		<hr/>
		<div className="finalMenu">
      <div className="row row-margin text-center justify-content-center">
          {dishesList}
      
	</div>
	</div>
<div className="row row-margin justify-content-center">
	<h4>Total price: {this.props.model.getNewPrice()} SEK</h4>
	</div>
	<hr/>
	<div className="row row-margin justify-content-center">
		<Link to="/printout">
        <button id="printRecipe" className="btn-lg btn-warning">Print recipe</button>
      </Link>
      </div>
      </div>
</div>
    )
  }
}

export default DinnerOverview;
