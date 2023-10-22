import React from 'react';
import { FaBars } from 'react-icons/fa';
import './navbar.css'

const Navbar = ({ tituloDaPagina }) => {
  return (
    <nav className="navbar">
      <button className="menu-button"><FaBars /></button>
      <img src="caminho-para-logo.png" alt="Logo da Empresa" className="logo" />
      <h1 className="titulo-pagina">{tituloDaPagina}</h1>
    </nav>
  );
};

export default Navbar;
