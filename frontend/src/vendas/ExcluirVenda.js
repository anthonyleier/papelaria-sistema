const ExcluirVenda = (props) => {
  const venda = props.venda;
  const setAbrirPopupExclusao = props.setAbrirPopupExclusao;
  const excluirVenda = props.onExcluir;

  return (
    <div className="popup-exclusao">
      <p>Tem certeza de que deseja excluir esta venda?</p>
      <button
        onClick={() => {
          excluirVenda(venda, setAbrirPopupExclusao);
        }}
      >
        Sim, Excluir
      </button>
      <button
        onClick={() => {
          setAbrirPopupExclusao(false);
        }}
      >
        Cancelar
      </button>
    </div>
  );
};
export default ExcluirVenda;
