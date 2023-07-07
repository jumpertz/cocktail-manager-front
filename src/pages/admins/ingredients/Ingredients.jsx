import { useEffect, useState } from "react"
import API from "../../../api"
import { Link } from "react-router-dom";

function AdminIngredients() {
    const [_ingredients, setIngredients] = useState([])

    const getIngredients = async () => {
        try {
            await API.get('/ingredients')
                .then(response => {
                    setIngredients(response)
                })
        } catch (error) {
            console.log('Problème avec la récupération des ingrédients')
        }
    }

    useEffect(() => {
        getIngredients();
    }, [])



    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">Ingrédients</h1>
            <div className="flex flex-wrap">
                {_ingredients.map((ingredient) => {
                    return (
                        <>
                            <div key={ingredient.id} className="w-[300px] overflow-hidden bg-white rounded-xl shadow-xl">
                                <div className="px-6 py-4">
                                    <h1 className="text-xl text-left font-semibold text-gray-800">{ingredient.name}</h1>
                                    {ingredient.allergen ? (
                                        <p className="py-2 text-gray-700">Allergen : ✅</p>
                                    ) : (
                                        <p className="py-2 text-gray-700">Allergen : ❌</p>
                                    )}
                                </div>
                                <div className="flex items-center my-4 text-gray-700">
                                    <p> ℹ️ <span >Stock : {ingredient.stock}</span></p>
                                    <p> </p>
                                </div>
                                <Link to={`/admin/ingredients/${ingredient.id}`} className="px-4 py-2 self-end rounded bg-gray-100 hover:bg-gray-200 duration-100">✏️</Link>
                            </div>

                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminIngredients