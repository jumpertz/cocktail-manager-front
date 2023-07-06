import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import HomePage from "./pages/admins/HomePage";
import AuthGuard from "./guards/AuthGuard";
import Users from "./pages/admins/users/Users"
import CocktailsList from "./pages/cocktails/CocktailsList";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />


      {/* IS AUTHENTICATED && IS ADMIN */}
      <Route path="/admin" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/admin/cocktails" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/admin/stocks" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/admin/users" element={<AuthGuard><Users /></AuthGuard>} />
      <Route path="/admin/ingredients" element={<AuthGuard><HomePage /></AuthGuard>} />

      {/* ELSE CAN ACCESS LIST OF COCKTAILS */}
      <Route path="/cocktails" element={<CocktailsList />} />

    </Routes>
  );
}

export default AppRoutes;