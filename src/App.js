import React, { Component } from 'react';
import './App.css';

var fetchError;

class App extends Component {
  constructor(){
    super();
    this.state = ({
      display: '',
      recipes: ['Wendy\'s', 'Fazoli\'s', 'Costa Vida', 'Little Ceasar\'s'],
      recipe: '',
      recipeItems: [],
      recipeItem: <div></div>
    })

  }
  render() {
    const recipes = this.createRecipeItems(this.state.recipes);
    return (
      <div className="App">
        <p id='dataDisplay'>{this.state.display}</p>
        <div id='recipeBlock'>
          <h3 id='recipesTitle'>Recipes</h3>
          <ul id='recipeList'>
            {recipes}
          </ul>
        </div>
        {this.state.recipeItem}
      </div>
    );
  }
  componentDidMount() {
    var url = "http://127.0.0.1:5984/dinner_meals/_design/view/_view/Recipes?limit=20&reduce=false";
    
    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        this.recipeTitles(json);
        this.createRecipeItems(this.state.recipes);
      })
      .catch(error => {
        this.setState({display: 'Failed to receive recipes. ' + error});
      });

    this.createRecipeItems(this.state.recipes);
  }
  createRecipeItems(recipes) {
    return recipes.map(recipe => <li className='recipes'><button onClick={(e) => this.onRequestRecipeClick(e)}>{recipe}</button></li>);
  }
  recipeTitles(data) {
    var recipes = data.rows.map(row => row.value);
    this.setState({ recipes: recipes });

    return recipes;
  }
  onRequestRecipeClick(event) {
    var text = event.target.innerHTML;
    this.setState({ display: text });

    var recipeUrl = `http://127.0.0.1:5984/dinner_meals/_design/view/_view/getRecipe?key="${text}"`;
    fetch(recipeUrl)
      .then(resp => resp.json())
      .then(json => {
        console.log(json.rows[0].value);
        this.setState({ recipe: json.rows[0].value })
        this.createRecipeItem(json.rows[0].value);
      })
      .catch(error => {
        this.setState({display: "Crap.... something exploded.  Request recipe didn't work...  " + error});
      });
  }
  createRecipeItem(recipe){
    var componentItems = recipe.components.map(comp => {
      var ingrediantItems = comp.ingrediants.map(ingrediant => <li className='ingrediantItems'>{ingrediant.ingrediant + ': ' + ingrediant.quantity + ' ' + ingrediant.unit}</li>);
      var directionItems = comp.directions.map(direction => <li className='directionItems'>{direction}</li>)
      return (
        <li className='blueGroup'>
          <h4 className='componentTitle'>{comp.component}</h4>
          <div>
            <ol className='blueSub ingrediants'><h4>Ingrediants</h4>{ingrediantItems}</ol>
            <ol className='blueSub directions'><h4>Directions</h4>{directionItems}</ol>
          </div>
        </li>
      )
    })
    var directions = recipe.directions.map(dir => <li>{dir}</li>)
    var imageProps = [];
    for(var p in recipe.image)
      imageProps.push(p);
    var imageSRC = 'http://127.0.0.1:5984/dinner_meals/'+recipe.id+'/'+imageProps[0];
    this.setState({
      recipeItem: 
        <div className='recipeItemBase'>
          <div className='recipeItem'>
            <h1>{recipe.key}</h1>
            <div className='imageSub'><img src={imageSRC} alt='Image Not Found' className='recipeImage'></img></div>
            <ol className='components'>{componentItems}</ol>
            <div className='blueGroup'>
              <ol className='blueSub'><h4>Directions</h4>{directions}</ol>
            </div>
          </div>
        </div>
    })
  }
}

export default App;

//superAgent