import React, { useState, useEffect } from "react";

import NavbarStyle from "../navbar/Navbar";
import { formatarMoeda, buscarDadosAPI } from "../../utils";

import { Table, Th, Td, Tfoot, DateInput, Header, Filtro } from "./ComissoesStyles";

function ComissoesPage() {
    const [dataInicio, setDataInicio] = useState("2023-10-01");
    const [dataFim, setDataFim] = useState("2023-10-31");
    const [comissoes, setComissoes] = useState([]);
    const [totalComissoes, setTotalComissoes] = useState(0);

    useEffect(() => {
        const calcularTotalComissoes = () => {
            let total = 0;
            comissoes.forEach((comissao) => {
                total += comissao.valor_comissao;
            });
            setTotalComissoes(total);
        };

        calcularTotalComissoes();
    }, [comissoes]);

    useEffect(() => {
        buscarDadosAPI(`comissao/?data_inicial=${dataInicio}&data_final=${dataFim}`, setComissoes);
    }, [dataInicio, dataFim]);

    return (
        <div>
            <NavbarStyle titulo="Comissões" />
            <Header>
                <h1>Relatório de Comissões</h1>
                <Filtro>
                    <DateInput type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                    <DateInput type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                </Filtro>
            </Header>

            <Table>
                <thead>
                    <tr>
                        <Th>Cód.</Th>
                        <Th>Vendedor</Th>
                        <Th>Total de Vendas</Th>
                        <Th>Total de Comissões</Th>
                    </tr>
                </thead>
                <tbody>
                    {comissoes.map((comissao, index) => (
                        <tr key={index}>
                            <Td>{comissao.id_vendedor}</Td>
                            <Td>{comissao.nome_vendedor}</Td>
                            <Td>{comissao.qtd_vendas}</Td>
                            <Td>{formatarMoeda(comissao.valor_comissao)}</Td>
                        </tr>
                    ))}
                </tbody>
                <Tfoot>
                    <tr>
                        <td colSpan="3">Total de Comissões do Período</td>
                        <td>{formatarMoeda(totalComissoes)}</td>
                    </tr>
                </Tfoot>
            </Table>
        </div>
    );
}

export default ComissoesPage;
