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
} from "../../utils";
import {
    AbaDados,
    AbaProdutos,
    BotaoExcluirProduto,
    BotaoPadraoVenda,
    BotoesConfirmacao,
    ConteudoPagina,
    GrupoInputsProduto,
    InputDados,
    InputProduto,
    Table,
    Td,
    Th,
    ValorTotalVenda,
} from "./VendasStyles";

const VendaForm = () => {
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

    const carregarProdutos = (venda) => {
        let produtosCarregados = [];
        venda.produtos.forEach((produto) => {
            produtosCarregados.push({
                produto: parseInt(produto.codigo),
                descricao: produto.descricao,
                valor_unitario: produto.valor_unitario,
                quantidade: parseInt(produto.quantidade),
                total: produto.valor_unitario * parseInt(produto.quantidade),
            });
        });
        setProdutosVenda(produtosCarregados);
    };

    useEffect(() => {
        if (modoEdicao) {
            if (
                vendas.length > 0 &&
                vendedoresDisponiveis.length > 0 &&
                clientesDisponiveis.length > 0 &&
                produtosDisponiveis.length > 0
            ) {
                const vendaEncontrada = vendas.find((venda) => venda.id === parseInt(id));

                if (vendaEncontrada) {
                    setVendedorVenda(vendaEncontrada.vendedor);
                    setClienteVenda(vendaEncontrada.cliente);
                    carregarProdutos(vendaEncontrada);
                    setVenda(vendaEncontrada);
                }
            }
        }

        setCarregando(false);
    }, [vendas, id]);

    useEffect(() => {
        if (vendedorVenda && clienteVenda && produtosVenda.length > 0) {
            setFormularioPreenchido(true);
        }
    }, [vendedorVenda, clienteVenda, produtosVenda]);

    const inserirProdutoVenda = (produto) => {
        const produtoExistenteIndex = produtosVenda.findIndex((elemento) => elemento.produto === produto.produto);

        if (produtoExistenteIndex !== -1) {
            const produtosAtualizados = [...produtosVenda];

            produtosAtualizados[produtoExistenteIndex] = {
                ...produtosAtualizados[produtoExistenteIndex],
                quantidade: produtosAtualizados[produtoExistenteIndex].quantidade + produto.quantidade,
                total: produtosAtualizados[produtoExistenteIndex].total + produto.total,
            };

            setProdutosVenda(produtosAtualizados);
        }

        if (produtoExistenteIndex === -1) setProdutosVenda([...produtosVenda, produto]);
    };

    const adicionarProduto = () => {
        if (produtoSelecionado && quantidadeSelecionada > 0) {
            const produto = produtosDisponiveis.find((elemento) => elemento.codigo === produtoSelecionado.codigo);

            const novoProduto = {
                produto: produtoSelecionado.codigo,
                descricao: produto.descricao,
                quantidade: parseInt(quantidadeSelecionada),
                valor_unitario: parseFloat(produto.valor_unitario),
                total: quantidadeSelecionada * produto.valor_unitario,
            };

            inserirProdutoVenda(novoProduto);
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
        enviarDadosAPI("vendas/", dados);
        navigate("/vendas");
    };

    const finalizarVenda = () => {
        modoEdicao ? finalizarVendaAlteracao() : finalizarVendaInclusao();
    };

    if (carregando) return <p>Carregando...</p>;

    return (
        <div>
            <Navbar titulo={tituloPagina} />
            <ConteudoPagina>
                <AbaProdutos>
                    <h2>Produtos</h2>

                    <GrupoInputsProduto>
                        <InputProduto>
                            <Select
                                options={produtosDisponiveis}
                                onChange={(e) => {
                                    setProdutoSelecionado(e);
                                }}
                                value={produtoSelecionado}
                                getOptionLabel={(option) => `${option.codigo} - ${option.descricao}`}
                                getOptionValue={(option) => option.codigo}
                                placeholder="Buscar produto pelo código ou descrição"
                                isSearchable={true}
                            />
                        </InputProduto>

                        <InputProduto>
                            <input
                                type="number"
                                className="input-texto"
                                value={quantidadeSelecionada}
                                onChange={(e) => setQuantidadeSelecionada(e.target.value)}
                            />
                        </InputProduto>

                        <InputProduto>
                            <BotaoPadraoVenda onClick={adicionarProduto}>Adicionar</BotaoPadraoVenda>
                        </InputProduto>
                    </GrupoInputsProduto>

                    <Table>
                        <thead>
                            <tr>
                                <Th>Produto/Serviço</Th>
                                <Th>Quantidade</Th>
                                <Th>Preço Unitário</Th>
                                <Th>Total</Th>
                                <Th>Opções</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosVenda.map((item, index) => (
                                <tr key={index}>
                                    <Td>{item.descricao}</Td>
                                    <Td>{item.quantidade}</Td>
                                    <Td>{formatarMoeda(item.valor_unitario)}</Td>
                                    <Td>{formatarMoeda(item.total)}</Td>
                                    <BotaoExcluirProduto onClick={() => removerProduto(index)}>
                                        <FaTrash />
                                    </BotaoExcluirProduto>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </AbaProdutos>
                <AbaDados>
                    <h2>Dados da Venda</h2>
                    <InputDados>
                        <label>Data e Hora da Venda</label>
                        <input type="text" value={buscarDataAtual()} readOnly />
                    </InputDados>

                    <InputDados>
                        <label>Escolha um vendedor</label>
                        <select value={vendedorVenda} onChange={(e) => setVendedorVenda(e.target.value)}>
                            <option value="">Selecione o Vendedor</option>
                            {vendedoresDisponiveis.map((vendedor) => (
                                <option key={vendedor.id} value={vendedor.id}>
                                    {vendedor.id} - {vendedor.nome}
                                </option>
                            ))}
                        </select>
                    </InputDados>

                    <InputDados>
                        <label>Escolha um cliente</label>
                        <select value={clienteVenda} onChange={(e) => setClienteVenda(e.target.value)}>
                            <option value="">Selecione o Cliente</option>
                            {clientesDisponiveis.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.id} - {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </InputDados>

                    <ValorTotalVenda>
                        <p>Valor total da venda:</p>
                        <b>{calcularTotalVenda()}</b>
                    </ValorTotalVenda>

                    <BotoesConfirmacao>
                        <Link to="/vendas">
                            <BotaoPadraoVenda onClick={finalizarVenda}>Cancelar</BotaoPadraoVenda>
                        </Link>
                        <BotaoPadraoVenda disabled={!formularioPreenchido} onClick={finalizarVenda}>
                            Finalizar Venda
                        </BotaoPadraoVenda>
                    </BotoesConfirmacao>
                </AbaDados>
            </ConteudoPagina>
        </div>
    );
};

export default VendaForm;
