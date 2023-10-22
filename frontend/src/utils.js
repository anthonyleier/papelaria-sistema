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

export const buscarDadosAPI = async (endpoint, setter) => {
  try {
    const response = await axios.get(`http://localhost:8000/${endpoint}/`);
    setter(response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar dados da API (${endpoint})`, error);
  }
};
