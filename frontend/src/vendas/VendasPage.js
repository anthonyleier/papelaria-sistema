import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { buscarDadosAPI, deletarDadosAPI } from "../utils";
import Navbar from "../navbar/Navbar";
import LinhaVenda from "./LinhaVenda";
import "./vendasPage.css";

const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [forcar, setForcar] = useState(false);

  useEffect(() => {
    buscarDadosAPI("vendas/", setVendas);
    if (vendas != []) setCarregando(false);
  }, [forcar]);

  const excluirVenda = (venda, setAbrirPopupExclusao) => {
    deletarDadosAPI("vendas", venda.id);
    setAbrirPopupExclusao(false);
    buscarDadosAPI("vendas/", setVendas);
    setForcar(true);
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <Navbar tituloDaPagina="Vendas" />
      <div class="header-pagina">
        <h1>Vendas Realizadas</h1>
        <Link to="/vendas/adicionar" className="botao-header">
          <p>Inserir Nova Venda</p>
        </Link>
      </div>
      <div>
        <div>
          <div class="cabecalho">
            <div class="tabela-cabecalho">Nota Fiscal</div>
            <div class="tabela-cabecalho">Cliente</div>
            <div class="tabela-cabecalho">Vendedor</div>
            <div class="tabela-cabecalho">Data da Venda</div>
            <div class="tabela-cabecalho">Valor Total</div>
            <div class="tabela-cabecalho">Opções</div>
          </div>
        </div>
        <div>
          {vendas.map((venda) => (
            <LinhaVenda venda={venda} onExcluir={excluirVenda} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendasPage;
