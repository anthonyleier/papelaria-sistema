import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import Navbar from "../navbar/Navbar";
import { buscarDadosAPI, buscarDataAtual, formatarMoeda, atualizarDadosAPI } from "../utils";

const AlterarVenda = () => {
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

    const calcularTotalVenda = () => {
        const valorTotal = produtosVenda.reduce((total, produto) => {
            return total + produto.total;
        }, 0);
        return formatarMoeda(valorTotal);
    };

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
            carregar.push({
                produto: parseInt(produto.codigo),
                descricao: produto.descricao,
                valor_unitario: produto.valor_unitario,
                quantidade: parseInt(produto.quantidade),
                total: produto.valor_unitario * parseInt(produto.quantidade),
            });
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

    const removerProduto = (index) => {
        const novosProdutos = [...produtosVenda];
        novosProdutos.splice(index, 1);
        setProdutosVenda(novosProdutos);
    };

    const finalizarVenda = () => {
        let numeroNotaFiscal = venda.numero_nota_fiscal;
        let dados = { numero_nota_fiscal: numeroNotaFiscal, cliente: clienteVenda, vendedor: vendedorVenda, produtos: produtosVenda };
        console.log("Venda finalizada:", dados);
        atualizarDadosAPI("vendas/", id, dados);
        navigate("/vendas");
    };

    if (carregando) return <p>Carregando...</p>;

    return (
        <div>
            <Navbar tituloDaPagina="Nova Venda" />
            <div className="conteudo-pagina-editar-venda">
                <div className="aba-produtos">
                    <h2>Produtos</h2>

                    <div className="grupo-inputs-produto">

                        <div className="input-produto">
                            <select onChange={(e) => setProdutoSelecionado(e.target.value)}>
                                <option value="">Selecione o Produto</option>
                                {produtosDisponiveis.map((produto) => (
                                    <option key={produto.codigo} value={produto.codigo}>
                                        {produto.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-produto">
                            <input type="number" className="input-texto" value={quantidadeSelecionada} onChange={(e) => setQuantidadeSelecionada(e.target.value)} />
                        </div>

                        <div className="input-produto">
                            <button onClick={adicionarProduto} className="botao-interacao">
                                Adicionar
                            </button>
                        </div>
                    </div>

                    <table className="tabela-produtos-venda">
                        <thead>
                            <tr>
                                <th>Produto/Serviço</th>
                                <th>Quantidade</th>
                                <th>Preço Unitário</th>
                                <th>Total</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosVenda.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.descricao}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{formatarMoeda(item.valor_unitario)}</td>
                                    <td>{formatarMoeda(item.total)}</td>
                                    <td className="botao-excluir" onClick={() => removerProduto(index)}>
                                        <FaTrash />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="aba-dados">
                    <h2>Dados da Venda</h2>
                    <div className="input-dados">
                        <label>Data e Hora da Venda</label>
                        <input type="text" value={buscarDataAtual()} readOnly />
                    </div>

                    <div className="input-dados">
                        <label>Escolha um vendedor</label>
                        <select value={vendedorVenda} onChange={(e) => setVendedorVenda(e.target.value)}>
                            <option value="">Selecione o Vendedor</option>
                            {vendedoresDisponiveis.map((vendedor) => (
                                <option key={vendedor.id} value={vendedor.id}>
                                    {vendedor.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-dados">
                        <label>Escolha um cliente</label>
                        <select value={clienteVenda} onChange={(e) => setClienteVenda(e.target.value)}>
                            <option value="">Selecione o Cliente</option>
                            {clientesDisponiveis.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="valor-total-venda">
                        <p>Valor total da venda:</p>
                        <b>{calcularTotalVenda()}</b>
                    </div>

                    <div className="botoes-confirmacao">
                        <Link to="/vendas">
                            <button onClick={finalizarVenda} className="botao-interacao">
                                Cancelar
                            </button>
                        </Link>
                        <button onClick={finalizarVenda} className="botao-interacao">
                            Finalizar Venda
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlterarVenda;
