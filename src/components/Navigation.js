import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/cocktails">Cocktails</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
