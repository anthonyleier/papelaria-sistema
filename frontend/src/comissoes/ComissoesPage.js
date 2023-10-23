import React, { useState, useEffect } from "react";

import Navbar from "../navbar/Navbar";
import { formatarMoeda, buscarDadosAPI } from "../utils";
import "./comissoesPage.css";

function ComissoesPage() {
  const [dataInicio, setDataInicio] = useState("2023-10-01");
  const [dataFim, setDataFim] = useState("2023-10-31");
  const [comissoes, setComissoes] = useState([]);
  const [totalComissoes, setTotalComissoes] = useState(0);

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
    buscarDadosAPI(`comissao/?data_inicial=${dataInicio}&data_final=${dataFim}`, setComissoes);
  }, [dataInicio, dataFim]);

  return (
    <div>
      <Navbar tituloDaPagina="Comissões" />
      <div class="header-pagina">
        <h1>Relatório de Comissões</h1>
        <div className="filtro">
          <label>Data Inicial:</label>
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />

          <label>Data Final:</label>
          <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>
      </div>

      <table className="tabela-comissoes">
        <thead class="cabecalho-tabela">
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
  );
}

export default ComissoesPage;
