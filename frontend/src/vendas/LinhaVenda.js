import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

import LinhaDetalhesVenda from "./LinhaDetalhesVenda";
import LinhaExcluirVenda from "./LinhaExcluirVenda";
import { formatarData, formatarMoeda, buscarDadosAPI } from "../utils";

const LinhaVenda = (props) => {
    const venda = props.venda;
    const excluirVenda = props.onExcluir;

    const [linhaExpandida, setLinhaExpandida] = useState(false);
    const [vendedores, setVendedores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [linhaExclusao, setLinhaExclusao] = useState(false);

    function toggleLinhaExpandida() {
        setLinhaExpandida(!linhaExpandida)
    }

    const calcularValorTotal = (produtos) => {
        let valorTotal = 0;
        produtos.forEach((produto) => {
            valorTotal += parseFloat(produto.valor_unitario) * parseFloat(produto.quantidade);
        });
        return formatarMoeda(valorTotal);
    };

    const getNomeVendedor = (id) => {
        const vendedor = vendedores.find((vendedor) => vendedor.id === id);
        return vendedor ? vendedor.nome : null;
    };

    const getNomeCliente = (id) => {
        const cliente = clientes.find((vendedor) => vendedor.id === id);
        return cliente ? cliente.nome : null;
    };

    useEffect(() => {
        buscarDadosAPI("clientes/", setClientes);
        buscarDadosAPI("vendedores/", setVendedores);
    }, []);

    if (linhaExclusao)
        return <LinhaExcluirVenda venda={venda} onExcluir={excluirVenda} setLinhaExclusao={setLinhaExclusao} />;

    return (
        <>
            <tr key={venda.id}>
                <td>{venda.numero_nota_fiscal}</td>
                <td>{getNomeCliente(venda.cliente)}</td>
                <td>{getNomeVendedor(venda.vendedor)}</td>
                <td>{formatarData(venda.data_hora)}</td>
                <td>{calcularValorTotal(venda.produtos)}</td>
                <td className="tabela-opcoes">
                    <span className="botao-ver-itens-venda" onClick={() => toggleLinhaExpandida()}>
                        Ver Itens
                    </span>
                    <Link className="botao-editar-venda" to={`/vendas/alterar/${venda.id}`}>
                        <RiEditBoxLine />
                    </Link>
                    <span
                        className="botao-excluir"
                        onClick={() => {
                            setLinhaExclusao(true);
                        }}
                    >
                        <FaTrash />
                    </span>
                </td>
            </tr>
            {linhaExpandida && <LinhaDetalhesVenda venda={venda} />}
        </>
    );
};
export default LinhaVenda;
