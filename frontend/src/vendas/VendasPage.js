import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { buscarDadosAPI, deletarDadosAPI } from "../utils";
import Navbar from "../navbar/Navbar";
import LinhaVenda from "./LinhaVenda";
import "./vendas.css";

const VendasPage = () => {
    const [vendas, setVendas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarDadosAPI("vendas/", setVendas);
        setCarregando(false);
    }, []);

    const removerVendaLista = (id) => {
        const vendasAtualizadas = vendas.filter((venda) => venda.id != id);
        setVendas(vendasAtualizadas);
    };

    const excluirVenda = (venda, setAbrirPopupExclusao) => {
        deletarDadosAPI("vendas", venda.id);
        setAbrirPopupExclusao(false);
        removerVendaLista(venda.id);
    };

    if (carregando) return <h1>Carregando...</h1>;

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
