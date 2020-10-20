import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import DinnerOverview from "./DinnerOverview/DinnerOverview";
import Printout from './Printout/Printout';
import DishDetails from './DishDetails/DishDetails';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
		<div className="container-fluid h-100">
  			<div className="row">
				<header id="header" className="col-12 text-center">
					<h2>Dinner planner</h2>
    			</header>
  			</div>
			
          	{/* We rended diffrent component based on the path */}
          		<Route exact path="/" component={Welcome}/>
          		<Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
          		<Route path="/dinneroverview" render={() => <DinnerOverview model={modelInstance}/>}/>

              <Route path="/printout" render={() => <Printout model={modelInstance}/>}/>
              <Route path="/dishdetails/:value" render={(props) => <DishDetails model={modelInstance} id={props.match.params.value}/>}/>
    

      	</div>
	  </div>
    );
  }
}

export default App;
