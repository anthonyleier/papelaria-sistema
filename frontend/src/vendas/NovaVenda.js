import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import "./vendaInteracao.css";
import Navbar from "../navbar/Navbar";
import { buscarDadosAPI, buscarDataAtual, enviarDadosAPI, gerarNumeroNotaFiscal, formatarMoeda } from "../utils";

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
      const produto = produtosDisponiveis.find((elemento) => elemento.codigo == produtoSelecionado);
      const novoProduto = {
        produto: produtoSelecionado,
        descricao: produto.descricao,
        quantidade: parseInt(quantidadeSelecionada),
        valor_unitario: parseFloat(produto.valor_unitario),
        total: quantidadeSelecionada * produto.valor_unitario,
      };
      setProdutosVenda([...produtosVenda, novoProduto]);
      setProdutoSelecionado("");
      setQuantidadeSelecionada(1);
    }
  };

  const calcularTotalVenda = () => {
    const valorTotal = produtosVenda.reduce((total, produto) => {
      return total + produto.total;
    }, 0);
    return formatarMoeda(valorTotal);
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
    enviarDadosAPI("vendas/", dados);
    navigate("/vendas");
  };

  useEffect(() => {
    buscarDadosAPI("vendedores/", setVendedoresDisponiveis);
    buscarDadosAPI("clientes/", setClientesDisponiveis);
    buscarDadosAPI("produtos/", setProdutosDisponiveis);
  }, []);

  return (
    <div>
      <Navbar tituloDaPagina="Nova Venda" />
      <div className="sessoes-pagina">
        <h2>Produtos</h2>
        <h2>Dados da Venda</h2>
      </div>
      <div className="conteudo">
        <div className="aba-produtos">
          <div className="inserir-produto">
            <div className="interacao">
              <label>Escolha o produto</label>
              <select onChange={(e) => setProdutoSelecionado(e.target.value)} className="input-select">
                <option value="">Selecione o Produto</option>
                {produtosDisponiveis.map((produto) => (
                  <option key={produto.codigo} value={produto.codigo}>
                    {produto.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div className="interacao">
              <label>Defina a quantidade</label>
              <input type="number" className="input-texto" value={quantidadeSelecionada} onChange={(e) => setQuantidadeSelecionada(e.target.value)} />
            </div>

            <button onClick={adicionarProduto} className="botao-interacao">
              Adicionar
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Produto/Serviço</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {produtosVenda.map((item, index) => (
                <tr key={index}>
                  <td>{item.descricao}</td>
                  <td>{item.quantidade}</td>
                  <td>{formatarMoeda(item.valor_unitario)}</td>
                  <td>{formatarMoeda(item.total)}</td>
                  <button onClick={() => removerProduto(index)}>
                    <FaTrash />
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="aba-dados">
          <div className="interacao">
            <label>Data e Hora da Venda</label>
            <input type="text" value={buscarDataAtual()} readOnly className="input-texto" />
          </div>

          <div className="interacao">
            <label>Escolha um vendedor</label>
            <select onChange={(e) => setVendedorVenda(e.target.value)} className="input-select">
              <option value="">Selecione o Vendedor</option>
              {vendedoresDisponiveis.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>
                  {vendedor.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="interacao">
            <label>Escolha um cliente</label>
            <select onChange={(e) => setClienteVenda(e.target.value)} className="input-select">
              <option value="">Selecione o Cliente</option>
              {clientesDisponiveis.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="interacao">
            <label>Valor Total da Venda</label>
            <input type="text" value={calcularTotalVenda()} readOnly className="input-texto" />
          </div>

          <button onClick={finalizarVenda} className="botao-interacao">
            Finalizar Venda
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovaVenda;
