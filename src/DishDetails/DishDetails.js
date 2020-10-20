import React, {Component} from 'react';
import './DishDetails.css';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import loaderIcon from '../assets/loader.svg';



class DishDetails extends Component {
  
	constructor(props) {
    super(props)
		
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
	  status: 'INITIAL'	
    }
  }
	
	 componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
	this.props.model.addObserver(this)
    this.props.model.getDish(this.props.id).then(dish => {
      this.setState({
        status: 'LOADED',
        dish: dish,
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }
	
  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }
	
	update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }	
	
  render() {
	  let dishTitle = null;
	  let dishDescription = null;
	  let dishImg = null;
	  let dishIngredients = null;
	  let dishPrice = null;
	  let dishDetails = null;
	  
	  switch (this.state.status) {
      case 'INITIAL':
        dishDetails = <div className="loaderIcon col-lg-4 col-6 text-center"><img src={loaderIcon} alt="Loader icon" />
			<h3>Loading...</h3></div>
        break;
      case 'LOADED':
        dishImg = this.state.dish.image
		dishTitle = this.state.dish.title
		dishDescription = this.state.dish.instructions
		dishIngredients = this.state.dish.extendedIngredients.map((ingredient) => 
          		<tr key={ingredient.name}>
					<td>{this.state.numberOfGuests * ingredient.amount + " " + ingredient.unit}</td>
					<td>{ingredient.name}</td>
				</tr>														  
        )
		dishPrice = <tr><td>Total price: </td><td>{this.props.model.getNewDishPrice(this.state.dish)} SEK</td></tr>  
			  	  
		dishDetails =      
		<div className="row">
		<div id="dishDescription" className="col-lg-7 col-md-12 row-padding">
          <div id="dishName"><h4><strong>{dishTitle}</strong></h4></div>
          <div id="dishImage" className="col-lg-8 col-10  mx-auto d-block row-padding">
			  <img className="img-responsive boxborder" src={dishImg} alt={dishTitle}/></div>
          <h4><strong>Preparation</strong></h4>
          <div id="dishDescription">
		<p>{dishDescription}</p>
		</div>
		 <Link to="/search">
          <button className="backEdit btn-md btn-warning">Back to search</button>
		 </Link>
        </div>
        <div className="col-lg-5 col-md-12">
          <div id="dishIngredients" className="yellowBG row-padding boxborder">
			<h6><strong>Ingredients for {this.state.numberOfGuests}  people</strong></h6>
			<table className="table">
				<tbody id="ingredientsList">
			{dishIngredients}	
			{dishPrice}
			</tbody>	
			</table>
		</div>
          <button onClick={addToMenu.bind(this)} id="addMenu" className="btn-md btn-warning"> Add to menu </button>
        </div>
	  </div>	  
        break;
      default:
        dishDescription = <b>Failed to load data, please try again</b>
        break;
    }
	function addToMenu () {
		this.props.model.addNewDishToMenu(this.state.dish);
	}
	

    return (
		<div className="row h-100">
		 <Sidebar model={this.props.model}/>
		<div className="DishDetails col-lg-9 col-md-12 row-padding">
        	{dishDetails}
		</div>
		</div>
    );
  }
}

export default DishDetails;
