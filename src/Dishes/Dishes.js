import React, {Component} from 'react';
import './Dishes.css';
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';
import Dish from '../Dish/Dish';
import loaderIcon from '../assets/loader.svg';


class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: 'INITIAL',
      type: this.props.type,
      query: this.props.query,
      flag: false
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getAllDishes(this.state.query, this.state.type).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results,
		dishesBaseUri: dishes.baseUri
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }


  //Anropas om någon props uppdateras. Alltså när man anropar setState i selectDishes. Fungerar dock bara första gången man söker. Sedan låser sig keywords rutan och dopdown menyn.
  componentDidUpdate(props){
    if (this.state.status !== 'INITIAL'){
      this.state.status = 'INITIAL'
    }
	 modelInstance.getAllDishes(props.query, props.type).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results,
		dishesBaseUri: dishes.baseUri
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })




  }

  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <div className="loaderIcon text-center"><img src={loaderIcon} alt="Loader icon" />
			<h3>Loading...</h3></div>
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map((dish) =>
          <Dish key={dish.id} baseUri={this.state.dishesBaseUri} dish={dish}/>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
		<div className="row row-margin text-center justify-content-center justify-content-lg-start no-gutters">
          {dishesList}
		</div>
      </div>
    );
  }
}

export default Dishes;
