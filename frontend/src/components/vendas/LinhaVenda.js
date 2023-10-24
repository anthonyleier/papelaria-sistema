import React, { useState, useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

import LinhaDetalhesVenda from "./LinhaDetalhesVenda";
import LinhaExcluirVenda from "./LinhaExcluirVenda";
import { formatarData, formatarMoeda, buscarDadosAPI } from "../../utils";
import { BotaoEditarVenda, BotaoVerItensVenda, BotaoExcluirVenda, TabelaOpcoes, Td } from "./VendasStyles";

const LinhaVenda = (props) => {
    const venda = props.venda;
    const excluirVenda = props.onExcluir;

    const [linhaExpandida, setLinhaExpandida] = useState(false);
    const [vendedores, setVendedores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [linhaExclusao, setLinhaExclusao] = useState(false);

    function toggleLinhaExpandida() {
        setLinhaExpandida(!linhaExpandida);
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
                <Td>{venda.numero_nota_fiscal}</Td>
                <Td>{getNomeCliente(venda.cliente)}</Td>
                <Td>{getNomeVendedor(venda.vendedor)}</Td>
                <Td>{formatarData(venda.data_hora)}</Td>
                <Td>{calcularValorTotal(venda.produtos)}</Td>
                <Td>
                    <TabelaOpcoes>
                        <BotaoVerItensVenda onClick={() => toggleLinhaExpandida()}>Ver Itens</BotaoVerItensVenda>
                        <BotaoEditarVenda to={`/vendas/alterar/${venda.id}`}>
                            <RiEditBoxLine />
                        </BotaoEditarVenda>
                        <BotaoExcluirVenda
                            onClick={() => {
                                setLinhaExclusao(true);
                            }}
                        >
                            <FaTrash />
                        </BotaoExcluirVenda>
                    </TabelaOpcoes>
                </Td>
            </tr>
            {linhaExpandida && <LinhaDetalhesVenda venda={venda} />}
        </>
    );
};
export default LinhaVenda;
