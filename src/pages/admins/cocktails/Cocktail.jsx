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
        setCocktail({ ...cocktail, steps: [...cocktail.steps, { position: cocktail.steps.length + 1, description: '', cocktailStepIngredients: [{ position: 1, description: '', ingredient: { id: '', name: '', unit: '' } }] }] });
    }

    const removeStep = (stepIndex) => {
        const updatedSteps = cocktail.steps.filter((step, sidx) => sidx !== stepIndex).map((step, index) => ({ ...step, position: index + 1 }));
        setCocktail({ ...cocktail, steps: updatedSteps });
    }

    const addIngredient = (stepIndex) => {
        const updatedSteps = cocktail.steps.map((step, idx) => {
            if (idx === stepIndex) {
                return { ...step, cocktailStepIngredients: [...step.cocktailStepIngredients, { position: step.cocktailStepIngredients.length + 1, description: '', ingredient: { id: '', name: '', unit: '' } }] };
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

            API.post(`/cocktails`, cocktail,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
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
            <div className="flex flex-col gap-3 px-8">
                <h1 className="text-2xl font-bold mb-5">Modification d'un cocktail</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className='flex flex-col'>
                        <h2 className='self-start text-2xl text-left font-bold text-gray-800 my-4'>Détails</h2>

                        <div className='grid grid-cols-3 gap-5'>
                            <div className='flex flex-col'>
                                <label className='text-start text-sm font-semibold mb-1'>Nom</label>
                                <input className='bg-gray-100 px-3 py-2 rounded-md' type="text" name="name" value={cocktail.name} onChange={handleCocktailChange} />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-start text-sm font-semibold mb-1'>Prix hors Happy Hour</label>
                                <input className='bg-gray-100 px-3 py-2 rounded-md' type="number" name="price" value={cocktail.price} onChange={handleCocktailChange} />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-start text-sm font-semibold mb-1'>Prix durant Happy Hour</label>
                                <input className='bg-gray-100 px-3 py-2 rounded-md' type="number" name="HHPrice" value={cocktail.HHPrice} onChange={handleCocktailChange} />
                            </div>
                            <div className='flex flex-col col-span-3'>
                                <label className='text-start text-sm font-semibold mb-1'>Description</label>
                                <textarea className='bg-gray-100 px-3 py-2 rounded-md' name="description" value={cocktail.description} onChange={handleCocktailChange} />
                            </div>
                            <div className='flex flex-col col-span-2'>
                                <label className='text-start text-sm font-semibold mb-1'>Lien de l'image</label>
                                <input className='bg-gray-100 px-3 py-2 rounded-md' placeholder='https://' type="text" name="image" value={cocktail.image} onChange={handleCocktailChange} />
                            </div>
                        </div>

                    </div>
                    <h2 className='self-start text-2xl text-left font-bold text-gray-800 mt-4'>Recette</h2>
                    {cocktail.steps.map((step, sidx) => (
                        <div key={sidx} className='flex flex-col bg-gray-100 rounded-2xl px-5 py-5'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl font-extrabold text-gray-600'>Étape {step.position}</h1>
                                <button className='bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 duration-100 py-1 px-2 rounded-md text-sm font-medium' type="button" onClick={() => removeStep(sidx)}>Supprimer</button>
                            </div>


                            <div className='flex flex-col my-3'>
                                <label className='text-start font-bold mb-3 text-gray-500'>Description</label>
                                <textarea className='bg-gray-200 px-3 py-2 rounded-md' name="description" value={step.description} onChange={(e) => handleStepChange(e, sidx)} />
                            </div>

                            <label className='text-start font-bold mb-3 text-gray-500'>Ingredients</label>
                            <div className='flex flex-wrap gap-5 justify-center items-stretch'>

                                {step.cocktailStepIngredients.map((cocktailStepIngredient, iidx) => (
                                    <div key={iidx} className='grid grid-cols-1 items-start bg-gray-200 px-4 py-3 gap-4 w-[225px] rounded-lg '>
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='text-2xl font-extrabold text-gray-500'>{cocktailStepIngredient.position}</p>
                                            <button className='bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 duration-100 py-1 px-2 rounded-md text-xs' type="button" onClick={() => removeIngredient(sidx, iidx)}>Supprimer</button>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-start text-sm font-semibold mb-1'>Ingredient</label>
                                            <select className='px-3 py-2 rounded-md text-sm' name="ingredient" value={cocktailStepIngredient.ingredient.id} onChange={(e) => handleIngredientChange(e, sidx, iidx)}>
                                                <option value="">Choisir un ingrédient</option>
                                                {ingredients.map((ingredient) => (
                                                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='text-start text-sm font-semibold mb-1'>Quantité {cocktailStepIngredient.ingredient.id && (

                                                `(${ingredients.find(ingredient => ingredient.id === cocktailStepIngredient.ingredient.id)?.unit})` ?? ''

                                            )}</label>
                                            <div className='relative'>
                                                <input type='number' placeholder='Définir la quantité' className='px-3 py-2 rounded-md text-sm' name="quantity" value={cocktailStepIngredient.quantity} onChange={(e) => handleIngredientChange(e, sidx, iidx)} />

                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='text-start text-sm font-semibold mb-1'>Description</label>
                                            <textarea placeholder="Définir l'action à faire avec l'ingrédient" className='px-3 py-2 rounded-md text-sm' name="description" value={cocktailStepIngredient.description} onChange={(e) => handleIngredientChange(e, sidx, iidx)} />
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addIngredient(sidx)} className="px-4 py-2 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 duration-100 flex flex-col justify-center items-center h-full self-stretch text-gray-400 hover:text-gray-500">
                                    <span className="text-5xl">+</span>
                                    <p className="text-xl">Ajouter un ingrédient</p>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button className="py-2 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 duration-100 flex items-center justify-center gap-2" type="button" onClick={addStep}>
                        <span className="font-bold text-2xl">+</span>
                        <p>Ajouter une étape</p>

                    </button>
                    <button className='w-fit self-end mt-4 font-semibold py-2 px-3 bg-green-200 text-green-600 hover:bg-green-300 hover:text-green-800 rounded-lg' type="submit">Enregistrer !</button>
                </form >
            </div >
        </>
    );
}

export default Cocktail;
