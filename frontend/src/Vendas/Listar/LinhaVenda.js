import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <div key={venda.id} class='linha-tabela'>
        <div>{venda.numero_nota_fiscal}</div>
        <div>{getNomeCliente(venda.cliente)}</div>
        <div>{getNomeVendedor(venda.vendedor)}</div>
        <div>{formatarData(venda.data_hora)}</div>
        <div>{calcularValorTotal(venda.produtos)}</div>
        <div>
          <button onClick={() => toggleLinhaExpandida(index)}>Ver Itens</button>
          <Link to={`/vendas/alterar/${venda.id}`}><button>Editar</button></Link>
          <button
            onClick={() => {
              setAbrirPopupExclusao(true);
            }}
          >
            Excluir
          </button>
        </div>
      </div>
      {linhasExpandidas.includes(index) && <DetalhesVenda venda={venda} />}
    </div>
  );
};
export default LinhaVenda;
