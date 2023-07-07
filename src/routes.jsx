import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import HomePage from "./pages/admins/HomePage";
import AuthGuard from "./guards/AuthGuard";
import Users from "./pages/admins/users/Users"
import Cocktails from "./pages/cocktails/Cocktails";
import AdminCocktails from "./pages/admins/cocktails/Cocktails";
import AdminCocktail from "./pages/admins/cocktails/Cocktail";
import AdminCreateCocktail from "./pages/admins/cocktails/CreateCocktail";
import AdminIngredients from "./pages/admins/ingredients/Ingredients";
import EditUser from "./pages/admins/users/EditUser";
import AddUser from "./pages/admins/users/AddUser";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* IS AUTHENTICATED && IS ADMIN */}
      <Route path="/admin" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/admin/cocktails" element={<AuthGuard><AdminCocktails /></AuthGuard>} />
      <Route path="/admin/cocktails/create" element={<AuthGuard><AdminCreateCocktail /></AuthGuard>} />
      <Route path="/admin/cocktails/:cocktailId" element={<AuthGuard><AdminCocktail /></AuthGuard>} />
      <Route path="/admin/stocks" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/admin/users" element={<AuthGuard><Users /></AuthGuard>} />
      <Route path="/admin/ingredients" element={<AuthGuard><AdminIngredients /></AuthGuard>} />
      <Route path="/admin/ingredients" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/admin/user/edit" element={<AuthGuard><EditUser /></AuthGuard>} />
      <Route path="/admin/user/add" element={<AuthGuard><AddUser /></AuthGuard>} />


      {/* ELSE CAN ACCESS LIST OF COCKTAILS */}
      <Route path="/cocktails" element={<Cocktails />} />

    </Routes>
  );
}

export default AppRoutes;