import { formatarMoeda } from "../../utils";

const DetalhesVenda = (props) => {
  const venda = props.venda;
  return (
    <table>
      <thead>
        <tr>
          <th>Produtos/Serviço</th>
          <th>Quantidade</th>
          <th>Preço Unitário</th>
          <th>% de Comissão</th>
          <th>Comissão</th>
        </tr>
      </thead>
      <tbody>
        {venda.produtos.map((produto) => (
          <tr>
            <td>{produto.descricao}</td>
            <td>{produto.quantidade}</td>
            <td>{formatarMoeda(produto.valor_unitario)}</td>
            <td>{produto.percentual_comissao * 100 + "%"}</td>
            <td>{formatarMoeda(produto.valor_unitario * produto.percentual_comissao)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DetalhesVenda;
