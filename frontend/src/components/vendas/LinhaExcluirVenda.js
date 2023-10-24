import { BotaoCancelarExclusao, BotaoConfirmarExclusao, BotoesPerguntarExclusao, Td } from "./VendasStyles";

const LinhaExcluirVenda = (props) => {
  const venda = props.venda;
  const setLinhaExclusao = props.setLinhaExclusao;
  const excluirVenda = props.onExcluir;

  return (
    <tr>
      <Td colSpan="5"><p>Tem certeza de que deseja excluir esta venda?</p></Td>
      <Td>
        <BotoesPerguntarExclusao>
          <BotaoConfirmarExclusao onClick={() => {excluirVenda(venda, setLinhaExclusao);}}>Sim, Excluir</BotaoConfirmarExclusao>
          <BotaoCancelarExclusao onClick={() => {setLinhaExclusao(false);}}>Cancelar</BotaoCancelarExclusao>
        </BotoesPerguntarExclusao>
      </Td>
    </tr>
  );
};
export default LinhaExcluirVenda;
