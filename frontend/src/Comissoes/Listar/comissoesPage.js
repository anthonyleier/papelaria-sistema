import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../Navbar/navbar";

import './comissoesPage.css'

function ComissoesPage() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [comissoes, setComissoes] = useState([]);
  const [totalComissoes, setTotalComissoes] = useState(0);

  useEffect(() => {
    // Função para buscar dados da API com base nas datas
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/comissao/?data_inicial=${dataInicio}&data_final=${dataFim}`);
        console.log(response.data)
        setComissoes(Object.values(response.data)); // Atualiza o estado com os dados da API
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    };

    if (dataInicio && dataFim) {
      fetchData(); // Chama a função de busca de dados quando as datas são selecionadas
    }
  }, [dataInicio, dataFim]);

  // Função para calcular o total de comissões
  const calcularTotalComissoes = () => {
    let total = 0;
    comissoes.forEach((comissao) => {
      total += comissao.totalComissao;
    });
    setTotalComissoes(0);
  };

  return (
    <div>
      <Navbar tituloDaPagina="Comissões" />
      <div className="relatorio-comissoes">
        <h1>Relatório de Comissões</h1>

        <div className="date-fields">
          <label>Data de Início:</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />

          <label>Data de Fim:</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <table className="commission-table">
          <thead>
            <tr>
              <th>Código</th>
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
                <td>{comissao.valor_comissao}</td>
                {/* <td>{(comissao.vendas * 0.05).toFixed(2)}</td>{" "} */}
                {/* 5% de comissão */}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total:</td>
              <td></td>
              {/* <td>{calcularTotalComissoes().toFixed(2)}</td> */}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ComissoesPage;
