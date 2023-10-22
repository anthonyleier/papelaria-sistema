import React, { useState, useEffect } from "react";

import { buscarDadosAPI, formatarMoeda } from "../../utils";
import Navbar from "../../Navbar/navbar";
import LinhaVenda from "./LinhaVenda";

import "./vendaspage.css";

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
