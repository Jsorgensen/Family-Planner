import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var fetchError;

class App extends Component {
  constructor(){
    super();
    this.state = ({
      display: '',
      recipes: ['Wendy\'s', 'Fazoli\'s', 'Costa Vida', 'Little Ceasar\'s'],
      recipe: '',
      recipeItems: []
    })

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p id='dataDisplay'>{this.state.display}</p>
        <div id='recipeBlock'>
          <h3 id='recipesTitle'>Recipes</h3>
          <ul id='recipeList'>
            {this.state.recipeItems}
          </ul>
        </div>
      </div>
    );
  }
  componentDidMount() {

    var url = "http://127.0.0.1:5984/dinner_meals/_design/view/_view/Recipes?limit=20&reduce=false";
    /* "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"; */

    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        this.recipeTitles(json);
        this.createRecipeItems();
      })
      .catch(error => {
        this.setState({display: 'Failed to receive recipes. ' + error});
      });

    this.createRecipeItems();
  }
  createRecipeItems() {
    var recipeItems = this.state.recipes.map(recipe => <li className='recipes' key={recipe}><button onClick={(e) => this.onClick(e)}>{recipe}</button></li>);
    /* ReactDOM.render (recipeItems, document.getElementById('recipeList')); */
    this.setState({ recipeItems: recipeItems });
  }
  recipeTitles(data) {
    var recipes = data.rows.map(row => row.value);
    this.setState({ recipes: recipes });

    return recipes;
  }
  onClick(event) {
    var text = event.target.innerHTML;
    this.setState({ display: text });

    var recipeUrl = `http://127.0.0.1:5984/dinner_meals/_design/view/_view/getRecipe?key="${text}"`;
    fetch(recipeUrl)
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        this.setState({ recipe: json })
        /* recipe = json; */
      })
      .catch(error => {
        this.setState({display: "Crap.... something exploded.  Request recipe didn't work...  " + error});
      });
  }
}

export default App;