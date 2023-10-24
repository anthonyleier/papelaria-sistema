import { BotaoConfirmarExclusao, BotoesPerguntarExclusao } from "./VendasStyles";

const LinhaExcluirVenda = (props) => {
  const venda = props.venda;
  const setLinhaExclusao = props.setLinhaExclusao;
  const excluirVenda = props.onExcluir;

  return (
    <tr>
      <td colSpan="5"><p>Tem certeza de que deseja excluir esta venda?</p></td>
      <BotoesPerguntarExclusao>
        <BotaoConfirmarExclusao onClick={() => {excluirVenda(venda, setLinhaExclusao);}}>Sim, Excluir</BotaoConfirmarExclusao>
        <button onClick={() => {setLinhaExclusao(false);}}>Cancelar</button>
      </BotoesPerguntarExclusao>
    </tr>
  );
};
export default LinhaExcluirVenda;
