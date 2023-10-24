import React, { useState, useEffect } from "react";

import { buscarDadosAPI, deletarDadosAPI } from "../../utils";
import Navbar from "../navbar/Navbar";
import LinhaVenda from "./LinhaVenda";
import { BotaoHeader, HeaderPagina, Table, Th } from "./VendasStyles";

const VendasPage = () => {
    const [vendas, setVendas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarDadosAPI("vendas/", setVendas);
        setCarregando(false);
    }, []);

    const removerVendaLista = (id) => {
        const vendasAtualizadas = vendas.filter((venda) => venda.id !== id);
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
            <Navbar titulo="Vendas" />

            <HeaderPagina>
                <h1>Vendas Realizadas</h1>
                <BotaoHeader to="/vendas/adicionar">
                    <p>Inserir Nova Venda</p>
                </BotaoHeader>
            </HeaderPagina>

            <Table>
                <thead>
                    <tr>
                        <Th>Nota Fiscal</Th>
                        <Th>Cliente</Th>
                        <Th>Vendedor</Th>
                        <Th>Data da Venda</Th>
                        <Th>Valor Total</Th>
                        <Th>Opções</Th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda) => (
                        <LinhaVenda venda={venda} onExcluir={excluirVenda} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default VendasPage;
