import React, { useState } from 'react';

const CreateCocktailStep = () => {
    const [step, setStep] = useState({ position: 0, description: '', cocktailStepIngredients: [{ position: 0, description: '', ingredient: { id: '', name: '', unit: '' } }] });

    const handleStepChange = (e) => {
        setStep({ ...step, [e.target.name]: e.target.value });
    }

    const handleIngredientChange = (e, index) => {
        const updatedIngredients = step.cocktailStepIngredients.map((ingredient, i) => {
            if (i === index) {
                return { ...ingredient, [e.target.name]: e.target.value };
            }
            return ingredient;
        });
        setStep({ ...step, cocktailStepIngredients: updatedIngredients });
    }

    const addIngredient = () => {
        setStep({ ...step, cocktailStepIngredients: [...step.cocktailStepIngredients, { position: 0, description: '', ingredient: { id: '', name: '', unit: '' } }] });
    }

    const createStep = () => {
        // Here you would typically make a POST request to your API to create the step
        console.log(step);
    }

    return (
        <div>
            <h1>Créer une étape de cocktail</h1>

            <input type="number" name="position" value={step.position} onChange={handleStepChange} placeholder="Position" />
            <input type="text" name="description" value={step.description} onChange={handleStepChange} placeholder="Description" />

            <h2>Ajouter des ingrédients à l'étape</h2>
            {step.cocktailStepIngredients.map((ingredient, index) => (
                <div key={index}>
                    <input type="number" name="position" value={ingredient.position} onChange={(e) => handleIngredientChange(e, index)} placeholder="Position" />
                    <input type="text" name="description" value={ingredient.description} onChange={(e) => handleIngredientChange(e, index)} placeholder="Description" />
                    <input type="text" name="id" value={ingredient.ingredient.id} onChange={(e) => handleIngredientChange(e, index)} placeholder="Id de l'ingrédient" />
                    <input type="text" name="name" value={ingredient.ingredient.name} onChange={(e) => handleIngredientChange(e, index)} placeholder="Nom de l'ingrédient" />
                    <input type="text" name="unit" value={ingredient.ingredient.unit} onChange={(e) => handleIngredientChange(e, index)} placeholder="Unité de l'ingrédient" />
                </div>
            ))}
            <button onClick={addIngredient}>Ajouter un autre ingrédient</button>
            <button onClick={createStep}>Créer l'étape</button>
        </div>
    )
}

export default CreateCocktailStep;
