import React from "react";
import "./vendaspage.css";

function excluirVenda(){

}

function editarVenda(){

}

function verItensDaVenda(){

}
const VendasPage = () => {
  const vendas = [
    {
      notaFiscal: 1005,
      data: "19/10/2022 - 14:25",
      cliente: "Jorge Lacerda dos Santos",
      valorTotal: 71.1,
    },
    {
      notaFiscal: 1004,
      data: "19/10/2022 - 14:20",
      cliente: "Francisco Severino Ferreira",
      valorTotal: 65.99,
    },
    {
      notaFiscal: 1003,
      data: "19/10/2022 - 13:05",
      cliente: "Vanessa Elza Liz Freitas",
      valorTotal: 85.12,
    },
    {
      notaFiscal: 1002,
      data: "19/10/2022 - 12:10",
      cliente: "Rebeca Beatriz Moreira",
      valorTotal: 102.53,
    },
    {
      notaFiscal: 1001,
      data: "19/10/2022 - 11:13",
      cliente: "Gustavo Pietro da Luz",
      valorTotal: 253.75,
    },
    {
      notaFiscal: 1000,
      data: "19/10/2022 - 09:45",
      cliente: "Agatha Manuela Viana",
      valorTotal: 22.36,
    },
    {
      notaFiscal: 999,
      data: "18/10/2022 - 14:25",
      cliente: "Fabiana Stefany Luana Gomes",
      valorTotal: 48.45,
    },
    {
      notaFiscal: 998,
      data: "18/10/2022 - 12:10",
      cliente: "Rosa Ester Carvalho",
      valorTotal: 75.78,
    },
    {
      notaFiscal: 997,
      data: "18/10/2022 - 09:45",
      cliente: "Marcos Fábio Alexandre da Costa",
      valorTotal: 54.95,
    },
  ];

  return (
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
            <td>{venda.notaFiscal}</td>
            <td>{venda.cliente}</td>
            <td>{venda.vendedor}</td>
            <td>{venda.data}</td>
            <td>{venda.valorTotal}</td>
            <td>
              <button onClick={() => verItensDaVenda(venda)}>Ver Itens</button>
              <button onClick={() => editarVenda(venda)}>Editar</button>
              <button onClick={() => excluirVenda(venda)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VendasPage;
