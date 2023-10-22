import React from "react";
import { FaShoppingCart, FaDollarSign, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./menu.css";

function MenuPage() {
  return (
    <div className="menu">
      <Link to="/vendas" className="menu-option">
        <div className="option-icon">
          <FaShoppingCart />
        </div>
        <div className="option-label">Vendas</div>
        <div className="arrow-icon">
          <FaArrowRight />
        </div>
      </Link>
      <Link to="/comissoes" className="menu-option">
        <div className="option-icon">
          <FaDollarSign />
        </div>
        <div className="option-label">Comissões</div>
        <div className="arrow-icon">
          <FaArrowRight />
        </div>
      </Link>
    </div>
  );
}

export default MenuPage;
