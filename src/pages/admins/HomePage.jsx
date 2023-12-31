import { Link } from "react-router-dom";
import cocktails from "../../assets/images/cocktails.jpeg";
import users from "../../assets/images/users-2.jpeg";
import ingredients from "../../assets/images/ingredients-cocktails.jpg";
import stocks from "../../assets/images/stock.png";

function HomePage() {
  return (
    <div>
      <div className="text-center pt-4">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">Bienvenue sur Cocktail Manager</h1>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-2 gap-10">
          <Link to="/admin/cocktails">
            <div className="w-full max-w-xs max-h-xs overflow-hidden bg-white rounded-3xl shadow-lg">
              <img
                className="object-cover w-full h52 max-h-44"
                src={cocktails}
                alt="cocktails"
              ></img>
              <p className="block text-xl font-bold text-gray-800" tabIndex={0}>
                Cocktails
              </p>
              <span className="text-sm text-gray-700">Gestion des cocktails</span>
            </div>
          </Link>
          <Link to="/admin/users">
            <div className="w-full max-w-xs overflow-hidden bg-white rounded-3xl shadow-lg">
              <img
                className="object-cover w-full h56 max-h-44"
                src={users}
                alt="utilisateurs"
              ></img>
              <p className="block text-xl font-bold text-gray-800" tabIndex={0}>
                Utilisateurs
              </p>
              <span className="text-sm text-gray-700">
                Gestion des utilisateurs
              </span>
            </div>
          </Link>
          <Link to="/cocktails">
            <div className="w-full max-w-xs overflow-hidden bg-white rounded-3xl shadow-lg">
              <img
                className="object-cover w-full h56 max-h-44"
                src={ingredients}
                alt="ingrédiens"
              ></img>
              <p className="block text-xl font-bold text-gray-800" tabIndex={0}>
                Ingrédients
              </p>
              <span className="text-sm text-gray-700">
                Gestion des Ingrédients
              </span>
            </div>
          </Link>
          <Link to="/stocks">
            <div className="w-full max-w-xs max-h-xs overflow-hidden bg-white rounded-3xl shadow-lg">
              <img
                className="object-cover w-full h56 max-h-44"
                src={stocks}
                alt="stock"
              ></img>
              <p className="block text-xl font-bold text-gray-800" tabIndex={0}>
                Stock
              </p>
              <span className="text-sm text-gray-700">Gestion des stocks</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
