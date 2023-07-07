import { useEffect, useState } from "react"
import API from "../../api"

function Cocktail() {

    const [cocktails, setCocktails] = useState([])

    const getCocktails = async () => {
        try {
            await API.get('/cocktails')
                .then(response => {
                    setCocktails(response)
                })

        } catch (error) {
            console.log('Il y a un problème avec la récupération des utilisateurs' + error);
        }
    };

    useEffect(() => {
        getCocktails();
    }, []);

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold mb-5">Cocktails</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {cocktails.map((row, idx) => {
                    const cocktail = row.cocktail
                    const ingredients = row.ingredients
                    return (

                        <div key={idx} className="bg-white rounded-xl drop-shadow-[0_5px_35px_rgba(0,0,0,0.15)] flex flex-col overflow-visible relative">
                            <img className="object-cover object-center h-36 rounded-xl" src={cocktail.image} alt="avatar"></img>

                            <div className="px-6 py-4 flex flex-col">
                                <h1 className="text-2xl text-left font-bold text-gray-800">{cocktail.name}</h1>
                                <p className="py-2 text-sm text-left text-gray-500">{cocktail.description ?? 'Lorem ipsum'}</p>

                                <div className="flex self-center mt-2 text-gray-700">
                                    <p className="flex items-center text-md">
                                        <span className="bg-gray-100 font-bold pe-3 py-3 min-h-fit rounded-full whitespace-nowrap">
                                            <span className=" bg-amber-300 text-amber-700 rounded-full px-3 py-2 ms-2 me-2">
                                                {cocktail.HHPrice.toFixed(2)} €
                                            </span>
                                            {cocktail.price.toFixed(2)} €
                                        </span>
                                    </p>
                                </div>

                                <div className="py-4 self-start flex-col flex items-start">
                                    <h2 className="text-sm font-bold text-gray-600">Ingrédients</h2>
                                    <p className="text-gray-500 text-xs">{ingredients.map(ingredient => ingredient.name).join(', ')} et beaucoup d'amour</p>
                                </div>

                                <div className="flex items-center text-gray-700">
                                    <p className="text-sm font-semibold flex gap-1">
                                        {ingredients.filter(i => i.allergen).length > 0 ?
                                            (
                                                <><span>⚠️</span> {ingredients.filter(i => i.allergen).map(ingredient => ingredient.name).join(', ')}</>
                                            ) :
                                            (
                                                <><span>✅</span> Pas d'allergène</>
                                            )
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div >
    )

}

export default Cocktail;