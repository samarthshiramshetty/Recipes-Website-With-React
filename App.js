import React , {useEffect, useState} from 'react';
import Recipe from './Recipe'
//import logo from './logo.svg';
import './App.css';

const App = () => {

  const APP_ID = "f46a82bd"
  const APP_KEY = "b31429db53fdb815a6d25fdeaac51ed1" 
  
  const [recipes , setRecipes] = useState([]);
  const [search,setSearch] = useState("")
  const [final,setFinal] = useState('chicken')

  useEffect( () => {
      getRecipes()
  }, [final])


  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${final}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = (e) =>{
    setSearch(e.target.value)
    
  } 

  const getSearch = (e) => {
    e.preventDefault()
    setFinal(search)
    setSearch('')
  }
  
  return (
    <div className="App">
      <form onSubmit = {getSearch}  className = "search-form" >
        <label className = 'Title-name'>Food Hustle</label> <br></br> <br></br>
        <input className = 'search-bar' type="text" value = {search} onChange={updateSearch}/>
          <button className = "search-button"  type = "submit">Search</button>
      </form>
      <div className = 'recipes'>
      {recipes.map(recipe =>(
        <Recipe 
        key = {recipe.recipe.label}
        title ={recipe.recipe.label}
        calories ={recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
