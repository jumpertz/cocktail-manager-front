import { useState } from 'react';
import API from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [allergen, setAllergen] = useState(false);
  const [stock, setStock] = useState(0);
  const [stockAlert, setStockAlert] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    API.post("/ingredients", {
      name: name,
      unit: unit,
      allergen: allergen,
      stock: stock,
      stockAlert: stockAlert,
    })
      .then(() => {
        toast("L'ingrédient a bien été enregistré");
        navigate("/admin/ingredients")
      })
      .catch(error => {
        console.log(error);
        toast.error("Un problème est survenu !")
      });
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">Ajouter un ingredient</h2>

      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700" htmlFor="firstName">Nom</label>
            <input
              id="name"
              name="name"
              value={name}
              placeholder="John"
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              type="text"
            />
          </div>
          <div>
            <label className="text-gray-700" htmlFor="email">Unité</label>
            <input
              id="unit"
              name="unit"
              value={unit}
              placeholder="exemple@exemple.com"
              onChange={(e) => setUnit(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              type="text"
            />
          </div>
          <div>
            <label className="text-gray-700" htmlFor="email">Stock</label>
            <input
              id="stock"
              name="stock"
              value={stock}
              placeholder="exemple@exemple.com"
              onChange={(e) => setStock(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              type="number"
            />
          </div>
          <div>
            <label className="text-gray-700" htmlFor="email">Alerte stock</label>
            <input
              id="stockAlert"
              name="stockAlert"
              value={stockAlert}
              placeholder="exemple@exemple.com"
              onChange={(e) => setStockAlert(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              type="number"
            />
          </div>
          <div>
            <label className="text-gray-700" htmlFor="email">Allergène</label>
            <input
              id="stockAlert"
              name="stockAlert"
              value={stockAlert}
              placeholder="exemple@exemple.com"
              onChange={(e) => setAllergen(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              type="checkbox"
            />
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <button onClick={handleSubmit} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
      </form>
    </section>
  )
}

export default AddUser;