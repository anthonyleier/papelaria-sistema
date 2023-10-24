import React, { useState } from "react";
import { FaShoppingCart, FaDollarSign, FaArrowRight, FaWindowClose } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = (props) => {
    const titulo = props.titulo;
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
                <div className="menu-aberto">
                    <FaWindowClose onClick={toggleMenu} className="menu-button-fechar" />
                    <Link to="/vendas" className="menu-link">
                        <div className="menu-item">
                            <FaShoppingCart /> <p>Vendas</p> <FaArrowRight />
                        </div>
                    </Link>
                    <Link to="/comissoes" className="menu-link">
                        <div className="menu-item">
                            <FaDollarSign /> <p>Comissões</p> <FaArrowRight />
                        </div>
                    </Link>
                </div>
            )}
            <img src="/logo.svg" alt="Logo da Empresa" className="logo" />
            <h1 className="titulo-pagina">{titulo}</h1>
        </nav>
    );
};

export default Navbar;
