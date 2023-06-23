import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CocktailList from "./components/CocktailList";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/cocktails" element={<CocktailList />} />
    </Routes>
  );
}

export default AppRoutes;
