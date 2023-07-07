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
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold mb-5">Ingrédients</h1>
            <div className="self-end">
                <Link to={`/admin/ingredients/create`} className="bg-green-100 text-green-500 py-2 px-3 rounded-md">Ajouter un ingrédient</Link>
            </div>
            <div className="flex flex-wrap gap-5">
                {_ingredients.map((ingredient) => {
                    return (
                        <div key={ingredient.id} className="w-[300px] overflow-hidden bg-white rounded-xl shadow-xl flex flex-col">
                            <div className="py-4">
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
                    )
                })}
            </div>
        </div>
    )
}

export default AdminIngredients