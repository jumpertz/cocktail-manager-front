import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import HomePage from "./components/admins/HomePage";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/admin" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
