import React, { useState, useEffect } from "react";
import axios from "axios";

function CocktailList() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cocktails");
        setCocktails(response.data);
      } catch (error) {
        console.log("Erreur lors de la récupération des cocktails :", error);
      }
    };
    fetchCocktails();
  }, []);

  return (
    <div>
      <h2>Liste des cocktails</h2>
      {cocktails.length === 0 ? (
        <p>Il n'y a pas de cocktails à afficher</p>
      ) : (
        <ul>
          {cocktails.map((cocktail) => (
            <li key={cocktail.id}>{cocktail.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CocktailList;
