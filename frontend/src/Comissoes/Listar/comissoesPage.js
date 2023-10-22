import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Navbar/navbar";

import "./comissoesPage.css";

function ComissoesPage() {
  const [dataInicio, setDataInicio] = useState("2023-10-01");
  const [dataFim, setDataFim] = useState("2023-10-31");
  const [comissoes, setComissoes] = useState([]);
  const [totalComissoes, setTotalComissoes] = useState(0);

  const formatarMoeda = (valor) => {
    const valorArrendondado = Math.round(valor * 100) / 100;
    const valorFormatado = valorArrendondado.toLocaleString("PT-BR", {
      style: "currency",
      currency: "BRL",
    });
    return valorFormatado;
  };

  useEffect(() => {
    const calcularTotalComissoes = () => {
      let total = 0;
      comissoes.forEach((comissao) => {
        console.log(comissao.valor_comissao);
        total += comissao.valor_comissao;
      });
      setTotalComissoes(total);
    };

    calcularTotalComissoes();
  }, [comissoes]);

  useEffect(() => {
    const buscarDadosAPI = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/comissao/?data_inicial=${dataInicio}&data_final=${dataFim}`);
        console.log(response.data);
        setComissoes(Object.values(response.data));
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
    };

    buscarDadosAPI();
  }, [dataInicio, dataFim]);

  return (
    <div>
      <Navbar tituloDaPagina="Comissões" />
      <div className="relatorio-comissoes">
        <h1>Relatório de Comissões</h1>

        <div className="filtro">
          <label>Data Inicial:</label>
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />

          <label>Data Final:</label>
          <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>

        <table className="tabela-comissoes">
          <thead>
            <tr>
              <th>Cód.</th>
              <th>Vendedor</th>
              <th>Total de Vendas</th>
              <th>Total de Comissões</th>
            </tr>
          </thead>
          <tbody>
            {comissoes.map((comissao, index) => (
              <tr key={index}>
                <td>{comissao.id_vendedor}</td>
                <td>{comissao.nome_vendedor}</td>
                <td>{comissao.qtd_vendas}</td>
                <td>{formatarMoeda(comissao.valor_comissao)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total de Comissões do Período:</td>
              <td></td>
              <td>{formatarMoeda(totalComissoes)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ComissoesPage;
