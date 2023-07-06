import { useEffect, useState } from "react"
import API from "../../api"

function Cocktails() {

    const [cocktails, setCocktails] = useState([])

    const getCocktails = async () => {
        try {
            await API.get('/cocktails')
                .then(response => {
                    console.log(response)
                    setCocktails(response)
                })

        } catch (error) {
            console.log('Il y a un problème avec la récupération des utilisateurs' + error);
        }
    };

    useEffect(() => {
        console.log(cocktails)
        getCocktails();
    }, []);

    return (
        <div>
            <h1>Cocktails</h1>
            {cocktails.map((row, idx) => {
                const cocktail = row.cocktail
                const ingredients = row.ingredients
                return (
                    <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg ">
                        <img className="object-cover object-center w-full h-56" src="https://static.750g.com/images/1200-675/b520523117d647dab6b842a36f4cc7f5/mojito-le-vrai.jpg" alt="avatar"></img>

                        <div className="px-6 py-4">
                            <h1 className="text-xl font-semibold text-gray-800">{cocktail.name}</h1>

                            <p className="py-2 text-gray-700">{ingredients.map(ingredient => ingredient.name).join(', ')}</p>

                            <div className="flex items-center mt-4 text-gray-700">
                                <svg aria-label="suitcase icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 11H10V13H14V11Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" />
                                </svg>

                                <h1 className="px-2 text-sm">Allérgène</h1>
                                {ingredients.filter(i => i.hasAllergen).length > 0 ? () => {
                                    return (<p>{hasAllergen(ingredients).map(ingredient => ingredient.name).join(', ')}</p>)
                                } : () => {
                                    return (<p>Pas d'allergène</p>)
                                }}
                            </div>
                            <div className="flex items-center mt-4 text-gray-700">
                                <svg aria-label="suitcase icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 11H10V13H14V11Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" />
                                </svg>

                                <h1 className="px-2 text-sm">Prix</h1>
                            </div>
                            <p>Normal : {cocktail.price.toFixed(2)} €</p>
                            <p>Happy Hour : {cocktail.HHPrice.toFixed(2)} €</p>
                        </div>
                    </div>
                )
            })}
        </div >
    )

}

export default Cocktails;