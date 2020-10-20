const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};
Storage.prototype.getArray = function(arrayName) {
  var thisArray = [];
  var fetchArrayObject = this.getItem(arrayName);
  if (typeof fetchArrayObject !== 'undefined') {
    if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
  }
  return thisArray;
}

Storage.prototype.pushArrayItem = function(arrayName,arrayItem) {
  var existingArray = this.getArray(arrayName);
  existingArray.push(arrayItem);
  this.setItem(arrayName,JSON.stringify(existingArray));
}

Storage.prototype.popArrayItem = function(arrayName) {
  var arrayItem = {};
  var existingArray = this.getArray(arrayName);
  if (existingArray.length > 0) {
    arrayItem = existingArray.pop();
    this.setItem(arrayName,JSON.stringify(existingArray));
  }
  return arrayItem;
}
const DinnerModel = function () {

  let numberOfGuests = localStorage.getItem("guests")||4;
  let observers = [];
  let dinnerMenu = localStorage.getArray("menu")||[];


  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    localStorage.setItem('guests', num);
	notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

	// Returns all the dishes on the menu.
	this.getFullMenu = function () {
		return dinnerMenu;
	}

	this.addNewDishToMenu = function (dish) {
		let flag = 0;
		for (var index = 0; index < dinnerMenu.length; index++) {
				if (dinnerMenu[index].id === dish.id) {
					flag = 1;
				}
		}
		if (flag === 0){
			dinnerMenu.push(dish);
			notifyObservers();
      localStorage.pushArrayItem('menu', dish)
			}

	}


	this.getNewDishPrice = function (dish) {
		var totalPrice = 0;
		totalPrice += Math.round(dish.pricePerServing);
		return totalPrice * numberOfGuests;
	}


	this.getNewPrice = function () {
		var totalPrice = 0;
		for (var index = 0; index < dinnerMenu.length; index++) {
			totalPrice += this.getNewDishPrice(dinnerMenu[index]);
		}
		return totalPrice;
	}

  // API Calls
  this.getAllDishes = function (query='', type= '') {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=' + query + '&type=' + type
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

   this.getDish = function (id) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information'
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  // API Helper methods
  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
