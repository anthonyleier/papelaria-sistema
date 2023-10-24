import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";

import Navbar from "../navbar/Navbar";
import {
    buscarDadosAPI,
    buscarDataAtual,
    formatarMoeda,
    atualizarDadosAPI,
    gerarNumeroNotaFiscal,
    enviarDadosAPI,
} from "../utils";

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

    const [formularioPreenchido, setFormularioPreenchido] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const tituloPagina = id ? `Alterar Venda ${id}` : "Nova Venda";
    const modoEdicao = id ? true : false;

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
        if (modoEdicao) {
            if (
                vendas.length > 0 &&
                vendedoresDisponiveis.length > 0 &&
                clientesDisponiveis.length > 0 &&
                produtosDisponiveis.length > 0
            ) {
                const vendaEncontrada = vendas.find((venda) => venda.id == id);
                if (vendaEncontrada) {
                    carregarVendedor(vendaEncontrada);
                    carregarCliente(vendaEncontrada);
                    carregarProdutos(vendaEncontrada);
                    setVenda(vendaEncontrada);
                    setCarregando(false);
                }
            }
        }

        if (!modoEdicao) {
            setCarregando(false);
        }
    }, [vendas, id]);

    useEffect(() => {
        console.log(produtosVenda.length);
        if (vendedorVenda && clienteVenda && produtosVenda.length > 0) {
            setFormularioPreenchido(true);
        }
    }, [vendedorVenda, clienteVenda, produtosVenda]);

    const adicionarProduto = () => {
        if (produtoSelecionado && quantidadeSelecionada > 0) {
            const produto = produtosDisponiveis.find((elemento) => elemento.codigo == produtoSelecionado.codigo);
            const novoProduto = {
                produto: produtoSelecionado.codigo,
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

    const finalizarVendaAlteracao = () => {
        let numeroNotaFiscal = venda.numero_nota_fiscal;
        let dados = {
            numero_nota_fiscal: numeroNotaFiscal,
            cliente: clienteVenda,
            vendedor: vendedorVenda,
            produtos: produtosVenda,
        };
        console.log("Venda finalizada:", dados);
        atualizarDadosAPI("vendas/", id, dados);
        navigate("/vendas");
    };

    const finalizarVendaInclusao = () => {
        let numeroNotaFiscal = gerarNumeroNotaFiscal();
        let dados = {
            numero_nota_fiscal: numeroNotaFiscal,
            cliente: clienteVenda,
            vendedor: vendedorVenda,
            produtos: produtosVenda,
        };
        console.log("Venda finalizada:", dados);
        enviarDadosAPI("vendas/", dados);
        navigate("/vendas");
    };

    const finalizarVenda = () => {
        modoEdicao ? finalizarVendaAlteracao() : finalizarVendaInclusao();
    };

    if (carregando) return <p>Carregando...</p>;

    const handleProdutoChange = (value) => {
        setProdutoSelecionado(value);
    };
    return (
        <div>
            <Navbar tituloDaPagina={tituloPagina} />
            <div className="conteudo-pagina-editar-venda">
                <div className="aba-produtos">
                    <h2>Produtos</h2>

                    <div className="grupo-inputs-produto">
                        <div className="input-produto">
                            <Select
                                options={produtosDisponiveis}
                                onChange={handleProdutoChange}
                                value={produtoSelecionado}
                                getOptionLabel={(option) => `${option.codigo} - ${option.descricao}`}
                                getOptionValue={(option) => option.codigo}
                                placeholder="Buscar produto pelo código ou descrição"
                                isSearchable={true}
                            />
                        </div>

                        <div className="input-produto">
                            <input
                                type="number"
                                className="input-texto"
                                value={quantidadeSelecionada}
                                onChange={(e) => setQuantidadeSelecionada(e.target.value)}
                            />
                        </div>

                        <div className="input-produto">
                            <button onClick={adicionarProduto} className="botao-padrao-venda">
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
                                    {vendedor.id} - {vendedor.nome}
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
                                    {cliente.id} - {cliente.nome}
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
                            <button onClick={finalizarVenda} className="botao-padrao-venda">
                                Cancelar
                            </button>
                        </Link>
                        <button
                            disabled={!formularioPreenchido}
                            onClick={finalizarVenda}
                            className="botao-padrao-venda"
                        >
                            Finalizar Venda
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlterarVenda;
