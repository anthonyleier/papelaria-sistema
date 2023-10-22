import React, { useState, useEffect } from "react";
import DetalhesVenda from "./DetalhesVenda";
import { formatarData, formatarMoeda, buscarDadosAPI, deletarDadosAPI } from "../../utils";
import ExcluirVenda from "./ExcluirVenda";
const LinhaVenda = (props) => {
  const venda = props.venda;
  const index = props.index;
  const excluirVenda = props.onExcluir;
  const [linhasExpandidas, setLinhasExpandidas] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [abrirPopupExclusao, setAbrirPopupExclusao] = useState(false);

  function editarVenda() {}

  function toggleLinhaExpandida(index) {
    if (linhasExpandidas.includes(index)) {
      setLinhasExpandidas(linhasExpandidas.filter((i) => i !== index));
    } else {
      setLinhasExpandidas([...linhasExpandidas, index]);
    }
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
    buscarDadosAPI("clientes", setClientes);
    buscarDadosAPI("vendedores", setVendedores);
  }, []);

  if (abrirPopupExclusao) return <ExcluirVenda venda={venda} onExcluir={excluirVenda} setAbrirPopupExclusao={setAbrirPopupExclusao} />;

  return (
    <div>
      <tr key={venda.id}>
        <td>{venda.numero_nota_fiscal}</td>
        <td>{getNomeCliente(venda.cliente)}</td>
        <td>{getNomeVendedor(venda.vendedor)}</td>
        <td>{formatarData(venda.data_hora)}</td>
        <td>{calcularValorTotal(venda.produtos)}</td>
        <td>
          <button onClick={() => toggleLinhaExpandida(index)}>Ver Itens</button>
          <button onClick={() => editarVenda(venda)}>Editar</button>
          <button
            onClick={() => {
              setAbrirPopupExclusao(true);
            }}
          >
            Excluir
          </button>
        </td>
      </tr>
      {linhasExpandidas.includes(index) && <DetalhesVenda venda={venda} />}
    </div>
  );
};
export default LinhaVenda;
