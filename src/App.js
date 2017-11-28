import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

var display;
var recipes = ['Wendy\'s', 'Fazoli\'s', 'Costa Vida', 'Little Ceasar\'s'];
var recipeItems;
createRecipeItems();

class App extends Component {
  componentDidMount(){
    var that = this;
    var url = "http://127.0.0.1:5984/dinner_meals/_design/view/_view/Recipes?limit=20&reduce=false";
    /* "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"; */
    display = "Hello computer. Initialized without error... or did it...";
    var lis = []
    for(var i=0; i<4; i++)
      lis.push(<li id='test'>this is a test.... {i + 1}</li>);
    ReactDOM.render(lis, document.getElementById('testBlock'));

    fetch(url)
      .then(resp => resp.json())
      .then(function(json){
        console.log(json);
        recipes = recipeTitles(json);
        createRecipeItems();
      })
      .catch(function(error){
        display = "Crap.... something exploded.  Ssshhhhh....  " + error;
      });
  }
  handleClick(){
    document.getElementById('dataDisplay').innerHTML = 'Request recipe';
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p id='dataDisplay'>{display}</p>
        <div id='recipeBlock'>
          <h3 id='recipesTitle'>Recipes</h3>
          <ul id='recipeList'>
            {recipeItems}
          </ul>
        </div>
        <ul id='testBlock'>

        </ul>
      </div>
    );
  }
}

export default App;

function recipeTitles(data){
  recipes = data.rows.map(row => row.value);

  document.getElementById('dataDisplay').innerHTML = recipes;

  return recipes;
}

function createRecipeItems(){
  recipeItems = recipes.map((recipe) => <li className='recipes'><button>{recipe}</button></li>);
  recipes.forEach(function(recipe){
    console.log(recipe);
    //ReactDOM.render (<li className='recipes'><button>{recipe}</button></li>, document.getElementById('recipeList'));
  });
  var ril = recipeItems;
}