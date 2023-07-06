import API from "../../api"

function Cocktail() {

    [cocktail, setCocktail] = useState(
        {
            name: "",
            description: "",
            price: 0,
            HHPrice: 0,
        }
    )

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
                const response = await API.get(`/cocktails/${id}/ingredients`)
                setCocktail(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCocktail()
    }, [])

    return (
        <div>
            <h1>Cocktail</h1>
            <p>{cocktail.name}</p>
            <p>{cocktail.description}</p>
            <p>{cocktail.price}</p>
            <p>{cocktail.HHPrice}</p>
        </div>
    )

}

export default Cocktail;