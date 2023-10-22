// Altere este código com um botão de remover produtos adicionados
import React, { useState, useEffect } from "react";
import { buscarDadosAPI, buscarDataAtual, enviarDadosAPI, gerarNumeroNotaFiscal } from "../../utils";
import Navbar from "../../Navbar/navbar";
import { useNavigate } from "react-router-dom";
const NovaVenda = () => {
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [clientesDisponiveis, setClientesDisponiveis] = useState([]);
  const [vendedoresDisponiveis, setVendedoresDisponiveis] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

  const [vendedorVenda, setVendedorVenda] = useState("");
  const [clienteVenda, setClienteVenda] = useState("");
  const [produtosVenda, setProdutosVenda] = useState([]);
  const navigate = useNavigate();

  const adicionarProduto = () => {
    if (produtoSelecionado && quantidadeSelecionada > 0) {
      const novoProduto = {
        produto: produtoSelecionado,
        quantidade: quantidadeSelecionada,
      };
      setProdutosVenda([...produtosVenda, novoProduto]);
      setProdutoSelecionado("");
      setQuantidadeSelecionada(1);
    }
  };

  const removerProduto = (index) => {
    const novosProdutos = [...produtosVenda];
    novosProdutos.splice(index, 1);
    setProdutosVenda(novosProdutos);
  };

  const finalizarVenda = () => {
    let numeroNotaFiscal = gerarNumeroNotaFiscal();
    let dados = { numero_nota_fiscal: numeroNotaFiscal, cliente: clienteVenda, vendedor: vendedorVenda, produtos: produtosVenda };
    console.log("Venda finalizada:", dados);
    enviarDadosAPI("vendas", dados);
    // navigate("/vendas");
  };

  useEffect(() => {
    buscarDadosAPI("vendedores", setVendedoresDisponiveis);
    buscarDadosAPI("clientes", setClientesDisponiveis);
    buscarDadosAPI("produtos", setProdutosDisponiveis);
  }, []);

  return (
    <div>
      <Navbar tituloDaPagina="Nova Venda" />
      <h1>Nova Venda</h1>
      <div className="menu-lateral">
        <label>Data e Hora:</label>
        <input type="text" value={buscarDataAtual()} readOnly />

        <select onChange={(e) => setVendedorVenda(e.target.value)}>
          <option value="">Selecione o Vendedor</option>
          {vendedoresDisponiveis.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nome}
            </option>
          ))}
        </select>
        <select onChange={(e) => setClienteVenda(e.target.value)}>
          <option value="">Selecione o Cliente</option>
          {clientesDisponiveis.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="conteudo-venda">
        <h2>Itens da Venda</h2>
        <div>
          <select onChange={(e) => setProdutoSelecionado(e.target.value)}>
            <option value="">Selecione o Produto</option>
            {produtosDisponiveis.map((produto) => (
              <option key={produto.codigo} value={produto.codigo}>
                {produto.descricao}
              </option>
            ))}
          </select>
          <input type="number" value={quantidadeSelecionada} onChange={(e) => setQuantidadeSelecionada(e.target.value)} />
          <button onClick={adicionarProduto}>Adicionar Produto</button>
        </div>
        <ul>
          {produtosVenda.map((item, index) => (
            <li key={index}>
              {item.produto} - Quantidade: {item.quantidade}
              <button onClick={() => removerProduto(index)}>Remover</button>
            </li>
          ))}
        </ul>
        <button onClick={finalizarVenda}>Finalizar Venda</button>
      </div>
    </div>
  );
};

export default NovaVenda;
