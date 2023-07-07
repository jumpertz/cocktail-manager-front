import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from "../../../api"

const Cocktail = ({ cocktailId }) => {

    const params = useParams();
    const [cocktail, setCocktail] = useState(
        {
            name: '',
            price: 0,
            HHPrice: 0,
            steps: [{
                cocktail: {
                    id: '',
                },
                position: 0,
                description: '',
                cocktailStepIngredients: [{
                    step: {
                        id: '',
                    },
                    position: 0,
                    description: '',
                    ingredient: {
                        id: '',
                        name: '',
                        unit: ''
                    }
                }]
            }]
        });
    const [ingredients, setIngredients] = useState([]);

    const getCocktail = async () => {
        try {
            await API.get(`/cocktails/${params.cocktailId}/details`)
                .then(response => {
                    setCocktail(response)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getIngredients = async () => {
        try {
            await API.get(`/ingredients`)
                .then(response => {
                    setIngredients(response)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCocktail()
        getIngredients()
    }, [cocktailId]);

    const handleCocktailChange = (e) => {
        setCocktail({ ...cocktail, [e.target.name]: e.target.value });
    }

    const handleStepChange = (e, index) => {
        const updatedSteps = cocktail.steps.map((step, i) => {
            if (i === index) {
                return { ...step, cocktail: { id: cocktail.id }, [e.target.name]: e.target.value };
            }
            return step;
        });
        setCocktail({ ...cocktail, steps: updatedSteps });
    }

    const handleIngredientChange = (e, stepIndex, ingredientIndex) => {
        const updatedSteps = cocktail.steps.map((step, sidx) => {
            if (sidx === stepIndex) {
                const updatedIngredients = step.cocktailStepIngredients.map((ingredient, iidx) => {
                    if (iidx === ingredientIndex) {
                        if (e.target.name === "ingredient") {
                            return { ...ingredient, cocktailStep: { id: step.id }, ingredient: { ...ingredient.ingredient, id: e.target.value } };
                        }
                        return { ...ingredient, cocktailStep: { id: step.id }, [e.target.name]: e.target.value };
                    }
                    return ingredient;
                });
                return { ...step, cocktailStepIngredients: updatedIngredients };
            }
            return step;
        });
        setCocktail({ ...cocktail, steps: updatedSteps });
    }

    const addStep = () => {
        setCocktail({ ...cocktail, steps: [...cocktail.steps, { position: 0, description: '', cocktailStepIngredients: [{ position: 0, description: '', ingredient: { id: '', name: '', unit: '' } }] }] });
    }

    const removeStep = (stepIndex) => {
        const updatedSteps = cocktail.steps.filter((step, sidx) => sidx !== stepIndex).map((step, index) => ({ ...step, position: index + 1 }));
        setCocktail({ ...cocktail, steps: updatedSteps });
    }

    const addIngredient = (stepIndex) => {
        const updatedSteps = cocktail.steps.map((step, idx) => {
            if (idx === stepIndex) {
                return { ...step, cocktailStepIngredients: [...step.cocktailStepIngredients, { position: 0, description: '', ingredient: { id: '', name: '', unit: '' } }] };
            }
            return step;
        });
        setCocktail({ ...cocktail, steps: updatedSteps });
    }

    const removeIngredient = (stepIndex, ingredientIndex) => {
        const updatedSteps = cocktail.steps.map((step, sidx) => {
            if (sidx === stepIndex) {
                const updatedIngredients = step.cocktailStepIngredients.filter((ingredient, iidx) => iidx !== ingredientIndex).map((ingredient, index) => ({ ...ingredient, position: index + 1 }));
                return { ...step, cocktailStepIngredients: updatedIngredients };
            }
            return step;
        });
        setCocktail({ ...cocktail, steps: updatedSteps });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            API.patch(`/cocktails/${params.cocktailId}`, cocktail)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold mb-5">Nouveau cocktail</h1>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label>
                        Cocktail Name:
                        <input type="text" name="name" value={cocktail.name} onChange={handleCocktailChange} />
                    </label>

                    {cocktail.steps.map((step, sidx) => (
                        <div key={sidx}>
                            <button type="button" onClick={() => removeStep(sidx)}>Remove Step</button>
                            <label>
                                Step Position:
                                <input type="number" name="position" value={step.position} onChange={(e) => handleStepChange(e, sidx)} />
                            </label>
                            <label>
                                Step Description:
                                <input type="text" name="description" value={step.description} onChange={(e) => handleStepChange(e, sidx)} />
                            </label>

                            {step.cocktailStepIngredients.map((cocktailStepIngredient, iidx) => (
                                <div key={iidx} className='flex flex-col items-start'>
                                    <button type="button" onClick={() => removeIngredient(iidx)}>Remove Ingredient</button>
                                    <label>
                                        Position:
                                        <input type="number" name="position" value={cocktailStepIngredient.position} onChange={(e) => handleIngredientChange(e, sidx, iidx)} />
                                    </label>
                                    <label>
                                        Description:
                                        <input type="text" name="description" value={cocktailStepIngredient.description} onChange={(e) => handleIngredientChange(e, sidx, iidx)} />
                                    </label>
                                    <label>
                                        Ingredient:
                                        <select name="ingredient" value={cocktailStepIngredient.ingredient.id} onChange={(e) => handleIngredientChange(e, sidx, iidx)}>
                                            <option value="">Select an ingredient</option>
                                            {ingredients.map((ingredient) => (
                                                <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                            ))}
                                        </select>

                                    </label>
                                    <label>
                                        Quantité:
                                        <input type="number" name="quantity" value={cocktailStepIngredient.quantity} onChange={(e) => handleIngredientChange(e, sidx, iidx)} />
                                        {cocktailStepIngredient.ingredient.id && (
                                            <span>
                                                {ingredients.find(ingredient => ingredient.id === cocktailStepIngredient.ingredient.id)?.unit ?? ''}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            ))}
                            <button type="button" onClick={() => addIngredient(sidx)}>Add Ingredient</button>
                        </div>
                    ))}
                    <button className='w-fit' type="button" onClick={addStep}>Add Step</button>
                    <button className='w-fit items-end' type="submit">Update Cocktail</button>
                </form>
            </div>
        </>
    );
}

export default Cocktail;
