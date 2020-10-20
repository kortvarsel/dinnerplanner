import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {
  constructor(props){
    super(props);
    this.state = {
      dropValue: '',
      textValue: ''
    }
    var drop = this.state.dropValue
    var text = this.state.textValue
  }
  handleTextChange(event) {
    this.text = event.target.value;
    /*setstate för förändring så att alla värden är kopplade till varandra
    behöver vi koppla ihop denna vyn med den andra eller hur ska allt uppdateras?
    måste göra ny api-call för varje ändring*/
  }
  handleDropChange(event) {
    this.drop = event.target.value;

    /*setstate för förändring så att alla värden är kopplade till varandra
    behöver vi koppla ihop denna vyn med den andra eller hur ska allt uppdateras?
    måste göra ny api-call för varje ändring*/
  }
  handleSubmit(event) {
    this.setState({textValue: this.text});
    this.setState({dropValue: this.drop});
    /*måste på något sätt få vår Dishes att förändras här, men vet inte hur man kommer åt den riktigt
    eventuellt att vi tar bort den och målar upp på nytt?*/
  }

  render() {
    return (
	<div className="row h-100">
      <div className="SelectDish col-12">
      	<div className="row h-100">

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
		<div className= "searchDish col-lg-9 col-md-12 row-padding boxborder">
			<h4><strong>Find a dish</strong></h4>
			<input type="text" id="keywords" placeholder="Enter key words" onChange={this.handleTextChange.bind(this)}/>
			<select onChange={this.handleDropChange.bind(this)} id="type">
			  <option value="">All</option>
			  <option value="breakfast">Breakfast</option>
			  <option value="main course">Main course</option>
			  <option value="side dish">Side dish</option>
			  <option value="dessert">Dessert</option>
			  <option value="appetizer">Appetizer</option>
			  <option value="salad">Salad</option>
			  <option value="bread">Bread</option>
			  <option value="soup">Soup</option>
			  <option value="drink">Drink</option>
			  <option value="beverage">Beverage</option>
			</select>
			<button onClick={this.handleSubmit.bind(this)} className="btn-md btn-warning"> Search </button>
		<hr id="dishLine"/>
    <Dishes query={this.state.textValue} type={this.state.dropValue}/>
		</div>
      </div>
		</div>
		</div>
    );
  }
}

export default SelectDish;
