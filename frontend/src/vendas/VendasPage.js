import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { buscarDadosAPI, deletarDadosAPI } from "../utils";
import Navbar from "../navbar/Navbar";
import LinhaVenda from "./LinhaVenda";
import "./vendas.css";

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

            <div className="header-pagina">
                <h1>Vendas Realizadas</h1>
                <Link to="/vendas/adicionar" className="botao-header">
                    <p>Inserir Nova Venda</p>
                </Link>
            </div>

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
                        <LinhaVenda venda={venda} onExcluir={excluirVenda} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VendasPage;
