import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

import LinhaDetalhesVenda from "./LinhaDetalhesVenda";
import LinhaExcluirVenda from "./LinhaExcluirVenda";
import { formatarData, formatarMoeda } from "../../utils";
import { BotaoEditarVenda, BotaoVerItensVenda, BotaoExcluirVenda, TabelaOpcoes, Td } from "./VendasStyles";

const LinhaVenda = (props) => {
    const venda = props.venda;
    const excluirVenda = props.onExcluir;

    const [linhaExpandida, setLinhaExpandida] = useState(false);
    const [linhaExclusao, setLinhaExclusao] = useState(false);

    const produtos = venda.produtos;
    const itensVenda = venda.itemvenda_set;
    const produtosPreparados = [];

    produtos.forEach((produto) => {
        const itemVenda = itensVenda.find((itemVenda) => itemVenda.produto.codigo === produto.codigo);

        produtosPreparados.push({
            descricao: produto.descricao,
            quantidade: itemVenda.quantidade,
            valor_unitario: produto.valor_unitario,
            percentual_comissao: itemVenda.percentual_comissao,
            comissao: itemVenda.comissao,
        });
    });

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

    if (linhaExclusao) return <LinhaExcluirVenda venda={venda} onExcluir={excluirVenda} setLinhaExclusao={setLinhaExclusao} />;

    return (
        <>
            <tr key={venda.id}>
                <Td>{venda.numero_nota_fiscal}</Td>
                <Td>{venda.cliente.nome}</Td>
                <Td>{venda.vendedor.nome}</Td>
                <Td>{formatarData(venda.data_hora)}</Td>
                <Td>{calcularValorTotal(produtosPreparados)}</Td>
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
            {linhaExpandida && <LinhaDetalhesVenda produtos={produtosPreparados} />}
        </>
    );
};
export default LinhaVenda;
