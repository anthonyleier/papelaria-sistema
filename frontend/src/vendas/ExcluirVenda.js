const ExcluirVenda = (props) => {
  const venda = props.venda;
  const setAbrirPopupExclusao = props.setAbrirPopupExclusao;
  const excluirVenda = props.onExcluir;

  return (
    <tr>
      <td colSpan="5"><p>Tem certeza de que deseja excluir esta venda?</p></td>
      <td className="botoes-perguntar-exclusao">
        <button className="botao-confirmar-exclusao" onClick={() => {excluirVenda(venda, setAbrirPopupExclusao);}}>Sim, Excluir</button>
        <button onClick={() => {setAbrirPopupExclusao(false);}}>Cancelar</button>
      </td>
    </tr>
  );
};
export default ExcluirVenda;
