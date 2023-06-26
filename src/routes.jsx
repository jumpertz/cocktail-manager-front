import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
//import CocktailList from "./components/CocktailList";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/cocktails" element={<CocktailList />} /> */}
    </Routes>
  );
}

export default AppRoutes;
