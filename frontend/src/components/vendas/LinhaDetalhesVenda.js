import React from "react";
import { formatarMoeda } from "../../utils";
import { Td, ThCustom } from "./VendasStyles";

const LinhaDetalhesVenda = (props) => {
    const produtos = props.produtos;

    return (
        <>
            <ThCustom>
                <Td colSpan="2">Produtos/Serviço</Td>
                <Td>Quantidade</Td>
                <Td>Preço Unitário</Td>
                <Td>% de Comissão</Td>
                <Td>Comissão</Td>
            </ThCustom>

            {produtos.map((produto) => (
                <tr>
                    <Td colSpan="2">{produto.descricao}</Td>
                    <Td>{produto.quantidade}</Td>
                    <Td>{formatarMoeda(produto.valor_unitario)}</Td>
                    <Td>{Math.round(produto.percentual_comissao * 100) + "%"}</Td>
                    <Td>{formatarMoeda(produto.comissao)}</Td>
                </tr>
            ))}
        </>
    );
};
export default LinhaDetalhesVenda;
