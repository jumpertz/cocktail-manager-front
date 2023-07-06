import { useEffect, useState } from "react"
import API from "../../api"

function CocktailsList() {

    const [cocktails, setCocktails] = useState([])

    const getCocktails = async () => {
        try {
            const response = await API.get('/cocktails');


            setCocktails(response)
        } catch (error) {
            console.log('Il y a un problème avec la récupération des utilisateurs' + error);
        }
    };

    useEffect(() => {
        getCocktails();
    }, []);

    return (
        <div>
            <h1>Cocktails</h1>
            {cocktails.map((cocktail, idx) => (
                <div key={idx}>
                    <h2>{cocktail.name}</h2>
                    <p>{cocktail.description}</p>
                    <p>{cocktail.price}</p>
                    <p>{cocktail.HHPrice}</p>
                </div>
            ))}
        </div>
    )

}

export default CocktailsList;