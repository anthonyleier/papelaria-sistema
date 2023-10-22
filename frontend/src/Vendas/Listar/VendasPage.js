import React, { useState, useEffect } from "react";

import { buscarDadosAPI } from "../../utils";
import Navbar from "../../Navbar/navbar";
import LinhaVenda from "./LinhaVenda";

import "./vendaspage.css";
import { Link } from "react-router-dom";

const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarDadosAPI("vendas", setVendas);
    if (vendas != []) setCarregando(false);
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <Navbar tituloDaPagina="Vendas" />
      <h1>Vendas Realizadas</h1>
      <Link to="/vendas/adicionar" className="menu-option"><p>Inserir Nova Venda</p></Link>
      <table>
        <thead>
          <tr>
            <th>Nota Fiscal</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Data da Venda</th>
            <th>Valor Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <LinhaVenda venda={venda} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendasPage;
