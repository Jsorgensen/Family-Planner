import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var testString = "Hello computer.  Initialized without error... or is it...";
var recipes;

class App extends Component {
  componentDidMount(){
    var that = this;
    var url = "http://127.0.0.1:5984/dinner_meals/_design/view/_view/Recipes?limit=20&reduce=false";
    /* "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"; */
    var dataDisplay = document.getElementById('dataDisplay');

    fetch(url)
      .then(resp => resp.json())
      .then(function(data){
        console.log(data);
        recipes = recipeTitles(data);
        var recipeList = document.getElementById('recipeList');
        document.getElementById('recipe0').innerHTML = recipes[0];
        document.getElementById('recipe1').innerHTML = recipes[1];
        document.getElementById('recipe2').innerHTML = recipes[2];
      })
      .catch(function(error){
        dataDisplay.innerHTML = "Crap.... something exploded.  Ssshhhhh....  " + error;
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p id='dataDisplay'>{testString}</p>
        <div>
          <h3 id='recipesTitle'>Recipes</h3>
          <ul id='recipeList'>
            <li className='recipes'><button id='recipe0'></button></li>
            <li className='recipes'><button id='recipe1'></button></li>
            <li className='recipes'><button id='recipe2'></button ></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

function recipeTitles(data){
  recipes = data.rows.map(row => row.value);

  return recipes;
}