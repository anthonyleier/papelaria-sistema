import styled from "styled-components";
import { Link } from "react-router-dom";

export const ConteudoPagina = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    background-color: var(--white);
    height: 500px;
`;

export const AbaProdutos = styled.div`
    width: 60%;
`;

export const GrupoInputsProduto = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;
`;

export const InputProduto = styled.div`
    input,
    select {
        width: 90%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
    }
`;

export const BotaoPadraoVenda = styled.button`
    background-color: #00585e;
    color: #f0f0f0;
    border-radius: 5px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    text-decoration: none;

    &:disabled {
        background-color: #333;
        border: none;
        cursor: not-allowed;
    }
`;

export const Table = styled.table`
    color: #333;
    border-collapse: collapse;
    width: 95%;
    border: 1px solid #e0e0e0;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Th = styled.th`
    color: #333;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #333;
`;

export const Td = styled.td`
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
`;

export const BotaoExcluirProduto = styled.td`
    color: rgb(158, 11, 11);
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

export const AbaDados = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 100%;
    width: 20%;
    padding-left: 50px;
    border-left: 1px solid #333;
`;

export const InputDados = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;

    input,
    select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
    }

    label {
        width: 100%;
        margin-bottom: 20px;
        text-align: left;
    }
`;

export const ValorTotalVenda = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const BotoesConfirmacao = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const HeaderPagina = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #00585e;
    padding-top: 20px;
    padding-bottom: 50px;
    padding-left: 100px;
    padding-right: 100px;
`;

export const BotaoHeader = styled(Link)`
    background-color: #00585e;
    color: #f0f0f0;
    border-radius: 5px;
    padding: 0px 15px;
    border: none;
    cursor: pointer;
    text-decoration: none;
`;

export const BotaoVerItensVenda = styled.span`
    color: #00585e;
    cursor: pointer;
`;

export const BotaoEditarVenda = styled(Link)`
    color: #00585e;
    cursor: pointer;
`;

export const BotaoExcluirVenda = styled.span`
    color: rgb(158, 11, 11);
    cursor: pointer;
`;

export const ThCustom = styled.tr`
    color: #333;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #333;
`;

export const BotoesPerguntarExclusao = styled.td`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const BotaoConfirmarExclusao = styled.button`
    background-color: rgb(158, 11, 11);
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
`;

export const BotaoCancelarExclusao = styled.button`
    background-color: #00585e;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
`;

export const TabelaOpcoes = styled.td`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;
