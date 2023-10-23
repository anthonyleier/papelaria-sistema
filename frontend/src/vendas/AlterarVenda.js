import React, { useState, useEffect } from "react";
import { atualizarDadosAPI, buscarDadosAPI, buscarDataAtual, enviarDadosAPI, gerarNumeroNotaFiscal } from "../utils";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const NovaVenda = () => {
  const [vendas, setVendas] = useState([]);
  const [venda, setVenda] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [clientesDisponiveis, setClientesDisponiveis] = useState([]);
  const [vendedoresDisponiveis, setVendedoresDisponiveis] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

  const [vendedorVenda, setVendedorVenda] = useState("");
  const [clienteVenda, setClienteVenda] = useState("");
  const [produtosVenda, setProdutosVenda] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    buscarDadosAPI("vendas/", setVendas);
    buscarDadosAPI("vendedores/", setVendedoresDisponiveis);
    buscarDadosAPI("clientes/", setClientesDisponiveis);
    buscarDadosAPI("produtos/", setProdutosDisponiveis);
  }, []);
  const carregarVendedor = (venda) => {
    setVendedorVenda(venda.vendedor);
  };
  const carregarCliente = (venda) => {
    setClienteVenda(venda.cliente);
  };
  const carregarProdutos = (venda) => {
    let carregar = [];
    venda.produtos.forEach((produto) => {
      carregar.push({ produto: parseInt(produto.codigo), quantidade: parseInt(produto.quantidade) });
    });
    setProdutosVenda(carregar);
  };

  useEffect(() => {
    if (vendas.length > 0 && vendedoresDisponiveis.length > 0 && clientesDisponiveis.length > 0 && produtosDisponiveis.length > 0) {
      const vendaEncontrada = vendas.find((venda) => venda.id == id);
      if (vendaEncontrada) {
        carregarVendedor(vendaEncontrada);
        carregarCliente(vendaEncontrada);
        carregarProdutos(vendaEncontrada);
        setVenda(vendaEncontrada);
        setCarregando(false);
      }
    }
  }, [vendas, id]);

  const adicionarProduto = () => {
    if (produtoSelecionado && quantidadeSelecionada > 0) {
      const novoProduto = {
        produto: parseInt(produtoSelecionado),
        quantidade: parseInt(quantidadeSelecionada),
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
    let numeroNotaFiscal = venda.numero_nota_fiscal;
    let dados = { numero_nota_fiscal: numeroNotaFiscal, cliente: clienteVenda, vendedor: vendedorVenda, produtos: produtosVenda };
    console.log("Venda finalizada:", dados);
    atualizarDadosAPI("vendas", id, dados);
    navigate("/vendas");
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <Navbar tituloDaPagina="Alterar Venda" />
      <h1>Alterar Venda {venda.id}</h1>
      <div className="menu-lateral">
        <label>Data e Hora:</label>
        <input type="text" value={buscarDataAtual()} readOnly />
        <select value={vendedorVenda} onChange={(e) => setVendedorVenda(e.target.value)}>
          <option value="">Selecione o Vendedor</option>
          {vendedoresDisponiveis.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nome}
            </option>
          ))}
        </select>
        <select value={clienteVenda} onChange={(e) => setClienteVenda(e.target.value)}>
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
