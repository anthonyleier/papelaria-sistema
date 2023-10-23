import React from "react";
import { formatarMoeda } from "../utils";

const DetalhesVenda = (props) => {
    const venda = props.venda;
    return (
        <React.Fragment key={venda.id}>
            <tr>
                <td colSpan='2'>Produtos/Serviço</td>
                <td>Quantidade</td>
                <td>Preço Unitário</td>
                <td>% de Comissão</td>
                <td>Comissão</td>
            </tr>

            {venda.produtos.map((produto) => (
                <tr>
                    <td colSpan='2'>{produto.descricao}</td>
                    <td>{produto.quantidade}</td>
                    <td>{formatarMoeda(produto.valor_unitario)}</td>
                    <td>{produto.percentual_comissao * 100 + "%"}</td>
                    <td>{formatarMoeda(produto.valor_unitario * produto.percentual_comissao)}</td>
                </tr>
            ))}
        </React.Fragment>
    );
};
export default DetalhesVenda;
