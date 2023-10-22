import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Navbar/navbar";

import "./vendaspage.css";

function excluirVenda() {}

function editarVenda() {}

function verItensDaVenda() {}

const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const formatarData = (dataString) => {
    const data = new Date(dataString);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const horas = data.getHours();
    const minutos = data.getMinutes();

    const dataFormatada = `${dia}/${mes < 10 ? "0" : ""}${mes}/${ano} - ${horas}:${minutos < 10 ? "0" : ""}${minutos}`;
    return dataFormatada;
  };

  const calcularValorTotal = (produtos) => {
    let valorTotal = 0;
    produtos.forEach(produto => {
      valorTotal += parseFloat(produto.valor_unitario) * parseFloat(produto.quantidade)
    });
    return valorTotal;
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
    const buscarDados = async (endpoint, setter) => {
      try {
        const response = await axios.get(`http://localhost:8000/${endpoint}/`);
        setter(response.data);
        setCarregando(false);
      } catch (error) {
        console.error(`Erro ao buscar dados da API (${endpoint})`, error);
        setCarregando(false);
      }
    };

    buscarDados("vendas", setVendas);
    buscarDados("clientes", setClientes);
    buscarDados("vendedores", setVendedores);
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <Navbar tituloDaPagina="Vendas" />
      <table>
        <thead>
          <tr>
            <th>Nota Fiscal</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Data da Venda</th>
            <th>Valor Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id}>
              <td>{venda.numero_nota_fiscal}</td>
              <td>{getNomeCliente(venda.cliente)}</td>
              <td>{getNomeVendedor(venda.vendedor)}</td>
              <td>{formatarData(venda.data_hora)}</td>
              <td>{calcularValorTotal(venda.produtos)}</td>
              <td>
                <button onClick={() => verItensDaVenda(venda)}>Ver Itens</button>
                <button onClick={() => editarVenda(venda)}>Editar</button>
                <button onClick={() => excluirVenda(venda)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendasPage;
