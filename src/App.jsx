import React, { useState, useEffect } from 'react';
import './App.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching recipes from an API or local storage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  useEffect(() => {
    // Save recipes to local storage whenever they change
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);


  const handleInputChange = (event) => {
    setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
  };

  const handleAddRecipe = () => {
    if (newRecipe.title && newRecipe.ingredients && newRecipe.instructions) { //Basic Validation
      setRecipes([...recipes, newRecipe]);
      setNewRecipe({ title: '', ingredients: '', instructions: '' }); // Clear form
    } else {
      alert("Please fill in all fields."); //Simple alert
    }
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div>
        <h1>Recipe Sharing Platform</h1>

        <div>
            <input type="text" placeholder="Search recipes..." value={searchTerm} onChange={handleSearch} />
        </div>

      <h2>Add New Recipe</h2>
      <input type="text" name="title" placeholder="Title" value={newRecipe.title} onChange={handleInputChange} /><br />
      <textarea name="ingredients" placeholder="Ingredients" value={newRecipe.ingredients} onChange={handleInputChange} /><br />
      <textarea name="instructions" placeholder="Instructions" value={newRecipe.instructions} onChange={handleInputChange} /><br />
      <button onClick={handleAddRecipe}>Add Recipe</button>

      <h2>Recipes</h2>
      <ul>
        {filteredRecipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.title}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <button onClick={() => handleDeleteRecipe(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;