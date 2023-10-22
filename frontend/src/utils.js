import axios from "axios";

export const formatarMoeda = (valor) => {
  const valorArrendondado = Math.round(valor * 100) / 100;
  const valorFormatado = valorArrendondado.toLocaleString("PT-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valorFormatado;
};

export const formatarData = (dataString) => {
  const data = new Date(dataString);

  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  const horas = data.getHours();
  const minutos = data.getMinutes();

  const dataFormatada = `${dia}/${mes < 10 ? "0" : ""}${mes}/${ano} - ${horas}:${minutos < 10 ? "0" : ""}${minutos}`;
  return dataFormatada;
};

export const buscarDataAtual = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedDate = `${day}/${month < 10 ? "0" : ""}${month}/${year}`;
  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  return `${formattedDate} - ${formattedTime}`;
};

export const buscarDadosAPI = async (endpoint, setter) => {
  try {
    console.log('consultando')
    const response = await axios.get(`http://localhost:8000/${endpoint}/`);
    setter(response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar dados da API (${endpoint})`, error);
  }
};

export const enviarDadosAPI = async (endpoint, dados) => {
  try {
    const response = await axios.post(`http://localhost:8000/${endpoint}/`, dados);
    return response.data;
  } catch (error) {
    console.error(`Erro ao enviar dados para API (${endpoint})`, error);
  }
};

export const deletarDadosAPI = async (endpoint, id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/${endpoint}/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar dados da API (${endpoint})`, error);
  }
};

export function gerarNumeroNotaFiscal() {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;
  const dia = dataAtual.getDate();
  const hora = dataAtual.getHours();
  const minutos = dataAtual.getMinutes();
  const segundos = dataAtual.getSeconds();

  const numeroFormatado = parseInt(`${ano}${mes < 10 ? "0" : ""}${mes}${dia < 10 ? "0" : ""}${dia}${hora < 10 ? "0" : ""}${hora}${minutos < 10 ? "0" : ""}${minutos}${segundos < 10 ? "0" : ""}${segundos}`);

  return numeroFormatado;
}
