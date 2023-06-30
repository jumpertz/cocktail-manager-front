import { useState } from "react";
import PropTypes from "prop-types";

function AddIngredientForm({ onAddIngredient }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [hasAllergens, setHasAllergens] = useState(false);
  const [stock, setStock] = useState(0);
  const [stockAlert, setStockAlert] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newIngredient = {
      name: name,
      unit: unit,
      hasAllergens: hasAllergens,
      stock: stock,
      stockAlert: stockAlert,
    };

    onAddIngredient(newIngredient);

    setName("");
    setUnit("");
    setHasAllergens(false);
    setStock(0);
    setStockAlert(0);
  };

  return (
    <div>
      <h2>Ajouter un ingrédient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom de l`ingrédient:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="unit">Unité:</label>
          <input
            type="text"
            name="unit"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hasAllergens">A des allergènes :</label>
          <input
            type="checkbox"
            name="hasAllergens"
            id="hasAllergens"
            value={hasAllergens}
            onChange={(e) => setHasAllergens(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="unit">Stock :</label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="unit">Stock Alerte :</label>
          <input
            type="numbre"
            name="stockAlert"
            id="stockAlert"
            value={stockAlert}
            onChange={(e) => setStockAlert(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

AddIngredientForm.propTypes = {
  onAddIngredient: PropTypes.func.isRequired,
};

export default AddIngredientForm;
