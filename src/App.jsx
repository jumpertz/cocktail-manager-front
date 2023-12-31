import "./App.css";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <AppRoutes />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
