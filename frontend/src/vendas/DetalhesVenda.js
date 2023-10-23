import { formatarMoeda } from "../utils";

const DetalhesVenda = (props) => {
  const venda = props.venda;
  return (
    <div>
      <div className="cabecalho">
        <div>Produtos/Serviço</div>
        <div>Quantidade</div>
        <div>Preço Unitário</div>
        <div>% de Comissão</div>
        <div>Comissão</div>
      </div>
      {venda.produtos.map((produto) => (
        <div className="linha-tabela">
          <div>{produto.descricao}</div>
          <div>{produto.quantidade}</div>
          <div>{formatarMoeda(produto.valor_unitario)}</div>
          <div>{produto.percentual_comissao * 100 + "%"}</div>
          <div>{formatarMoeda(produto.valor_unitario * produto.percentual_comissao)}</div>
        </div>
      ))}
    </div>
  );
};
export default DetalhesVenda;
