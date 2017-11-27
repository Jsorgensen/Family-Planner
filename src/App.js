import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var testString = "this is a test string.  Hello computer."
var apiData;
var recipes = [];

class App extends Component {
  componentDidMount(){
    var that = this;
    var url = "http://127.0.0.1:5984/dinner_meals/_design/view3/_view/object?limit=20&reduce=false&include_docs=true&conflicts=true";
    /* "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"; */
    var dataDisplay = document.getElementById('dataDisplay');

    fetch(url)
      .then(resp => resp.json())
      .then(function(data){
        console.log(data);
        inputData(data);
        dataDisplay.innerHTML = apiData;
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{testString}</p>
        <p id='dataDisplay'></p>
      </div>
    );
  }
}

export default App;

function inputData(data){
  var rawdata = data;

  var rows = rawdata.rows;
  recipes = rows.map(row => row.value);
  var testrec = recipes;

  apiData = recipes.map(rec => recipeToString(rec));
}

function recipeToString(recipe) {
  var result = "";
  result += recipe.name + "</br>";
  result += recipe.components.map(comp => comp.component);
  result += "</br></br>";

  return result;
}