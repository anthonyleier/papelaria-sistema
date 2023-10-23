import React, { useState } from "react";
import { FaShoppingCart, FaDollarSign, FaArrowRight } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./navbar.css";

const navbar = ({ tituloDaPagina }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <nav className="navbar">
      <button className="menu-button" onClick={toggleMenu}>
        <FaBars />
      </button>
      {menuAberto && (
        <div className="menu-lateral">
          <ul>
            <li>
              <Link to="/vendas">
                  <FaShoppingCart />
                  Vendas
                  <FaArrowRight />
              </Link>
            </li>
            <li>
              <Link to="/comissoes">
                  <FaDollarSign />
                  Comissões
                  <FaArrowRight />
              </Link>
            </li>
          </ul>
        </div>
      )}
      <img src="logo.svg" alt="Logo da Empresa" className="logo" />
      <h1 className="titulo-pagina">{tituloDaPagina}</h1>
    </nav>
  );
};

export default navbar;
